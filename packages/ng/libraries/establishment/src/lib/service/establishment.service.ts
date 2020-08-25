import { Injectable } from '@angular/core';
import { ALuEstablishmentService } from './establishment-service.model';
import { ILuEstablishment } from '../establishment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LuEstablishmentService extends ALuEstablishmentService<ILuEstablishment> {
	constructor(protected _http: HttpClient) { super(); }

	getAll(filters?: string[]): Observable<ILuEstablishment[]> {
		const url = [`/organization/structure/api/establishments`, ...filters.join('&')].join('?');

		return this._http.get<{ items: ILuEstablishment[] }>(url).pipe(
			map(res => res.items),
		);
	}
	getPaged(page: number, filters?: string[]): Observable<ILuEstablishment[]> {
		const url = [`/organization/structure/api/establishments`, [`page=${page + 1}`, ...filters].join('&')].join('?');
		return this._http.get<{ items: ILuEstablishment[] }>(url).pipe(
			map(res => res.items),
		);
	}
	searchAll(clue: string, filters?: string[]): Observable<ILuEstablishment[]> {
		const urlSafeClues = clue.split(' ').map(c => encodeURIComponent(c));
		const url = [`/organization/structure/api/establishments`, [`search=${urlSafeClues}`, ...filters].join('&')].join('?');
		return this._http.get<{ items: ILuEstablishment[] }>(url).pipe(
			map(res => res.items),
		);
	}
	searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuEstablishment[]> {
		const urlSafeClues = clue.split(' ').map(c => encodeURIComponent(c));
		const url = [`/organization/structure/api/establishments`, [`search=${urlSafeClues}`, `page=${page + 1}`, ...filters].join('&')].join('?');
		return this._http.get<{ items: ILuEstablishment[] }>(url).pipe(
			map(res => res.items),
		);
	}
}
