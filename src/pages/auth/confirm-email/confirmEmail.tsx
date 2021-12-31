import Button from 'components/basics/Button'
import { FullScreenForm } from 'components/FullScreenForm'
import PageHeader from 'components/PageHeader'
import Spinner from 'components/Spinner'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { confirmEmail } from 'services/authService/authService'
import { BASE_RESULT_STATUS } from 'utils/constants'

const ConfirmEmail = () => {
    const [confirmEmailState, setConfirmEmailState] = useState<BASE_RESULT_STATUS>(BASE_RESULT_STATUS.PENDING);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            const resp = await confirmEmail(searchParams.get('userId') ?? '', searchParams.get('token') ?? '');
            setConfirmEmailState(resp.status);
            setError(resp.message ?? '');
        })();
    }, [])

    return (
        <>
            <FullScreenForm>
                <PageHeader>
                    Confirm email
                </PageHeader>
                <div className='flex flex-col items-center'>
                    {confirmEmailState === BASE_RESULT_STATUS.PENDING ? (
                        <Spinner small fullWidth />
                    ) : (confirmEmailState === BASE_RESULT_STATUS.SUCCESS ? (
                        <>
                            <p className='mb-4'>Email confirmed successfully</p>
                            <Link to="/login">
                                <Button color="primary" type="submit">
                                    Go to login
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <div className='mb-4 text-red-500'>{error}</div>
                    ))}
                </div>
            </FullScreenForm>
        </>
    )
}

export default ConfirmEmail
