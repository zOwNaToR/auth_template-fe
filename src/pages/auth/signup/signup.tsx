import axios from "axios";
import Button from "components/basics/Button";
import Input from "components/basics/Input";
import { FullScreenForm } from "components/FullScreenForm";
import PageHeader from "components/PageHeader";
import Spinner from "components/Spinner";
import { useState, VFC } from "react";
import { Link } from "react-router-dom";
import { signup } from "services/authService/authService";
import { BASE_RESULT_STATUS } from "utils/constants";

const Signup: VFC = () => {
    const [signupState, setSignupState] = useState<BASE_RESULT_STATUS | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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

        setSignupState(BASE_RESULT_STATUS.PENDING);
        const resp = await signup({ username, email, password });
        setSignupState(resp.status);
        setError(resp.message ?? '');
    }

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Signup
                </PageHeader>
                {signupState === BASE_RESULT_STATUS.SUCCESS ? (
                    <div className='flex flex-col justify-center'>
                        <p className='self-center'>
                            Confirm your email to complete your account
                        </p>
                    </div>
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
                            autoComplete='new-password'
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                        <Input
                            className='mb-4 block self-stretch'
                            type="password"
                            placeholder='Confirm password'
                            autoComplete='new-password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.currentTarget.value)}
                        />
                        {error && <div className='mb-4 text-red-500'>{error}</div>}

                        {signupState === BASE_RESULT_STATUS.PENDING ? (
                            <Spinner small fullWidth />
                        ) : (
                            <Button color="primary" type="submit" className='self-center'>Signup</Button>
                        )}
                    </form>
                )}
            </FullScreenForm>
        </>
    );
}

export default Signup;
