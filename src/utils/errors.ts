export const getErrorMessage = (err: any): string => {
    const error = (err.response?.data?.errors ?? err.data?.errors ?? err.message ?? err).toString();
    return error === 'Network Error' ? 'Errore di rete' : error;
}