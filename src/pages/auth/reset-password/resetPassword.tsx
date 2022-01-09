import Button from 'components/atoms/Button';
import InputWithValidation from 'components/atoms/InputWithValidation';
import { FullScreenForm } from 'components/FullScreenForm';
import PageHeader from 'components/PageHeader';
import Spinner from 'components/spinner/Spinner';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from 'services/authService/authService';
import { BASE_RESULT_STATUS, ROUTES } from 'utils/constants';

type FormData = {
    password: string,
    confirmPassword: string,
}

const ResetPassword: React.VFC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [resetPasswordState, setResetPasswordState] = useState<BASE_RESULT_STATUS | null>(null);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { password } = data;

        setError('');

        setResetPasswordState(BASE_RESULT_STATUS.PENDING);
        const resp = await resetPassword(searchParams.get('userId') ?? '', password, searchParams.get('token') ?? '');
        setResetPasswordState(resp.status);

        setError(resp.message ?? '');
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
                        <Link to={ROUTES.LOGIN.path} className='self-center'>
                            <Button color="success" type="button">
                                Go to login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-y-2 gap-x-4 grid-cols-1">
                            <InputWithValidation
                                className='block self-stretch'
                                type="password"
                                label='Password'
                                autoComplete='new-password'
                                required
                                error={errors.password}
                                {...register("password", { required: 'Campo obbligatorio' })}
                            />
                            <InputWithValidation
                                className='block self-stretch'
                                type="password"
                                label='Confirm password'
                                autoComplete='new-password'
                                required
                                error={errors.confirmPassword}
                                {...register("confirmPassword", {
                                    required: 'Campo obbligatorio',
                                    validate: v => v === watch('password') || 'Le password non coincidono',
                                })}
                            />
                        </div>
                        {error && <div className='mt-2 text-red-500'>{error}</div>}

                        <div className="mt-2">
                            {resetPasswordState === BASE_RESULT_STATUS.PENDING ? (
                                <Spinner fullWidth />
                            ) : (
                                <Button color="primary" type="submit" className='self-center'>Reset</Button>
                            )}
                        </div>
                    </form>
                )}
            </FullScreenForm>
        </>
    );
}

export default ResetPassword