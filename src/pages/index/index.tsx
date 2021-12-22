import { useNavigate } from 'react-router-dom'
import Button from 'components/basics/Button';
import PageHeader from 'components/PageHeader';
import { userIsLoggedIn } from 'services/authService';
import { useAuth } from 'hooks/useAuth';

const Index = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

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
        </div>
    )
}

export default Index
