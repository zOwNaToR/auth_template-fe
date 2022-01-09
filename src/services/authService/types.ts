import { UserReducerActionType } from "App";
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE, BASE_RESULT_STATUS } from "utils/constants";

export type LogoutResponseType = LoginResponseType;
export type LoginResponseType = {
    status: AUTHENTICATION_RESULT_STATUS,
    message?: string,
}

export type LoginParams = (
    | { loginMode: LOGIN_MODE.CREDENTIALS, email: string, password: string, dispatch: React.Dispatch<UserReducerActionType> }
    | { loginMode: LOGIN_MODE.SILENT, dispatch: React.Dispatch<UserReducerActionType> | null });

export type SignupParams = {
    username: string,
    email: string,
    password: string,
};