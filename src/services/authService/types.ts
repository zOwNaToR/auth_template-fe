import { UserReducerActionType } from 'App';
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE } from 'utils/constants';
import { BaseAuthInfo, BaseAuthResponse_API } from '../../utils/types';

// Responses
export type LogoutResponseType = {
	status: AUTHENTICATION_RESULT_STATUS;
	message?: string;
};
export type LoginResponseType = {
	status: AUTHENTICATION_RESULT_STATUS;
	message?: string;
};

// Params
export type LoginParams =
	| {
			loginMode: LOGIN_MODE.CREDENTIALS;
			email: string;
			password: string;
			dispatch: React.Dispatch<UserReducerActionType>;
	  }
	| {
			loginMode: LOGIN_MODE.SILENT;
			dispatch: React.Dispatch<UserReducerActionType>;
	  };

export type SignupParams = {
	firstName: string;
	lastName: string;
	email: string;
	birthDate: Date;
	sex?: string;
	password: string;
};

// Others
export type AuthResponseBody_API = BaseAuthResponse_API &
	BaseAuthInfo & {
		userName: string;
		roles: string[];
	};
export type SendLinkResetPasswordResponse_API = BaseAuthResponse_API & {
	resetLink: string;
	resetPasswordToken: string;
};
