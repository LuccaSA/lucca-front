import { ILuUser } from '@lucca-front/ng/user';

export const bob: ILuUser = {
	id: 12,
	firstName: 'SpongeBob',
	lastName: 'SquarePants',
	pictureHref: 'https://cdn.lucca.fr/lucca-front/avatars/finn.png',
	jobTitle: 'Cook @KrustyKrab',
};
export const patrick: ILuUser = {
	id: 13,
	firstName: 'Patrick',
	lastName: 'Starfish',
	picture: {
		href: 'https://cdn.lucca.fr/lucca-front/avatars/marceline.jpg',
	},
	jobTitle: 'Happiness Guru',
};
export const squidwards: ILuUser = {
	id: 14,
	firstName: 'Squidwards',
	lastName: 'Tentacles',
	jobTitle: 'Cashier @KrustyKrab',
};
