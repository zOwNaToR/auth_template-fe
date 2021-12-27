import { FC } from 'react';
import CenteredContainer from './CenteredContainer';

export const FullScreenForm: FC = ({ children }) => {
    return (
        <CenteredContainer className="w-full h-full">
            <div className='rounded-md bg-white shadow-md px-16 py-10'>
                {children}
            </div>
        </CenteredContainer>
    );
}