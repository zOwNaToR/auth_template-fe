import { UserReducerActionType } from 'App';
import axios, { AxiosResponse } from 'axios';
import {
	AUTHENTICATION_RESULT_STATUS,
	BASE_RESULT_STATUS,
	LOGIN_MODE,
} from 'utils/constants';
import { getErrorMessage } from 'utils/errors';
import { BaseAuthResponse_API, BaseResponseType, User } from 'utils/types';
import LocalStorageService from '../localStorageService/localStorageService';
import {
	AuthResponseBody_API,
	LoginParams,
	LoginResponseType,
	LogoutResponseType,
	SendLinkResetPasswordResponse_API,
	SignupParams,
} from './types';
import React from 'react';

// Login functions
export const login = async (
	params: LoginParams,
): Promise<LoginResponseType> => {
	let loginResp: AxiosResponse<AuthResponseBody_API>;

	params.dispatch({ type: AUTHENTICATION_RESULT_STATUS.PENDING });

	try {
		if (params.loginMode === LOGIN_MODE.CREDENTIALS) {
			loginResp = await credentialsLogin(params.email, params.password);
		} else {
			loginResp = await refreshTokenLogin();
		}

		// Check if userData are not empty, then set them in the storage
		if (loginResp.data.success) {
			params.dispatch({
				type: AUTHENTICATION_RESULT_STATUS.LOGGED,
				payload: { ...loginResp.data, isLoading: false },
			});
			return { status: AUTHENTICATION_RESULT_STATUS.LOGGED };
		}

		params.dispatch({
			type: AUTHENTICATION_RESULT_STATUS.FAIL,
			error: 'Response from server is empty',
		});

		return {
			status: AUTHENTICATION_RESULT_STATUS.FAIL,
			message: loginResp.data.errors.join(', '),
		};
	} catch (error) {
		const errorMessage = getErrorMessage(error);

		params.dispatch({
			type: AUTHENTICATION_RESULT_STATUS.FAIL,
			error: errorMessage,
		});
		return {
			status: AUTHENTICATION_RESULT_STATUS.FAIL,
			message: errorMessage,
		};
	}
};
const credentialsLogin = async (email: string, password: string) => {
	if (!email || !password) throw new Error('Email and password are required');

	const loginData = { email, password };
	return await axios.post<AuthResponseBody_API>('/auth/login', loginData);
};
const refreshTokenLogin = async () => {
	const userData = LocalStorageService.getUserData();
	if (!userData || !userData.refreshTokenHidden) {
		throw new Error('Invalid tokens');
	}

	const params = userData.token ? { token: userData.token } : {};

	return await axios.post<AuthResponseBody_API>('/auth/refresh-token', params);
};

// Logout functions
export const logout = async (
	dispatch: React.Dispatch<UserReducerActionType>,
): Promise<LogoutResponseType> => {
	try {
		const userData = LocalStorageService.getUserData();
		if (!userData || !userData.token) {
			throw new Error('Invalid data');
		}

		await axios.post('/auth/revoke-token', {});

		dispatch({ type: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT });
		return { status: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT };
	} catch (err) {
		const errorMessage = getErrorMessage(err);
		return {
			status: AUTHENTICATION_RESULT_STATUS.FAIL,
			message: errorMessage,
		};
	}
};

// Signup functions
export const signup = async (
	params: SignupParams,
): Promise<BaseResponseType> => {
	try {
		if (!params.firstName) throw Error('First name required');
		if (!params.lastName) throw Error('Last name required');
		if (!params.email) throw Error('Email required');
		if (!params.birthDate) throw Error('Birth date required');
		if (!params.password) throw Error('Password required');

		const resp = await axios.post<BaseAuthResponse_API>('/auth/signup', params);

		if (resp.data?.success) {
			return { status: BASE_RESULT_STATUS.SUCCESS };
		}

		return {
			status: BASE_RESULT_STATUS.FAIL,
			message: resp.data.errors.join(', '),
		};
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		return { status: BASE_RESULT_STATUS.FAIL, message: errorMessage };
	}
};
export const confirmEmail = async (
	userId: string,
	token: string,
): Promise<BaseResponseType> => {
	try {
		if (!userId) throw Error('User id required');
		if (!token) throw Error('Token required');

		const resp = await axios.post<BaseAuthResponse_API>('/auth/confirm-email', {
			userId,
			token,
		});

		if (resp.data?.success) {
			return { status: BASE_RESULT_STATUS.SUCCESS };
		}

		return {
			status: BASE_RESULT_STATUS.FAIL,
			message: resp.data.errors.join(', '),
		};
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		return { status: BASE_RESULT_STATUS.FAIL, message: errorMessage };
	}
};

// Reset password functions
export const sendLinkResetPassword = async (
	email: string,
): Promise<BaseResponseType> => {
	try {
		if (!email) throw Error('Email required');

		const resp = await axios.post<SendLinkResetPasswordResponse_API>(
			'/auth/send-password-reset-link',
			{ email },
		);

		if (!resp.data.success) {
			return {
				status: BASE_RESULT_STATUS.FAIL,
				message: getErrorMessage(resp),
			};
		}

		return { status: BASE_RESULT_STATUS.SUCCESS };
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		return { status: BASE_RESULT_STATUS.FAIL, message: errorMessage };
	}
};
export const resetPassword = async (
	userId: string,
	password: string,
	token: string,
): Promise<BaseResponseType> => {
	try {
		if (!password) throw Error('Password required');
		if (!token) throw Error('Token required');

		const resp = await axios.post<SendLinkResetPasswordResponse_API>(
			'/auth/reset-password',
			{ userId, password, token },
		);

		if (!resp.data.success) {
			return {
				status: BASE_RESULT_STATUS.FAIL,
				message: getErrorMessage(resp),
			};
		}

		return { status: BASE_RESULT_STATUS.SUCCESS };
	} catch (error) {
		const err = getErrorMessage(error);

		return { status: BASE_RESULT_STATUS.FAIL, message: err };
	}
};

// Utility
export const hasValidToken = ({
	token,
	expireDate,
}: {
	token?: string;
	expireDate?: Date;
}) => {
	return token && expireDate && expireDate.getTime() > new Date().getTime();
};
export const canRefreshToken = ({
	token,
	expireDate,
	refreshTokenHidden,
}: {
	token?: string;
	expireDate?: Date;
	refreshTokenHidden?: boolean;
}) => {
	return refreshTokenHidden && !hasValidToken({ token, expireDate });
};

// Test functions
export const test = async () => {
	try {
		const resp = await axios.get('/auth/test');
		return resp;
	} catch (err) {
		if (axios.isCancel(err)) {
			console.log('cancelled');
		} else {
			throw err;
		}
	}
};
