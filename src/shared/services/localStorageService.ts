import { reviveDateTime } from 'shared/helpers';
import { USER_STORAGE_KEY } from '../constants';

type UserData = {
    token?: string,
    refreshToken?: string,
    userName?: string,
    expireDate?: Date,
    isLoading: boolean,
}

// LocalStorage/User functions
const setUserData = (data: UserData) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
};
const getUserData = () => {
    const data: UserData = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) ?? '{}', reviveDateTime);

    return data;
};
const clearUserData = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
};

const LocalStorageService = {
    setUserData,
    getUserData,
    clearUserData,
};

export default LocalStorageService;