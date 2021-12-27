import { FC } from 'react';
import CenteredContainer from './CenteredContainer';

const PageTitle: FC = ({ children }) => {
    return (
        <h1 className='font-bold text-2xl'>
            {children}
        </h1>
    )
}

const PageHeader: FC = ({ children }) => {
    return (
        <CenteredContainer className='mb-3'>
            <PageTitle>
                {children}
            </PageTitle>
        </CenteredContainer>
    )
}

export default PageHeader
