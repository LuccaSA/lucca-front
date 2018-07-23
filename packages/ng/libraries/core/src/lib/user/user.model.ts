import { IApiItem } from '../api/index';

export interface IUser extends IApiItem<number> {
	firstName: string;
	lastName: string;
	picture?: { href: string };
	jobTitle?: string;
}
