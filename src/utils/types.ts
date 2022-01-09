import { BASE_RESULT_STATUS } from "./constants"

type BaseAuthInfo = {
    token?: string;
    expireDate?: Date;
    refreshTokenHidden: boolean;
}

// Internal Responses
export type BaseResponseType = {
    status: BASE_RESULT_STATUS,
    message?: string,
}

// API Reponses
export type BaseAuthResponse_API = {
    success: boolean,
    errors: string[];
}

export type SendLinkResetPasswordResponse_API = BaseAuthResponse_API & {
    resetLink: string,
    resetPasswordToken: string,
}

export type AuthResponse_API = {
    data?: AuthResponseBody_API;
    isRequestCanceled: boolean;
}
export type AuthResponseBody_API = BaseAuthResponse_API & BaseAuthInfo & {
    userName: string;
    roles: string[];
}

// User
export type User = BaseAuthInfo & {
    userName?: string,
    isLoading: boolean,
    errorMessage?: string,
}

export type UserData = BaseAuthInfo & {
    userName?: string,
    isLoading: boolean,
}

// Props
export type WithClassName = {
    className?: string;
}

// Routes
export type Routes = {
    // Index and Auth
    INDEX: RouteType,
    SIGNUP: RouteType,
    LOGIN: RouteType,
    CONFIRM_EMAIL: RouteType,
    FORGOT_PASSWORD: RouteType,
    RESET_PASSWORD: RouteType,
}
export type RouteType = {
    component: React.VFC<{}>,
    path: string,
    isIndex: boolean,
    isAnonymous: boolean,
    isPrivate: boolean,
}