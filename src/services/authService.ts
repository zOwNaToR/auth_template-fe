import { useContext } from 'react';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { AUTHENTICATION_RESULT_STATUS } from 'utils/constants';
import LocalStorageService from './localStorageService';
import { AuthResponse, AuthResponseBody, User } from 'utils/types';
import { AuthContext } from 'utils/contexts';
import { UserReducerActionType } from 'App';
import { getErrorMessage } from 'utils/errors';

// Types
type LoginInputType = {
    email: string;
    password: string;
}
type LoginResponseType = {
    status: AUTHENTICATION_RESULT_STATUS,
    message?: string,
}
type LogoutResponseType = {
    status: AUTHENTICATION_RESULT_STATUS,
    message?: string,
}
export enum LoginMode {
    CREDENTIALS,
    SILENT,
}
export type LoginParams = { cancelToken: CancelTokenSource } & (
    | { loginMode: LoginMode.CREDENTIALS, email: string, password: string, dispatch: React.Dispatch<UserReducerActionType> }
    | { loginMode: LoginMode.SILENT, dispatch: React.Dispatch<UserReducerActionType> | null });

// Utility
export const userIsLoggedIn = (user: User) => {
    return user && user.token && user.expireDate && user.expireDate.getTime() > new Date().getTime();
};
export const canRefreshToken = (user: User) => {
    return user && user.token && user.refreshToken && user.expireDate && user.expireDate.getTime() < new Date().getTime();
};

// Login functions
export const login = async (params: LoginParams) => {
    let loginResp: AxiosResponse<AuthResponseBody, any> | null = null;

    params.dispatch && params.dispatch({ type: AUTHENTICATION_RESULT_STATUS.PENDING });

    try {
        switch (params.loginMode) {
            case LoginMode.CREDENTIALS:
                loginResp = await credentialsLogin(params.email, params.password, params.cancelToken);
                break;
            case LoginMode.SILENT:
                loginResp = await refreshTokenLogin();
                break;
            default:
                throw new Error('Invalid login mode');
        }

        // Check if userData are not empty, then set them in the storage
        if (loginResp?.data) {
            params.dispatch && params.dispatch({
                type: AUTHENTICATION_RESULT_STATUS.LOGGED,
                payload: { ...loginResp.data, isLoading: false, },
            });
            return { status: AUTHENTICATION_RESULT_STATUS.LOGGED };
        }

        params.dispatch && params.dispatch({
            type: AUTHENTICATION_RESULT_STATUS.FAIL,
            error: 'Response from server is empty',
        });
        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: 'Response from server is empty' };
    } catch (error) {
        const errorMessage = getErrorMessage(error);

        if (axios.isCancel(error)) {
            params.dispatch && params.dispatch({
                type: AUTHENTICATION_RESULT_STATUS.REQUEST_CANCELED,
                error: 'Request canceled',
            });
            return { status: AUTHENTICATION_RESULT_STATUS.REQUEST_CANCELED };
        }

        params.dispatch && params.dispatch({
            type: AUTHENTICATION_RESULT_STATUS.FAIL,
            error: errorMessage,
        });
        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: errorMessage };
    }
}
const credentialsLogin = async (email: string, password: string, cancelToken: CancelTokenSource) => {
    if (!email || !password) throw new Error('Email and password are required');

    const loginData = { email, password };
    return await axios.post<AuthResponseBody>('/auth/login', loginData, { cancelToken: cancelToken.token });
};
const refreshTokenLogin = async () => {
    const userData = LocalStorageService.getUserData();
    if (!userData || !userData.token || !userData.refreshToken) {
        throw new Error('tokens not valid');
    }

    let tokens = { token: userData.token, refreshToken: userData.refreshToken };
    let options = {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    };

    return await axios.post<AuthResponseBody>('/auth/refresh-token', tokens, options);
};

// Logout functions
export const logout = async (dispatch: React.Dispatch<UserReducerActionType>): Promise<LogoutResponseType> => {
    try {
        const userData = LocalStorageService.getUserData();
        if (!userData || !userData.token || !userData.refreshToken) {
            throw new Error('userData not valid');
        }

        let refreshToken = userData.refreshToken;
        let options = {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        };

        const response = await axios.post('/auth/revoke-token', refreshToken, options);

        dispatch({ type: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT });

        return { status: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT };

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: errorMessage };
    }
};

// Test functions
export const test = async () => {
    return await api_test();
};
const api_test = async () => {
    return await axios
        .get('/auth/test')
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log('cancelled');
            } else {
                console.log('test ' + err.response);
            }
        });
};