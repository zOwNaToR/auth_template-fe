import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, hasValidToken } from 'services/authService/authService';
import { ROUTES } from 'utils/constants';
import Button from './atoms/Button';

const Navbar = () => {
	const { user, dispatch } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => navigate('/login');
	const handleSignup = () => navigate('/signup');
	const handleLogout = async () => {
		await logout(dispatch);
		navigate('/');
	};

	const [navbarOpen, setNavbarOpen] = React.useState(false);
	return (
		<>
			<nav
				className={`relative flex flex-wrap items-center justify-between text-secondary px-2 py-3 bg-primary mb-3`}
			>
				<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<Link
							className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase cursor-pointer"
							to={ROUTES.INDEX.path}
						>
							Auth
						</Link>
						<button
							className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded-md bg-transparent block lg:hidden outline-none focus:outline-none"
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<svg
								style={{ width: '20px', height: '20px' }}
								viewBox="0 0 20 20"
							>
								<path
									fill="currentColor"
									d="M1,4 H18 V6 H1 V4 M1,9 H18 V11 H1 V7 M3,14 H18 V16 H1 V14"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`lg:flex flex-grow items-center ${
							navbarOpen ? ' flex' : ' hidden'
						}`}
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
							<li className="nav-item">
								{hasValidToken(user) ? (
									<Button onClick={handleLogout}>
										Logout
									</Button>
								) : (
									<>
										<Button
											onClick={handleLogin}
											className="mr-2"
										>
											Login
										</Button>
										<Button onClick={handleSignup}>
											Sign up
										</Button>
									</>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
