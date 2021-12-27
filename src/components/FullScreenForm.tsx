import { FC } from 'react';
import CenteredContainer from './CenteredContainer';

export const FullScreenForm: FC = ({ children }) => {
    return (
        <CenteredContainer className="w-100">
            <div className='rounded-md bg-primary px-16 py-10'>
                {children}
            </div>
        </CenteredContainer>
    );
}