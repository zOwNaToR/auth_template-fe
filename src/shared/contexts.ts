import { UserReducerActionType } from "App";
import { createContext } from "react";
import { User } from 'shared/types';

type AuthContextType = {
	user: User,
	dispatch: React.Dispatch<UserReducerActionType>,
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);