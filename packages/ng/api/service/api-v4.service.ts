import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILuApiItem } from '../api.model';
import { ALuApiService } from './api-service.model';

@Injectable()
export class LuApiV4Service<T extends ILuApiItem = ILuApiItem> extends ALuApiService<T> {
	protected _api: string;
	set api(api: string) {
		this._api = api;
	}

	protected _filters: string[] = [];
	set filters(filters: string[]) {
		this._filters = filters || [];
	}
	get filters(): string[] {
		return this._filters;
	}

	protected _sort: string;
	set sort(sort: string) {
		if (sort) {
			this._sort = `sort=${sort}`;
		}
	}

	constructor(protected _http: HttpClient) {
		super();
	}

	getAll(filters: string[] = []): Observable<T[]> {
		const query = [...this.filters, ...filters, this._sort].filter((f) => !!f);
		const url = [this._api, query.join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(map((res) => res.items));
	}
	getPaged(page = 0, filters: string[] = []): Observable<T[]> {
		const query = [`page=${page + 1}`, ...this.filters, ...filters, this._sort].filter((f) => !!f);
		const url = [this._api, query.join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(map((res) => res.items));
	}
	searchAll(clue = '', filters: string[] = []): Observable<T[]> {
		if (!clue) {
			return this.getAll(filters);
		}
		const urlSafeClues = clue
			.split(' ')
			.map((c) => encodeURIComponent(c))
			.join(',');
		const query = [`search=${urlSafeClues}`, ...this.filters, ...filters, this._sort].filter((f) => !!f);
		const url = [this._api, query.join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(map((res) => res.items));
	}
	searchPaged(clue = '', page = 0, filters: string[] = []): Observable<T[]> {
		if (!clue) {
			return this.getPaged(page, filters);
		}
		const urlSafeClues = clue
			.split(' ')
			.map((c) => encodeURIComponent(c))
			.join(',');
		const query = [`search=${urlSafeClues}`, `page=${page + 1}`, ...this.filters, ...filters, this._sort].filter((f) => !!f);
		const url = [this._api, query.join('&')].join('?');
		return this._http.get<{ items: T[] }>(url).pipe(map((res) => res.items));
	}
	count(): Observable<number> {
		const query = [...this.filters, 'fields.root=count', 'limit=0'].filter((f) => !!f);
		const url = [this._api, query.join('&')].join('?');
		return this._http.get<{ count: number }>(url).pipe(map((res) => res.count));
	}
}
