
import { Injectable } from '@angular/core';
import { ALuUserService, ILuUser} from '@lucca-front/ng/user';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
export const bob: ILuUser = {
	id: 12,
	firstName: 'SpongeBob',
	lastName: 'SquarePants',
	pictureHref: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
	jobTitle: 'Cook @KrustyKrab'
};
export const patrick: ILuUser = {
	id: 13,
	firstName: 'Patrick',
	lastName: 'Starfish',
	picture: {
		href: 'https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png',
	},
	jobTitle: 'Happiness Guru'
};
export const squidwards: ILuUser = {
	id: 14,
	firstName: 'Squidwards',
	lastName: 'Tentacles',
	jobTitle: 'Cashier @KrustyKrab'
}

const firstnames = ['Pierre', 'Paul', 'Jaques', 'Feuille', 'Paulette', 'Jacqueline'];
const lastnames = ['Dupont', 'Dupond', 'Martin', 'Petit', 'Durand', 'Moreau'];

const items: Array<ILuUser> = lastnames
	.reduce((acc, lastName, i1) => [...acc, ...firstnames.map((firstName, i2) => ({ id: i1 + i2, lastName, firstName}))], [])


@Injectable()
export class FakeLuUserService extends ALuUserService {
	getMe(): Observable<ILuUser> {
		return of(items[0]).pipe(delay(500));
	}
	getAll(filters?: string[]): Observable<ILuUser[]> {
		throw new Error('Method not implemented.');
	}
	getPaged(page: number, filters?: string[]): Observable<ILuUser[]> {
		throw new Error('Method not implemented.');
	}
	searchAll(clue: string, filters?: string[]): Observable<ILuUser[]> {
		throw new Error('Method not implemented.');
	}
	searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuUser[]> {
		console.log('FakeLuUserService', { clue, page });
		return of(items.filter(i => !clue || i.lastName.includes(clue) || i.firstName.includes(clue)).slice(page * 10, (page + 1) * 10)).pipe(delay(500));
	}
}
