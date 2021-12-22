import { useLayoutEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import Welcome from 'pages/welcome/welcome';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/login/login';
import SignUp from 'pages/signUp/signUp';
import Index from 'pages/index';
import { setupAxiosInterceptors } from 'services/axiosService';
import LocalStorageService from 'services/localStorageService';
import { login, LoginMode, canRefreshToken, userIsLoggedIn } from 'services/authService';
import { AuthContext } from 'utils/contexts';
import { User } from 'utils/types';
import { AUTHENTICATION_RESULT_STATUS } from 'utils/constants';
import Navbar from 'components/Navbar';
import WithAxios from 'components/WithAxios';
import axios from 'axios';

const queryClient = new QueryClient();

const initUser: User = {
	isLoading: false,
	userName: undefined,
	expireDate: undefined,
	token: undefined,
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
				refreshToken: action.payload.refreshToken,
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
				refreshToken: undefined,
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
				refreshToken: undefined,
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

	useLayoutEffect(() => {
		(async () => {
			const localStorageData = LocalStorageService.getUserData();

			// If the user in the state is not logged 
			if (!userIsLoggedIn(user)) {
				// But in the localstorage whe have a valid token, use that 
				if (userIsLoggedIn(localStorageData)) {
					dispatch({
						type: AUTHENTICATION_RESULT_STATUS.LOGGED,
						payload: { ...localStorageData, isLoading: false } as User,
					});
				}
				// Else, if the token is present but expired and refreshToken is present, refresh it
				else if (canRefreshToken(localStorageData)) {
					await login({
						loginMode: LoginMode.SILENT,
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

					<div className="Content mx-5">
						<QueryClientProvider client={queryClient}>
							<Routes>
								<Route index element={<Index />} />
								<Route path="/signup" element={<SignUp />} />
								<Route path="/login" element={<Login />} />
								<Route

									path="/welcome"
									element={
										<PrivateRoute>
											<Welcome />
										</PrivateRoute>
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
