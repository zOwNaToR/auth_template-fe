import RouteClass from "classes/RouteClass";
import ConfirmEmail from "pages/auth/confirm-email/confirmEmail";
import ForgotPassword from "pages/auth/forgot-password/forgotPassword";
import Login from "pages/auth/login/login";
import ResetPassword from "pages/auth/reset-password/resetPassword";
import Signup from "pages/auth/signup/signup";
import Index from "pages/index";
import { Routes } from "./types";

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const USER_STORAGE_KEY = '8h6zvk_tkn0a_6gsd_8i1_uS';

export const FOCUS_CLASSNAMES = "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary";

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
    INDEX: new RouteClass({
        component: Index,
        path: '/',
        isIndex: true,
        isAnonymous: true,
    }),
    SIGNUP: new RouteClass({
        component: Signup,
        path: '/signup',
        isIndex: false,
        isAnonymous: true,
    }),
    LOGIN: new RouteClass({
        component: Login,
        path: '/login',
        isIndex: false,
        isAnonymous: true,
    }),
    CONFIRM_EMAIL: new RouteClass({
        component: ConfirmEmail,
        path: '/confirm-email',
        isIndex: false,
        isAnonymous: true,
    }),
    FORGOT_PASSWORD: new RouteClass({
        component: ForgotPassword,
        path: '/forgot-password',
        isIndex: false,
        isAnonymous: true,
    }),
    RESET_PASSWORD: new RouteClass({
        component: ResetPassword,
        path: '/reset-password',
        isIndex: false,
        isAnonymous: true,
    }),
}