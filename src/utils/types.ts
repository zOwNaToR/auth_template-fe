// Auth
type BaseAuthInfo = {
    token?: string;
    expireDate?: Date;
    refreshTokenHidden: boolean;
}
export type BaseAuthResponseType = {
    success: boolean,
    errors: string[];
}

export type AuthResponseBody = BaseAuthResponseType & BaseAuthInfo & {
    userName: string;
    roles: string[];
}

export type AuthResponse = {
    data?: AuthResponseBody;
    isRequestCanceled: boolean;
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