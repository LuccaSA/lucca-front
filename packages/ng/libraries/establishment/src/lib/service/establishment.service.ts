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
		return this._http.get<{ items: ILuEstablishment[] }>(`/organization/structure/api/establishments`).pipe(
			map(res => res.items),
		);
	}
	getPaged(page: number, filters?: string[]): Observable<ILuEstablishment[]> {
		return this._http.get<{ items: ILuEstablishment[] }>(`/organization/structure/api/establishments?page=${page + 1}`).pipe(
			map(res => res.items),
		);
	}
	searchAll(clue: string, filters?: string[]): Observable<ILuEstablishment[]> {
		return this._http.get<{ items: ILuEstablishment[] }>(`/organization/structure/api/establishments?search=${clue}`).pipe(
			map(res => res.items),
		);
	}
	searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuEstablishment[]> {
		return this._http.get<{ items: ILuEstablishment[] }>(`/organization/structure/api/establishments?search=${clue}&page=${page + 1}`).pipe(
			map(res => res.items),
		);
	}
}
