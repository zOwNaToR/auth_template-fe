import { UserReducerActionType } from 'App';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE, BASE_RESULT_STATUS } from 'utils/constants';
import { getErrorMessage } from 'utils/errors';
import { AuthResponseBody_API, BaseAuthResponse_API, SendLinkResetPasswordResponse_API, User } from 'utils/types';
import LocalStorageService from '../localStorageService';
import { LoginParams, LoginResponseType, LogoutResponseType, SendLinkResetPasswordResponseType, SignupParams, SignupResponseType } from './types';

const postJsonOptions = {
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
};

// Login functions
export const login = async (params: LoginParams): Promise<LoginResponseType> => {
    let loginResp: AxiosResponse<AuthResponseBody_API, any> | null = null;

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
        if (loginResp.data.success) {
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
        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: loginResp.data.errors.join(', ') };
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
    return await axios.post<AuthResponseBody_API>('/auth/login', loginData);
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

    return await axios.post<AuthResponseBody_API>('/auth/refresh-token', userData.token ?? {});
};

// Logout functions
export const logout = async (dispatch: React.Dispatch<UserReducerActionType>): Promise<LogoutResponseType> => {
    try {
        const userData = LocalStorageService.getUserData();
        if (!userData || !userData.token) {
            throw new Error('userData not valid');
        }

        const response = await axios.post('/auth/revoke-token', {});

        dispatch({ type: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT });
        return { status: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT };

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return { status: AUTHENTICATION_RESULT_STATUS.FAIL, message: errorMessage };
    }
};

// Signup functions
export const signup = async (params: SignupParams): Promise<SignupResponseType> => {
    try {
        if (!params.username) throw Error('Username required');
        if (!params.email) throw Error('Email required');
        if (!params.password) throw Error('Password required');

        const resp = await axios.post<BaseAuthResponse_API>('/auth/signup', params);

        if (resp.data?.success) {
            return { status: BASE_RESULT_STATUS.SUCCESS };
        }

        return { status: BASE_RESULT_STATUS.FAIL, message: resp.data.errors.join(', ') };
    } catch (error) {
        const errorMessage = getErrorMessage(error);

        if (axios.isCancel(error)) {
            return { status: BASE_RESULT_STATUS.REQUEST_CANCELED };
        }

        return { status: BASE_RESULT_STATUS.FAIL, message: errorMessage };
    }
}

// Reset password functions
export const sendLinkResetPassword = async (email: string): Promise<SendLinkResetPasswordResponseType> => {
    try {
        if (!email) throw Error('Email required');

        const resp = await axios.post<SendLinkResetPasswordResponse_API>('/auth/send-password-reset-link', { email });

        if (!resp.data.success) {
            return { status: BASE_RESULT_STATUS.FAIL, message: getErrorMessage(resp) };
        }

        return { status: BASE_RESULT_STATUS.SUCCESS };
    } catch (error) {
        const errorMessage = getErrorMessage(error);

        if (axios.isCancel(error)) {
            return { status: BASE_RESULT_STATUS.REQUEST_CANCELED };
        }

        return { status: BASE_RESULT_STATUS.FAIL, message: errorMessage };
    }
}

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