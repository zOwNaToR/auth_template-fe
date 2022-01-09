import Button from 'components/atoms/Button'
import { FullScreenForm } from 'components/FullScreenForm'
import PageHeader from 'components/PageHeader'
import Spinner from 'components/spinner/Spinner'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { confirmEmail } from 'services/authService/authService'
import { BASE_RESULT_STATUS, ROUTES } from 'utils/constants'

const ConfirmEmail: React.VFC = () => {
    const [confirmEmailState, setConfirmEmailState] = useState<BASE_RESULT_STATUS>(BASE_RESULT_STATUS.PENDING);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            const resp = await confirmEmail(searchParams.get('userId') ?? '', searchParams.get('token') ?? '');
            setConfirmEmailState(resp.status);
            setError(resp.message ?? '');
        })();
    }, [searchParams])

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Confirm email
                </PageHeader>
                <div className='flex flex-col items-center'>
                    {confirmEmailState === BASE_RESULT_STATUS.PENDING ? (
                        <Spinner fullWidth />
                    ) : (confirmEmailState === BASE_RESULT_STATUS.SUCCESS ? (
                        <>
                            <p>Email confirmed successfully</p>
                            <Link to={ROUTES.LOGIN.path} className='mt-2'>
                                <Button color="primary" type="submit">
                                    Go to login
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <div className='mt-2 text-red-500'>{error}</div>
                    ))}
                </div>
            </FullScreenForm>
        </>
    )
}

export default ConfirmEmail