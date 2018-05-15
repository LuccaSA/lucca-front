export interface IUser {
	id: number;
	name?: string;

	firstName: string;
	lastName: string;
	picture?: { href: string };
	jobTitle?: string;
}
