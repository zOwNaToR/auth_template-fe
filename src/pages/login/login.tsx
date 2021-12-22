import { useEffect, useState } from 'react';
import Input from 'components/basics/Input';
import axios from 'axios';
import { AUTHENTICATION_RESULT_STATUS } from 'utils/constants';
import { useNavigate } from 'react-router-dom';
import Spinner from 'components/Spinner';
import { login, userIsLoggedIn, LoginMode } from 'services/authService';
import Button from 'components/basics/Button';
import PageHeader from 'components/PageHeader';
import { useAuth } from 'hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, dispatch } = useAuth();
    const navigate = useNavigate();

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginResponse = await login({
            loginMode: LoginMode.CREDENTIALS,
            email,
            password,
            dispatch,
            cancelToken: axios.CancelToken.source(),
        });

        if (loginResponse.status === AUTHENTICATION_RESULT_STATUS.LOGGED) {
            navigate('/welcome');
        }
        else {
            setError(loginResponse.message ?? 'Wrong credentials');
        }
    }

    useEffect(() => {
        // If user is logged in, redirect to /welcome
        if (userIsLoggedIn(user)) {
            navigate('/welcome');
        }
    }, [user.token]);

    if (user.isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <PageHeader>
                Index
            </PageHeader>

            <form onSubmit={handleSubmitLogin}>
                <Input
                    className='mr-2'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                />
                <Input
                    className='mr-2'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                />
                <Button type="submit">Login</Button>
            </form>

            {error && <div className='mt-1 text-red-500'>{error}</div>}
        </>
    )
}

export default Login;