import Button from 'components/atoms/Button';
import CenteredContainer from 'components/CenteredContainer';
import PageHeader from 'components/PageHeader';
import { VFC } from 'react';
import { test } from 'services/authService/authService';

const Index: VFC = () => {
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
