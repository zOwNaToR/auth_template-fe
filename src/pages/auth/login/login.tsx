import Button from 'components/atoms/Button';
import InputWithValidation from 'components/atoms/InputWithValidation';
import { FullScreenForm } from 'components/FullScreenForm';
import PageHeader from 'components/PageHeader';
import Spinner from 'components/spinner/Spinner';
import { useAuth } from 'hooks/useAuth';
import { useState, VFC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'services/authService/authService';
import { AUTHENTICATION_RESULT_STATUS, LOGIN_MODE, ROUTES } from 'utils/constants';

type FormData = {
    email: string,
    password: string,
}

const Login: VFC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState('');

    const { user, dispatch } = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { email, password } = data;

        const loginResponse = await login({
            loginMode: LOGIN_MODE.CREDENTIALS,
            email,
            password,
            dispatch,
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
                <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-y-2 gap-x-4 grid-cols-1">
                        <InputWithValidation
                            className='block self-stretch'
                            type="email"
                            label='Email'
                            required
                            error={errors.email}
                            {...register("email", { required: 'Campo obbligatorio' })}
                        />
                        <InputWithValidation
                            className='block self-stretch'
                            type="password"
                            label='Password'
                            required
                            error={errors.password}
                            {...register("password", { required: 'Campo obbligatorio' })}
                        />
                    </div>
                    {error && <div className='mt-2 text-red-500'>{error}</div>}

                    <div className='mt-2'>
                        <Link className='link' to={ROUTES.FORGOT_PASSWORD.path}>Forgot password?</Link>
                    </div>

                    <div className="mt-2">
                        {user.isLoading ? (
                            <Spinner fullWidth />
                        ) : (
                            <Button color="primary" type="submit" className='self-center'>Login</Button>
                        )}
                    </div>
                </form>
            </FullScreenForm>
        </>
    );
}

export default Login;