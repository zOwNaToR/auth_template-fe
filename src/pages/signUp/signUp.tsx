import axios from "axios";
import Button from "components/basics/Button";
import Input from "components/basics/Input";
import { FullScreenForm } from "components/FullScreenForm";
import PageHeader from "components/PageHeader";
import Spinner from "components/Spinner";
import { useReducer, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "services/authService/authService";
import { SIGNUP_RESULT_STATUS } from "utils/constants";

export type SignupReducerActionType = null
    | { type: SIGNUP_RESULT_STATUS.PENDING }
    | { type: SIGNUP_RESULT_STATUS.FAIL, error: string }
    | { type: SIGNUP_RESULT_STATUS.REDIRECT }
    | { type: SIGNUP_RESULT_STATUS.REQUEST_CANCELED }
    | { type: SIGNUP_RESULT_STATUS.SIGNEDUP };

const SignupReducer = (state: SIGNUP_RESULT_STATUS | null, action: SignupReducerActionType): SIGNUP_RESULT_STATUS | null => {
    return action?.type ?? null;
}

const SignUp: VFC = () => {
    const [signupState, dispatch] = useReducer(SignupReducer, null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username) {
            setError('Username required');
            return;
        }
        if (!email) {
            setError('Email required');
            return;
        }
        if (!password) {
            setError('Password required');
            return;
        }
        if (!confirmPassword) {
            setError('Confirm password required');
            return;
        }
        if (password != confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        dispatch({ type: SIGNUP_RESULT_STATUS.PENDING });

        const resp = await signup({ username, email, password, cancelToken: axios.CancelToken.source() });
        if (resp.status === SIGNUP_RESULT_STATUS.FAIL) {
            setError(resp.message ?? '');
            dispatch({ type: resp.status, error: resp.message ?? '' });
        }
        else {
            setError('');
            dispatch({ type: resp.status });
        }
    }

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Signup
                </PageHeader>
                {signupState === SIGNUP_RESULT_STATUS.SIGNEDUP ? (
                    <>
                        <Button
                            color="success"
                            type="button"
                            className='self-center'
                            onClick={() => navigate('/login')}
                        >
                            Go to login
                        </Button>

                    </>
                ) : (
                    <form className='flex flex-col items-start' onSubmit={handleSubmit}>
                        <Input
                            className='mb-4 block self-stretch'
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={e => setUsername(e.currentTarget.value)}
                        />
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
                        <Input
                            className='mb-4 block self-stretch'
                            type="password"
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.currentTarget.value)}
                        />
                        {error && <div className='mb-4 text-red-500'>{error}</div>}

                        {signupState === SIGNUP_RESULT_STATUS.PENDING ? (
                            <Spinner />
                        ) : (
                            <Button color="primary" type="submit" className='self-center'>Signup</Button>
                        )}
                    </form>
                )}
            </FullScreenForm>
        </>
    );
}

export default SignUp
