import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasValidToken } from 'services/authService/authService';

type AnonymousRouteProps = {
	redirectPage?: string;
};
const AnonymousRoute: FC<AnonymousRouteProps> = ({
	children,
	redirectPage,
}) => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// If user is logged in, redirect to /welcome
		if (hasValidToken(user)) {
			navigate(redirectPage ?? '/');
		}
	}, [user.token]);

	return <>{children}</>;
};

export default AnonymousRoute;
