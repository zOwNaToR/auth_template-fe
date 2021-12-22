import { useContext } from "react";
import { AuthContext } from "utils/contexts";

export const useAuth = () => {
    const { user, dispatch } = useContext(AuthContext);

    return {
        user,
        dispatch,
    };
};