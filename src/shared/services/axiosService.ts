import axios from 'axios';
import { API_BASE_URL } from '../constants'
import { refreshTokenLogin, tokenIsPresentButExpired } from './authService';
import LocalStorageService from './localStorageService';

export const setupAxiosInterceptors = () => {
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.withCredentials = true;

    // Setup Bearer JWT Token for each request
    axios.interceptors.request.use(function (config) {
        const token = LocalStorageService.getUserData()?.token;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    // Configure errors in responses
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.log(error.response || error.message);

            //If it's a cancelled request error
            if (!error.response && !error.config) {
                return Promise.reject(error);
            }

            const originalRequest = error.config;
            // Check if is an authentication error, if token is present but expired
            // and if this is not a retry request. Then refresh the token and resend the original request
            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            if (error.response?.status === 401 && tokenIsPresentButExpired(LocalStorageService.getUserData())) {
                console.log('token expired, trying to refresh');
                originalRequest._retry = true;

                // Refresh token and remake the request
                await refreshTokenLogin();

                // Set user data in the context
                // const { userName, expireDate } = LocalService.getUserData();
                // fnSetUser({ isLoggedIn: true, userName, expireDate });

                return await axios(originalRequest);
            }

            // Do something with response error
            if (error.response.data?.errors) {
                console.error('Response errors: ' + error.response.data?.errors);
            }
            return Promise.reject(error);
        }
    );
}