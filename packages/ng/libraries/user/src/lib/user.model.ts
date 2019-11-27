export interface ILuUser {
	id: number;
	firstName: string;
	lastName: string;
	picture?: { href: string };
	jobTitle?: string;
	additionalInformation?: string;
}
