import Welcome from 'pages/welcome/welcome';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'shared/components/PrivateRoute';
import Login from './pages/login/login';
import SignUp from './pages/signUp/signUp';
import { QueryClient, QueryClientProvider } from "react-query";
import { setupAxiosInterceptors } from 'shared/services/axiosService';
import { AuthContext } from 'shared/contexts';
import { useLayoutEffect, useReducer } from 'react';
import { User } from 'shared/types';
import Index from 'pages/index';
import LocalStorageService from 'shared/services/localStorageService';
import { AUTHENTICATION_RESULT_STATUS } from 'shared/constants';
import { userIsLoggedIn } from 'shared/services/authService';
import Navbar from 'shared/components/Navbar';

setupAxiosInterceptors();
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
			return newUser;
	}

	LocalStorageService.setUserData(newUser);
	return newUser;
}

const App = () => {
	const [user, dispatch] = useReducer(userReducer, initUser);

	useLayoutEffect(() => {
		const localStorageData = LocalStorageService.getUserData();

		// If the user in the state is not logged but in the localstorage whe have a valid toke, use that 
		if (!userIsLoggedIn(user) && userIsLoggedIn(localStorageData)) {
			dispatch({
				type: AUTHENTICATION_RESULT_STATUS.LOGGED,
				payload: { ...localStorageData, isLoading: false } as User,
			});
		}
	}, []);

	return (
		<div className="App">
			<AuthContext.Provider value={{ user, dispatch }}>
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
			</AuthContext.Provider>
		</div>
	);
}

export default App;
