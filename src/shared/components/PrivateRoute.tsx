import { Navigate } from "react-router-dom";
import { useAuth, userIsLoggedIn } from "shared/services/authService";

const PrivateRoute: React.FC = ({ children }) => {
    const { user } = useAuth();

    return userIsLoggedIn(user)
        ? <>{children}</>
        : <Navigate to="/login" />;
}

export default PrivateRoute;