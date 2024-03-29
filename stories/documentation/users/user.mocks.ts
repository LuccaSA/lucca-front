import { ILuUser } from '@lucca-front/ng/user';

export const bob: ILuUser = {
	id: 12,
	firstName: 'Finn',
	lastName: 'Mertens',
	pictureHref: 'https://cdn.lucca.fr/lucca-front/avatars/finn.png',
	jobTitle: 'Hero',
};
export const patrick: ILuUser = {
	id: 13,
	firstName: 'Marceline',
	lastName: 'Abadeer',
	picture: {
		href: 'https://cdn.lucca.fr/lucca-front/avatars/marceline.jpg',
	},
	jobTitle: 'Vampire',
};
export const squidwards: ILuUser = {
	id: 14,
	firstName: 'Jake',
	lastName: 'The Dog',
	jobTitle: 'Magical dog',
};
export const georges: ILuUser = {
	id: 15,
	firstName: 'Georges',
	lastName: 'Abitbol',
	picture: {
		href: 'https://cdn.lucca.fr/lucca-front/avatars/no-picture.jpg',
	},
	jobTitle: 'Movie star',
};
