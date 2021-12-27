import Button from 'components/basics/Button';
import PageHeader from 'components/PageHeader';
import { useAuth } from 'hooks/useAuth';
import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { userIsLoggedIn, test } from 'services/authService/authService';

const Index: VFC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleTestClick = async () => {
        const resp = await test();
        console.log(resp);
    }

    return (
        <div className="d-flex">
            <PageHeader>
                Index
            </PageHeader>

            {userIsLoggedIn(user) ? (
                <>Welcome {user.userName}</>
            ) : (
                <Button onClick={() => navigate('/login')}>Go to Login</Button>
            )}

            <Button onClick={handleTestClick} className='ml-2'>Test auth route</Button>
        </div>
    )
}

export default Index
