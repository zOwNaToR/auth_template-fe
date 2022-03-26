import axios from 'axios';
import { API_BASE_URL, LOGIN_MODE } from 'utils/constants';
import { login, canRefreshToken } from 'services/authService/authService';
import LocalStorageService from 'services/localStorageService/localStorageService';
import { UserReducerActionType } from 'App';
import React from 'react';
import { AxiosInterceptorsIds } from './types';

const axiosInterceptorsIds: AxiosInterceptorsIds = {
	requestId: undefined,
	responseId: undefined,
};

export const setupAxiosInterceptors = (
	dispatch: React.Dispatch<UserReducerActionType>,
) => {
	axios.defaults.baseURL = API_BASE_URL;
	axios.defaults.withCredentials = true;

	// Setup Bearer JWT Token for each request
	if (typeof axiosInterceptorsIds.requestId !== 'undefined') {
		axios.interceptors.request.eject(axiosInterceptorsIds.requestId);
	}
	axiosInterceptorsIds.requestId = axios.interceptors.request.use(function (
		config,
	) {
		const token = LocalStorageService.getUserData()?.token;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	});

	// Configure errors in responses
	if (typeof axiosInterceptorsIds.responseId !== 'undefined') {
		axios.interceptors.response.eject(axiosInterceptorsIds.responseId);
	}
	axiosInterceptorsIds.responseId = axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			console.log(error.response ?? error.message);

			//If it's a cancelled request error
			if (!error.response && !error.config) {
				return Promise.reject(error);
			}

			const originalRequest = error.config;
			// If it is alredy a retry request for refresh token, reject
			if (originalRequest._retry) {
				return Promise.reject(error);
			}

			// If it is an authentication error, token is expired, refreshToken is present
			// Then refresh the token and resend the original request
			if (
				error.response?.status === 401 &&
				canRefreshToken(LocalStorageService.getUserData())
			) {
				console.log('token expired, trying to refresh');
				originalRequest._retry = true;

				await login({
					loginMode: LOGIN_MODE.SILENT,
					dispatch: dispatch,
				});

				return axios(originalRequest);
			}

			if (error.response?.data?.errors) {
				console.error('Response errors: ' + error.response.data.errors);
			}
			return Promise.reject(error);
		},
	);
};
