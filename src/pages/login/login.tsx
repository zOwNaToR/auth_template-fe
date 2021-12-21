import { useEffect, useState } from 'react';
import Input from 'shared/components/basics/Input';
import axios from 'axios';
import { AUTHENTICATION_RESULT_STATUS } from 'shared/constants';
import { useNavigate } from 'react-router-dom';
import Spinner from 'shared/components/Spinner';
import { login, useAuth, userIsLoggedIn } from 'shared/services/authService';
import Button from 'shared/components/basics/Button';
import PageHeader from 'shared/components/PageHeader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, dispatch } = useAuth();
    const navigate = useNavigate();

    const loginAsync = async () => {
        const loginResponse = await login(email, password, dispatch, axios.CancelToken.source());

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
            <Input
                className='mr-2'
                type="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
            />
            <Input
                className='mr-2'
                type="Password"
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
            />
            <Button type="submit" onClick={loginAsync}>Login</Button>

            {error && <div className='mt-1 text-red-500'>{error}</div>}
        </>
    )
}

export default Login
