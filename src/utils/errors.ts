export const getErrorMessage = (err: any): string => {
    return (err.response?.data?.errors ?? err.message ?? err).toString();
}