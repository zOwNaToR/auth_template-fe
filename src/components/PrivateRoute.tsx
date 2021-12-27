import { useAuth } from "hooks/useAuth";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { userIsLoggedIn } from "services/authService/authService";

const PrivateRoute: FC = ({ children }) => {
    const { user } = useAuth();

    return userIsLoggedIn(user)
        ? <>{children}</>
        : <Navigate to="/login" />;
}

export default PrivateRoute;