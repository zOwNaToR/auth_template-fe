import { useContext } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { AUTHENTICATION_RESULT_STATUS } from '../constants';
import LocalStorageService from './localStorageService';
import { AuthResponse, AuthResponseBody, User } from '../types';
import { AuthContext } from 'shared/contexts';
import { UserReducerActionType } from 'App';

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

// Hooks
export const useAuth = () => {
    const { user, dispatch } = useContext(AuthContext);

    return {
        user,
        dispatch,
    };
};

// Utility
export const userIsLoggedIn = (user: User) => {
    return user && user.token && user.expireDate && user.expireDate.getTime() > new Date().getTime();
};
export const tokenIsPresentButExpired = (user: User) => {
    return user && user.expireDate && user.token && user.expireDate.getTime() < new Date().getTime();
};

// Login functions
export const login = async (email: string, password: string, dispatch: React.Dispatch<UserReducerActionType>, cancelToken: CancelTokenSource): Promise<LoginResponseType> => {
    try {
        if (!email || !password) throw new Error('Email and password are required');

        dispatch({ type: AUTHENTICATION_RESULT_STATUS.PENDING });

        const loginData = { email, password };
        const apiResponse = await credentialsLogin(loginData, cancelToken);

        // Check if userData are not empty, then set them in the storage
        if (apiResponse?.data) {
            dispatch({
                type: AUTHENTICATION_RESULT_STATUS.LOGGED,
                payload: { ...apiResponse.data, isLoading: false, },
            });
            return { status: AUTHENTICATION_RESULT_STATUS.LOGGED };
        }

        if (apiResponse?.isRequestCanceled) {
            dispatch({
                type: AUTHENTICATION_RESULT_STATUS.REQUEST_CANCELED,
                error: 'Request canceled',
            });
            return { status: AUTHENTICATION_RESULT_STATUS.REQUEST_CANCELED };
        } else {
            dispatch({
                type: AUTHENTICATION_RESULT_STATUS.FAIL,
                error: 'Response from server is empty',
            });
            return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: 'Response from server is empty' };
        }
    } catch (error) {
        const err = error as any;
        const errorMessage = (err.response?.data?.errors ?? err).toString();

        dispatch({
            type: AUTHENTICATION_RESULT_STATUS.FAIL,
            error: errorMessage,
        });
        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: errorMessage };
    }
};
const credentialsLogin = async (loginData: LoginInputType, cancelToken: CancelTokenSource) => {
    const loginResult = {} as AuthResponse;

    try {
        const resp = await axios.post<AuthResponseBody>('/auth/login', loginData, { cancelToken: cancelToken.token });
        loginResult.data = resp.data;
    } catch (error) {
        const err = error as any;

        if (axios.isCancel(err)) {
            loginResult.isRequestCanceled = true;
        } else {
            throw new Error(err.response?.data?.errors || 'credentialsLogin error');
        }
    }

    return loginResult;
};
export const refreshTokenLogin = async () => {
    const userData = LocalStorageService.getUserData();
    if (!userData || !userData.token || !userData.refreshToken) {
        throw new Error('userData not valid');
    }

    let tokens = JSON.stringify({ token: userData.token, refreshToken: userData.refreshToken });
    let options = {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    };

    return await axios
        .post('/auth/refresh-token', tokens, options)
        .then((resp) => {
            LocalStorageService.setUserData(resp.data);
            return resp;
        })
        .catch((err) => {
            throw new Error('refreshTokenLogin error');
        });
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

    } catch (error) {
        const err = error as any;
        const errorMessage = (err.response?.data?.errors ?? err).toString();

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