import { reviveDateTime } from 'utils/dates';
import { USER_STORAGE_KEY } from 'utils/constants';
import { UserData } from 'utils/types';

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