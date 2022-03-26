import React from 'react';
import RouteClass from 'classes/RouteClass';
import { BASE_RESULT_STATUS } from './constants';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BaseAuthInfo = {
	token?: string;
	expireDate?: Date;
	refreshTokenHidden: boolean;
};

// Internal Responses
export type BaseResponseType = {
	status: BASE_RESULT_STATUS;
	message?: string;
};

// API Responses
export type BaseAuthResponse_API = {
	success: boolean;
	errors: string[];
};

// User
export type User = BaseAuthInfo & {
	userName?: string;
	isLoading: boolean;
	errorMessage?: string;
};

// Props
export type WithClassName = {
	className?: string;
};

// Routes
export type Routes = {
	// Index and Auth
	INDEX: RouteClass;
	SIGNUP: RouteClass;
	LOGIN: RouteClass;
	CONFIRM_EMAIL: RouteClass;
	FORGOT_PASSWORD: RouteClass;
	RESET_PASSWORD: RouteClass;
};
export type RouteType = {
	component: React.VFC;
	path: string;
	isIndex: boolean;
	isAnonymous: boolean;
	routeParamNames?: string[];
};
