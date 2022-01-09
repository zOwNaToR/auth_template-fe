import Button from 'components/atoms/Button';
import InputWithValidation from 'components/atoms/InputWithValidation';
import { FullScreenForm } from 'components/FullScreenForm';
import PageHeader from 'components/PageHeader';
import Spinner from 'components/spinner/Spinner';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { sendLinkResetPassword } from 'services/authService/authService';
import { BASE_RESULT_STATUS } from 'utils/constants';

type FormData = {
    email: string,
}

const ForgotPassword: React.VFC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState('');
    const [forgotPasswordState, setForgotPasswordState] = useState<BASE_RESULT_STATUS | null>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { email } = data;

        setError('');

        setForgotPasswordState(BASE_RESULT_STATUS.PENDING);
        const resp = await sendLinkResetPassword(email);
        setForgotPasswordState(resp.status);

        setError(resp.message ?? '');
    }

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Reset password
                </PageHeader>
                {forgotPasswordState === BASE_RESULT_STATUS.SUCCESS ? (
                    <p>Use the link we sent to your email to reset your password</p>
                ) : (
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
                        </div>
                        {error && <div className='mb-4 text-red-500'>{error}</div>}

                        <div className="mt-2">
                            {forgotPasswordState === BASE_RESULT_STATUS.PENDING ? (
                                <Spinner fullWidth />
                            ) : (
                                <Button color="primary" type="submit" className='self-center'>Reset password</Button>
                            )}
                        </div>
                    </form>
                )}
            </FullScreenForm>
        </>
    )
}

export default ForgotPassword