import Button from 'components/basics/Button';
import Input from 'components/basics/Input';
import { FullScreenForm } from 'components/FullScreenForm';
import PageHeader from 'components/PageHeader';
import Spinner from 'components/Spinner';
import useSameValueStates from 'hooks/useSameValueStates';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from 'services/authService/authService';
import { BASE_RESULT_STATUS } from 'utils/constants';

const ResetPassword = () => {
    const [error, setError] = useState('');
    const [[password, setPassword], [confirmPassword, setConfirmPassword], checkPasswords] = useSameValueStates<string>('', '');
    const [resetPasswordState, setResetPasswordState] = useState<BASE_RESULT_STATUS | null>(null);

    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setResetPasswordState(BASE_RESULT_STATUS.PENDING);
        const resp = await resetPassword(searchParams.get('userId') ?? '', password, searchParams.get('token') ?? '');
        setResetPasswordState(resp.status);

        if (resp.status === BASE_RESULT_STATUS.FAIL) {
            setError(resp.message ?? '');
        } else {
            setError('');
        }
    }

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Reset password
                </PageHeader>
                {resetPasswordState === BASE_RESULT_STATUS.SUCCESS ? (
                    <div className='flex flex-col justify-center'>
                        <p>
                            Password resetted successfully!
                        </p>
                        <div className='line-break' />
                        <Link to="/login" className='self-center'>
                            <Button color="success" type="button">
                                Go to login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form className='flex flex-col items-start' onSubmit={handleSubmit}>
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

                        {resetPasswordState === BASE_RESULT_STATUS.PENDING ? (
                            <Spinner small fullWidth />
                        ) : (
                            <Button color="primary" type="submit" className='self-center'>Reset</Button>
                        )}
                    </form>
                )}
            </FullScreenForm>
        </>
    );
}

export default ResetPassword
