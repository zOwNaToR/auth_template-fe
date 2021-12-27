import { UserReducerActionType } from "App";
import { CancelTokenSource } from "axios";
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE } from "utils/constants";

export type LogoutResponseType = LoginResponseType;
export type LoginResponseType = {
    status: AUTHENTICATION_RESULT_STATUS,
    message?: string,
}

export type LoginParams = { cancelToken: CancelTokenSource } & (
    | { loginMode: LOGIN_MODE.CREDENTIALS, email: string, password: string, dispatch: React.Dispatch<UserReducerActionType> }
    | { loginMode: LOGIN_MODE.SILENT, dispatch: React.Dispatch<UserReducerActionType> | null });