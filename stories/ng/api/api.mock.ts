import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ALuApiService, ILuApiItem } from "@lucca-front/ng/api";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

const firstnames = ['Pierre', 'Paul', 'Jaques', 'Feuille', 'Paulette', 'Jacqueline'];
const lastnames = ['Dupont', 'Dupond', 'Martin', 'Petit', 'Durand', 'Moreau'];

const items: Array<{ id: number, name: string }> = lastnames
	.reduce((acc, lastname, i1) => [...acc, ...firstnames.map((firstname, i2) => ({ id: i1 + i2, name: `${lastname} ${firstname}`}))], [])

@Injectable()
export class FakeLuApiService extends ALuApiService {
	constructor(private httpClient: HttpClient) {
		super();

	}
	getAll(filters?: string[]): Observable<ILuApiItem<number>[]> {
		throw new Error("Method not implemented.");
	}
	getPaged(page: number, filters?: string[]): Observable<ILuApiItem<number>[]> {
		throw new Error("Method not implemented.");
	}
	searchAll(clue: string, filters?: string[]): Observable<ILuApiItem<number>[]> {
		throw new Error("Method not implemented.");
	}
	searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuApiItem<number>[]> {
		console.log('FakeLuApiService', { clue, page });

		return of(items.filter(i => i.name.includes(clue)).slice(page * 10, (page + 1) * 10)).pipe(delay(500));
	}
}
