import { FC } from 'react';
import CenteredContainer from './CenteredContainer';

export const PageTitle: FC = ({ children }) => {
    return (
        <h1 className='font-bold text-2xl'>
            {children}
        </h1>
    )
}

const PageHeader: FC = ({ children }) => {
    return (
        <CenteredContainer className='mb-4'>
            <PageTitle>
                {children}
            </PageTitle>
        </CenteredContainer>
    )
}

export default PageHeader