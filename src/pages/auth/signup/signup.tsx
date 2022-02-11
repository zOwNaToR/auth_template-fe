import Button from "components/atoms/Button";
import InputWithValidation from "components/atoms/InputWithValidation";
import SelectWithValidation from "components/atoms/SelectWithValidation";
import { FullScreenForm } from "components/FullScreenForm";
import PageHeader from "components/PageHeader";
import Spinner from "components/spinner/Spinner";
import { useState, VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "services/authService/authService";
import { BASE_RESULT_STATUS } from "utils/constants";

type FormData = {
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    sex?: string,
    password: string,
    confirmPassword: string,
}

const Signup: VFC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [signupState, setSignupState] = useState<BASE_RESULT_STATUS | null>(null);
    const [error, setError] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { firstName, lastName, email, birthDate, sex, password } = data;

        setError('');
        setSignupState(BASE_RESULT_STATUS.PENDING);

        const resp = await signup({ firstName, lastName, email, birthDate, sex, password });
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
                    <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2">
                            <InputWithValidation
                                type="text"
                                label='First Name'
                                required
                                error={errors.firstName}
                                {...register("firstName", { required: 'Campo obbligatorio' })}
                            />
                            <InputWithValidation
                                type="text"
                                label='Last Name'
                                required
                                error={errors.lastName}
                                {...register("lastName", { required: 'Campo obbligatorio' })}
                            />
                            <InputWithValidation
                                type="email"
                                label='Email'
                                required
                                error={errors.email}
                                {...register("email", { required: 'Campo obbligatorio' })}
                            />
                            <InputWithValidation
                                type="date"
                                label='Birth Date'
                                required
                                error={errors.birthDate}
                                {...register("birthDate", { required: 'Campo obbligatorio' })}
                            />
                            <InputWithValidation
                                type="password"
                                label='Password'
                                autoComplete='new-password'
                                required
                                error={errors.password}
                                {...register("password", { required: 'Campo obbligatorio' })}
                            />
                            <InputWithValidation
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
                            <SelectWithValidation
                                label='Sex'
                                error={errors.sex}
                                {...register("sex")}
                                options={[
                                    { value: "", label: 'Non specificato' },
                                    { value: 'M', label: 'Maschio' },
                                    { value: 'F', label: 'Femmina' }
                                ]}
                            />
                        </div>
                        {error && <div className='mt-2 text-red-500'>{error}</div>}

                        <div className="mt-4">
                            {signupState === BASE_RESULT_STATUS.PENDING ? (
                                <Spinner fullWidth />
                            ) : (
                                <Button type="submit">Signup</Button>
                            )}
                        </div>
                    </form>
                )}
            </FullScreenForm>
        </>
    );
}

export default Signup;