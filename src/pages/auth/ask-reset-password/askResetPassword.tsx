import Button from 'components/basics/Button';
import Input from 'components/basics/Input';
import { FullScreenForm } from 'components/FullScreenForm';
import PageHeader from 'components/PageHeader';
import Spinner from 'components/Spinner';
import React, { useState } from 'react';
import { sendLinkResetPassword } from 'services/authService/authService';
import { BASE_RESULT_STATUS } from 'utils/constants';

const AskResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [askResetPasswordState, setAskResetPasswordState] = useState<BASE_RESULT_STATUS | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAskResetPasswordState(BASE_RESULT_STATUS.PENDING);
        const resp = await sendLinkResetPassword(email);
        setAskResetPasswordState(resp.status);

        if (resp.status === BASE_RESULT_STATUS.SUCCESS) {
            setError('');
        } else {
            setError(resp.message ?? '');
        }
    }

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Reset password
                </PageHeader>
                {askResetPasswordState === BASE_RESULT_STATUS.SUCCESS ? (
                    <p>Use the link we sent to your email to reset your password</p>
                ) : (
                    <form className='flex flex-col items-start' onSubmit={handleSubmit}>
                        <Input
                            className='mb-4 block self-stretch'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                        {error && <div className='mb-4 text-red-500'>{error}</div>}

                        {askResetPasswordState === BASE_RESULT_STATUS.PENDING ? (
                            <Spinner small fullWidth />
                        ) : (
                            <Button color="primary" type="submit" className='self-center'>Reset password</Button>
                        )}
                    </form>
                )}
            </FullScreenForm>
        </>
    )
}

export default AskResetPassword
