export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const USER_STORAGE_KEY = '8h6zvk_tkn0a_6gsd_8i1_uS';


export enum AUTHENTICATION_RESULT_STATUS {
    PENDING = 'pending',
    REDIRECT = 'redirect',
    LOGGED = 'logged',
    LOGGED_OUT = 'loggedOut',
    FAIL = 'fail',
    REQUEST_CANCELED = 'canceled',
};