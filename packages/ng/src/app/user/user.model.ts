import { IApiItem } from '../api';

export interface IUser extends IApiItem {
	firstName: string;
	lastName: string;
	picture?: {href: string};
	jobTitle?: string;
}
