export const getErrorMessage = (err: any): string => {
    return (err.response?.data?.errors ?? err.data?.errors ?? err.message ?? err).toString();
}