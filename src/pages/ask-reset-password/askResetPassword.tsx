import Button from 'components/basics/Button';
import Input from 'components/basics/Input';
import { FullScreenForm } from 'components/FullScreenForm';
import PageHeader from 'components/PageHeader';
import React, { useState } from 'react'
import { sendLinkResetPassword } from 'services/authService/authService';
import { BASE_RESULT_STATUS } from 'utils/constants';

const AskResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resp = await sendLinkResetPassword(email);

        if (resp.status === BASE_RESULT_STATUS.SUCCESS) {
            setError('');
            setShowSuccessMessage(true);
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
                {showSuccessMessage ? (
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
                        <Button type="submit" className='self-center'>Reset password</Button>
                    </form>
                )}
            </FullScreenForm>
        </>
    )
}

export default AskResetPassword
