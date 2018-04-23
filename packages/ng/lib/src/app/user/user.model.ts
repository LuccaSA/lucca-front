import { IRddItem } from '../rdd';

export interface IUser extends IRddItem {
	firstName: string;
	lastName: string;
	picture?: { href: string };
	jobTitle?: string;
}
