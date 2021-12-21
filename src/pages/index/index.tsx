import { useNavigate } from 'react-router-dom'
import Button from 'shared/components/basics/Button';
import PageHeader from 'shared/components/PageHeader';
import { useAuth, userIsLoggedIn } from 'shared/services/authService';

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
