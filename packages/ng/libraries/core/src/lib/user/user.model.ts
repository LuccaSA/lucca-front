// import { IRddItem } from '../rdd';

// export interface IUser extends IRddItem {
export interface IUser {
	id: number;
	name?: string;

	firstName: string;
	lastName: string;
	picture?: { href: string };
	jobTitle?: string;
}
