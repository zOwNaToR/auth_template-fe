import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userIsLoggedIn } from 'services/authService/authService';

const AnonymousRoute: FC = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is logged in, redirect to /welcome
        if (userIsLoggedIn(user)) {
            navigate('/welcome');
        }
    }, [user.token]);

    return <>{children}</>;
}

export default AnonymousRoute
