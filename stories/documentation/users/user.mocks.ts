import { ILuUser } from '@lucca-front/ng/user';

export const bob: ILuUser = {
	id: 12,
	firstName: 'SpongeBob',
	lastName: 'SquarePants',
	pictureHref: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
	jobTitle: 'Cook @KrustyKrab',
};
export const patrick: ILuUser = {
	id: 13,
	firstName: 'Patrick',
	lastName: 'Starfish',
	picture: {
		href: 'https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png',
	},
	jobTitle: 'Happiness Guru',
};
export const squidwards: ILuUser = {
	id: 14,
	firstName: 'Squidwards',
	lastName: 'Tentacles',
	jobTitle: 'Cashier @KrustyKrab',
};
