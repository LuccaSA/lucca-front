import { Injectable } from '@angular/core';
import { ILuApiItem } from '../api.model';
import { ALuApiService } from './api-service.model';
import { LuApiV3Service } from './api-v3.service';
import { LuApiV4Service } from './api-v4.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LuApiHybridService<T extends ILuApiItem = ILuApiItem> extends ALuApiService<T> {
	private _v3Service: LuApiV3Service<T>;
	private _v4Service: LuApiV4Service<T>;

	private _standard = 'v3';
	set standard(std: string) {
		this._standard = std;
	}

	// both
	set api(api: string) {
		this._v3Service.api = api;
		this._v4Service.api = api;
	}
	set filters(filters: string[]) {
		this._v3Service.filters = filters;
		this._v4Service.filters = filters;
	}

	// api v3 only
	set fields(fields: string) {
		this._v3Service.fields = fields;
	}
	set orderBy(orderBy: string) {
		this._v3Service.orderBy = orderBy;
	}

	// api v4 only
	set sort(sort: string) {
		this._v4Service.sort = sort;
	}

	private get _service(): ALuApiService<T> {
		switch (this._standard) {
			case 'v4':
				return this._v4Service;
			case 'v3':
			default:
				return this._v3Service;
		}
	}

	constructor(private _http: HttpClient) {
		super();
		this._v3Service = new LuApiV3Service(this._http);
		this._v4Service = new LuApiV4Service(this._http);
	}

	getAll(filters: string[] = []): Observable<T[]> {
		return this._service.getAll(filters);
	}

	getPaged(page: number, filters: string[] = []): Observable<T[]> {
		return this._service.getPaged(page, filters);
	}

	searchAll(clue: string, filters: string[] = []): Observable<T[]> {
		return this._service.searchAll(clue, filters);
	}

	searchPaged(clue: string, page: number, filters: string[] = []): Observable<T[]> {
		return this._service.searchPaged(clue, page, filters);
	}
}
