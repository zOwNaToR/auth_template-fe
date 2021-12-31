import axios from 'axios';
import AnonymousRoute from 'components/AnonymousRoute';
import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import WithAxios from 'components/WithAxios';
import AskResetPassword from 'pages/auth/ask-reset-password/askResetPassword';
import ConfirmEmail from 'pages/auth/confirm-email/confirmEmail';
import Index from 'pages/index';
import Login from 'pages/auth/login/login';
import ResetPassword from 'pages/auth/reset-password/resetPassword';
import Signup from 'pages/auth/signup/signup';
import { useLayoutEffect, useReducer } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from 'react-router-dom';
import { canRefreshToken, login, userIsLoggedIn } from 'services/authService/authService';
import LocalStorageService from 'services/localStorageService';
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE } from 'utils/constants';
import { AuthContext } from 'utils/contexts';
import { User } from 'utils/types';

const queryClient = new QueryClient();

const initUser: User = {
	isLoading: false,
	userName: undefined,
	expireDate: undefined,
	token: undefined,
	refreshTokenHidden: false,
	errorMessage: undefined,
};

export type UserReducerActionType =
	| { type: AUTHENTICATION_RESULT_STATUS.PENDING }
	| { type: AUTHENTICATION_RESULT_STATUS.LOGGED, payload: User }
	| { type: AUTHENTICATION_RESULT_STATUS.LOGGED_OUT }
	| { type: AUTHENTICATION_RESULT_STATUS.REQUEST_CANCELED, error: string }
	| { type: AUTHENTICATION_RESULT_STATUS.FAIL, error: string };

const userReducer = (state: User, action: UserReducerActionType): User => {
	let newUser = {} as User;

	switch (action.type) {
		case AUTHENTICATION_RESULT_STATUS.PENDING:
			newUser = {
				...state,
				isLoading: true,
				errorMessage: undefined,
			};
			break;
		case AUTHENTICATION_RESULT_STATUS.LOGGED:
			newUser = {
				...state,
				isLoading: false,
				expireDate: action.payload.expireDate ? new Date(action.payload.expireDate) : undefined,
				token: action.payload.token,
				refreshTokenHidden: action.payload.refreshTokenHidden,
				userName: action.payload.userName,
				errorMessage: undefined,
			};
			LocalStorageService.setUserData(newUser);
			break;
		case AUTHENTICATION_RESULT_STATUS.REQUEST_CANCELED:
		case AUTHENTICATION_RESULT_STATUS.FAIL:
			newUser = {
				...state,
				isLoading: false,
				expireDate: undefined,
				token: undefined,
				refreshTokenHidden: false,
				userName: undefined,
				errorMessage: action.error
			};
			break;
		// Only LOGGED_OUT will directly exit the function
		case AUTHENTICATION_RESULT_STATUS.LOGGED_OUT:
			newUser = {
				...state,
				isLoading: false,
				expireDate: undefined,
				token: undefined,
				refreshTokenHidden: false,
				userName: undefined,
				errorMessage: undefined
			};

			LocalStorageService.clearUserData();
			break;
	}

	return newUser;
}

const App = () => {
	const [user, dispatch] = useReducer(userReducer, initUser);

	// Handle user auth
	useLayoutEffect(() => {
		(async () => {
			const localStorageData = LocalStorageService.getUserData();

			// If the user is not logged 
			if (!userIsLoggedIn(user)) {
				// But in the localstorage he has a valid token, use that 
				if (userIsLoggedIn(localStorageData)) {
					dispatch({
						type: AUTHENTICATION_RESULT_STATUS.LOGGED,
						payload: { ...localStorageData, isLoading: false } as User,
					});
				}
				// Otherwise, if the token is expired and refreshToken is present, use it
				else if (canRefreshToken(localStorageData)) {
					await login({
						loginMode: LOGIN_MODE.SILENT,
						dispatch,
						cancelToken: axios.CancelToken.source(),
					});
				}
			}
		})();
	}, []);

	return (
		<div className="App">
			<AuthContext.Provider value={{ user, dispatch }}>
				<WithAxios>
					<Navbar />

					<div className="Content mx-5 mt-5">
						<QueryClientProvider client={queryClient}>
							<Routes>
								<Route index element={<Index />} />
								<Route
									path="signup"
									element={
										<AnonymousRoute>
											<Signup />
										</AnonymousRoute>
									}
								/>
								<Route
									path="confirm-email"
									element={
										<AnonymousRoute>
											<ConfirmEmail />
										</AnonymousRoute>
									}
								/>
								<Route
									path="login"
									element={
										<AnonymousRoute>
											<Login />
										</AnonymousRoute>
									}
								/>
								<Route
									path="ask-reset-password"
									element={
										<AnonymousRoute>
											<AskResetPassword />
										</AnonymousRoute>
									}
								/>
								<Route
									path="reset-password"
									element={
										<AnonymousRoute>
											<ResetPassword />
										</AnonymousRoute>
									}
								/>
							</Routes>
						</QueryClientProvider>
					</div>
				</WithAxios>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
