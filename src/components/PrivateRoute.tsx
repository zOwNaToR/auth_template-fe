import { useAuth } from "hooks/useAuth";
import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { canRefreshToken, userIsLoggedIn } from "services/authService/authService";
import LocalStorageService from "services/localStorageService";
import Spinner from "./spinner/Spinner";

const PrivateRoute: FC = ({ children }) => {
    const { user } = useAuth();
    const [isLogged, setIsLogged] = useState<boolean | null>(null)

    useEffect(() => {
        const localStorageData = LocalStorageService.getUserData();
        const _isLogged = !!userIsLoggedIn(user);

        if (!_isLogged && (userIsLoggedIn(localStorageData) || canRefreshToken(localStorageData))) return;

        setIsLogged(_isLogged);
    }, [user.token])

    return (
        <>
            {isLogged === null ? <Spinner /> : (
                <>
                    {isLogged && <>{children}</>}
                    {!isLogged && <Navigate to="/login" />}
                </>
            )}

        </>
    )
}

export default PrivateRoute;