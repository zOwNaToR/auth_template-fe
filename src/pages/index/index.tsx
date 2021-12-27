import Button from 'components/basics/Button';
import CenteredContainer from 'components/CenteredContainer';
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
        <>
            <PageHeader>
                Index
            </PageHeader>

            <CenteredContainer>
                <Button onClick={handleTestClick} className='ml-2'>Test auth route</Button>
            </CenteredContainer>
        </>
    )
}

export default Index
