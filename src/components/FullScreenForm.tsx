import { FC } from 'react';
import CenteredContainer from './CenteredContainer';

export const FullScreenForm: FC = ({ children }) => {
    return (
        <CenteredContainer className="w-full h-full">
            <div className='rounded-md bg-white shadow-md px-6 md:px-10 py-5 md:py-8'>
                {children}
            </div>
        </CenteredContainer>
    );
}