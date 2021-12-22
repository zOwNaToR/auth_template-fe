import { FC, useMemo } from 'react'
import { useAuth } from 'hooks/useAuth';
import { setupAxiosInterceptors } from 'services/axiosService';

const WithAxios: FC = ({ children }) => {
    const { dispatch } = useAuth();

    useMemo(() => {
        setupAxiosInterceptors(dispatch);
    }, [dispatch])

    return <>
        {children};
    </>
}

export default WithAxios