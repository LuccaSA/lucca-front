import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IApiItem, IApiCollectionResponse } from '../api.model';
import { ILuApiFeederService } from './api-feeder.model';

@Injectable()
export class LuApiFeederService<T extends IApiItem> implements ILuApiFeederService<T> {
	protected _api: string;
	set api(api: string) { this._api = api; }
	protected _fields = 'id,name';
	set fields(fields: string) { this._fields = fields; }
	protected _filters: string;
	set filters(filters: string) { this._filters = filters; }
	get url() {
		return `${this._api}?${[this._filters, this.fields].join('&')}`;
	}
	constructor(protected http: HttpClient) {}
	getAll(): Observable<T[]> {
		return this.http.get<IApiCollectionResponse<T>>(this.url)
		.map(response => response.items);
	}
}
