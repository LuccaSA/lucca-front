import { Injectable } from '@angular/core';
import { ILuApiItem } from '../api.model';
import { ALuApiService } from './api-service.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class LuApiV4Service<T extends ILuApiItem = ILuApiItem> extends ALuApiService<T> {
	protected _api: string;
	set api(api: string) { this._api = api; }
	protected _filters: string[] = [];
	set filters(filters: string[]) { this._filters = filters; }

	constructor(protected _http: HttpClient) { super(); }

	getAll(filters: string[] = []): Observable<T[]> {
		const url = [this._api, [...this._filters, ...filters].join('&')].join('?');

		return this._http.get<{ items: T[] }>(url).pipe(
			map(res => res.items),
		);
	}
	getPaged(page: number = 0, filters: string[] = []): Observable<T[]> {
		const url = [this._api, [`page=${page + 1}`, ...this._filters, ...filters].join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(
			map(res => res.items),
		);
	}
	searchAll(clue: string = '', filters: string[] = []): Observable<T[]> {
		if (!clue) { return this.getAll(filters); }
		const urlSafeClues = clue.split(' ').map(c => encodeURIComponent(c));
		const url = [this._api, [`search=${urlSafeClues}`, ...this._filters, ...filters].join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(
			map(res => res.items),
		);
	}
	searchPaged(clue: string = '', page: number = 0, filters: string[] = []): Observable<T[]> {
		if (!clue) { return this.getPaged(page, filters); }
		const urlSafeClues = clue.split(' ').map(c => encodeURIComponent(c));
		const url = [this._api, [`search=${urlSafeClues}`, `page=${page + 1}`, ...this._filters, ...filters].join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(
			map(res => res.items),
		);
	}
}