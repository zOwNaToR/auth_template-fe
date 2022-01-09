import { FC } from 'react';
import CenteredContainer from './CenteredContainer';

export const FullScreenForm: FC = ({ children }) => {
    return (
        <CenteredContainer className="w-full h-full">
            <div className='rounded-md bg-white shadow-md px-6 md:px-12 py-5 md:py-10'>
                {children}
            </div>
        </CenteredContainer>
    );
}