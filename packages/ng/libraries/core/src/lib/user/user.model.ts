import { IRddItem } from '../rdd/index';

export interface IUser extends IRddItem {
	firstName: string;
	lastName: string;
	picture?: { href: string };
	jobTitle?: string;
}
