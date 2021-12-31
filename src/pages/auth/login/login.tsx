import axios from 'axios';
import Button from 'components/basics/Button';
import Input from 'components/basics/Input';
import PageHeader from 'components/PageHeader';
import Spinner from 'components/Spinner';
import { useAuth } from 'hooks/useAuth';
import { useState, VFC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'services/authService/authService';
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE } from 'utils/constants';
import { FullScreenForm } from '../../components/FullScreenForm';

const Login: VFC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, dispatch } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginResponse = await login({
            loginMode: LOGIN_MODE.CREDENTIALS,
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

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Login
                </PageHeader>
                <form className='flex flex-col items-start' onSubmit={handleSubmit}>
                    <Input
                        className='mb-4 block self-stretch'
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                    />
                    <Input
                        className='mb-4 block self-stretch'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                    {error && <div className='mb-4 text-red-500'>{error}</div>}

                    <div className='mb-4'>
                        <Link className='link' to="/ask-reset-password">Forgot password?</Link>
                    </div>

                    {user.isLoading ? (
                        <Spinner small fullWidth />
                    ) : (
                        <Button color="primary" type="submit" className='self-center'>Login</Button>
                    )}
                </form>
            </FullScreenForm>
        </>
    );
}

export default Login;