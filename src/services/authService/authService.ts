import { UserReducerActionType } from 'App';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE } from 'utils/constants';
import { getErrorMessage } from 'utils/errors';
import { AuthResponseBody, User } from 'utils/types';
import LocalStorageService from '../localStorageService';
import { LoginParams, LoginResponseType, LogoutResponseType } from './types';

// Login functions
export const login = async (params: LoginParams): Promise<LoginResponseType> => {
    let loginResp: AxiosResponse<AuthResponseBody, any> | null = null;

    params.dispatch && params.dispatch({ type: AUTHENTICATION_RESULT_STATUS.PENDING });

    try {
        switch (params.loginMode) {
            case LOGIN_MODE.CREDENTIALS:
                loginResp = await credentialsLogin(params.email, params.password, params.cancelToken);
                break;
            case LOGIN_MODE.SILENT:
                loginResp = await refreshTokenLogin(params.cancelToken);
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
const refreshTokenLogin = async (cancelToken: CancelTokenSource) => {
    const userData = LocalStorageService.getUserData();
    if (!userData || !userData.refreshTokenHidden) {
        throw new Error('tokens not valid');
    }

    // let tokens = { token: userData.token, refreshToken: userData.refreshToken };
    let options = {
        cancelToken: cancelToken.token,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    };

    return await axios.post<AuthResponseBody>('/auth/refresh-token', userData.token ?? {}, options);
};

// Logout functions
export const logout = async (dispatch: React.Dispatch<UserReducerActionType>): Promise<LogoutResponseType> => {
    try {
        const userData = LocalStorageService.getUserData();
        if (!userData || !userData.token) {
            throw new Error('userData not valid');
        }

        let options = {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        };

        const response = await axios.post('/auth/revoke-token', {}, options);

        dispatch({ type: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT });
        return { status: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT };

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: errorMessage };
    }
};

// Utility
export const userIsLoggedIn = (user: User) => {
    return user && user.token && user.expireDate && user.expireDate.getTime() > new Date().getTime();
};
export const canRefreshToken = (user: User) => {
    return user && user.refreshTokenHidden
        && (!user.token || (user.token && user.expireDate && user.expireDate.getTime() < new Date().getTime()));
};

// Test functions
export const test = async () => {
    try {
        const resp = await axios.get('/auth/test');
        return resp;
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log('cancelled');
        }
        else {
            throw err;
        }
    }

};