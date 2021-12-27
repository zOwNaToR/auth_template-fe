// Auth
type BaseAuthInfo = {
    token?: string;
    expireDate?: Date;
    refreshTokenHidden: boolean;
}
export type AuthResponseBody = BaseAuthInfo & {
    userName: string;
    success: boolean;
    errors: string[];
    roles: string[];
}

export type AuthResponse = {
    data?: AuthResponseBody;
    isRequestCanceled: boolean;
}

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