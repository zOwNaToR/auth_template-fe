import ConfirmEmail from "pages/auth/confirm-email/confirmEmail";
import ForgotPassword from "pages/auth/forgot-password/forgotPassword";
import Login from "pages/auth/login/login";
import ResetPassword from "pages/auth/reset-password/resetPassword";
import Signup from "pages/auth/signup/signup";
import Index from "pages/index";
import { Routes } from "utils/types";

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const USER_STORAGE_KEY = '8h6zvk_tkn0a_6gsd_8i1_uS';

export enum AUTHENTICATION_RESULT_STATUS {
    PENDING = 'pending',
    REDIRECT = 'redirect',
    LOGGED = 'logged',
    LOGGED_OUT = 'loggedOut',
    FAIL = 'fail',
    REQUEST_CANCELED = 'canceled',
};

export enum BASE_RESULT_STATUS {
    PENDING = 'pending',
    REDIRECT = 'redirect',
    SUCCESS = 'success',
    FAIL = 'fail',
    REQUEST_CANCELED = 'canceled',
};


export enum LOGIN_MODE {
    CREDENTIALS,
    SILENT,
}

export const ROUTES: Routes = {
    // Index and Auth
    INDEX: {
        component: Index,
        path: '/',
        isIndex: true,
        isAnonymous: true,
        isPrivate: false,
    },
    SIGNUP: {
        component: Signup,
        path: '/signup',
        isIndex: false,
        isAnonymous: true,
        isPrivate: false,
    },
    LOGIN: {
        component: Login,
        path: '/login',
        isIndex: false,
        isAnonymous: true,
        isPrivate: false,
    },
    CONFIRM_EMAIL: {
        component: ConfirmEmail,
        path: '/confirm-email',
        isIndex: false,
        isAnonymous: true,
        isPrivate: false,
    },
    FORGOT_PASSWORD: {
        component: ForgotPassword,
        path: '/forgot-password',
        isIndex: false,
        isAnonymous: true,
        isPrivate: false,
    },
    RESET_PASSWORD: {
        component: ResetPassword,
        path: '/reset-password',
        isIndex: false,
        isAnonymous: true,
        isPrivate: false,
    },
}