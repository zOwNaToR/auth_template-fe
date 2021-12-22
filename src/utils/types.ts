export type AuthResponseBody = {
    success: boolean;
    token: string;
    refreshToken: string;
    expireDate: Date;

    userName: string;
    errors: string[];
    roles: string[];
}

export type AuthResponse = {
    data?: AuthResponseBody;
    isRequestCanceled: boolean;
}

export type User = {
    isLoading: boolean,
    userName?: string,
    token?: string,
    refreshToken?: string,
    expireDate?: Date,
    errorMessage?: string,
}