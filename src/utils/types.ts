type BaseAuthInfo = {
    token?: string;
    expireDate?: Date;
    refreshTokenHidden: boolean;
}

// Auth
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