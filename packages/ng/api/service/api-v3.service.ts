import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILuApiCollectionResponse, ILuApiItem } from '../api.model';
import { ALuApiService } from './api-service.model';

const MAGIC_PAGE_SIZE = 20;

@Injectable()
export class LuApiV3Service<T extends ILuApiItem = ILuApiItem> extends ALuApiService<T> {
	protected _api: string;
	set api(api: string) {
		this._api = api;
	}
	protected _fields = 'fields=id,name';
	set fields(fields: string) {
		if (fields) {
			this._fields = `fields=${fields}`;
		}
	}
	protected _filters: readonly string[] = [];
	set filters(filters: readonly string[]) {
		if (filters) {
			this._filters = filters || [];
		}
	}
	protected _orderBy = 'orderBy=name,asc';
	set orderBy(orderBy: string) {
		if (orderBy) {
			this._orderBy = `orderBy=${orderBy}`;
		}
	}

	get url() {
		return `${this._api}?${[...this._filters, this._orderBy, this._fields].filter((f) => !!f).join('&')}`;
	}

	constructor(protected _http: HttpClient) {
		super();
	}

	getAll(filters: readonly string[] = []): Observable<readonly T[]> {
		return this._get([this.url, ...filters].join('&'));
	}

	getPaged(page: number, filters: readonly string[] = []): Observable<readonly T[]> {
		const paging = `paging=${page * MAGIC_PAGE_SIZE},${MAGIC_PAGE_SIZE}`;
		const url = [this.url, paging, ...filters].join('&');
		return this._get(url);
	}

	searchAll(clue: string, filters: readonly string[] = []): Observable<readonly T[]> {
		if (!clue) {
			return this.getAll(filters);
		}
		const url = [this.url, this._clueFilter(clue), ...filters].join('&');
		return this._get(url);
	}

	searchPaged(clue: string, page: number, filters: readonly string[] = []): Observable<readonly T[]> {
		if (!clue) {
			return this.getPaged(page, filters);
		}
		const paging = `paging=${page * MAGIC_PAGE_SIZE},${MAGIC_PAGE_SIZE}`;
		const url = [this.url, this._clueFilter(clue), paging, ...filters].join('&');
		return this._get(url);
	}

	protected _get(url: string): Observable<readonly T[]> {
		return this._http.get<ILuApiCollectionResponse<T>>(url).pipe(map((response) => response.data.items));
	}
	protected _clueFilter(clue: string) {
		const urlSafeClue = encodeURIComponent(clue);
		return `name=like,${urlSafeClue}`;
	}
}
