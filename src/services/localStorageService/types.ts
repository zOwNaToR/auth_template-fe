import { BaseAuthInfo } from '../../utils/types';

export type UserData = BaseAuthInfo & {
	userName?: string;
	isLoading: boolean;
};
