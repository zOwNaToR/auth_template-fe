import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userIsLoggedIn, login, canRefreshToken, LoginMode } from "services/authService";

const PrivateRoute: React.FC = ({ children }) => {
    const { user } = useAuth();

    return userIsLoggedIn(user)
        ? <>{children}</>
        : <Navigate to="/login" />;
}

export default PrivateRoute;