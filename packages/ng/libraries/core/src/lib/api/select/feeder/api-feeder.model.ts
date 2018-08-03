import { ILuOptionOperator } from '../../../option/index';
import { IApiItem, IApiCollectionResponse } from '../../api.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

export interface ILuApiOptionFeeder<T extends IApiItem = IApiItem> extends ILuOptionOperator<T> {}
export interface ILuApiFeederService<T extends IApiItem = IApiItem> {
	getAll(): Observable<T[]>;
}

export abstract class ALuApiOptionFeeder<T extends IApiItem = IApiItem> implements ILuApiOptionFeeder<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(protected service: ILuApiFeederService<T>) {}
	onOpen() {
		this.service.getAll()
		.subscribe(items => this.outOptions$.next(items));
	}
}

export abstract class ALuApiFeederService<T extends IApiItem> implements ILuApiFeederService<T> {
	protected _api: string;
	set api(api: string) { this._api = api; }
	protected _fields = 'fields=id,name';
	set fields(fields: string) { this._fields = `fields=${fields}`; }
	protected _filters: string[] = [];
	set filters(filters: string[]) { this._filters = filters; }
	protected _orderBy = 'orderBy=name,asc';
	set orderBy(orderBy: string) { this._orderBy = `orderBy=${orderBy}`; }
	protected _transformFn = (item: any) => item as T;
	set transformFn(transformFn: (item: any) => T) { this._transformFn = transformFn; }

	get url() {
		return `${this._api}?${[...this._filters, this._orderBy, this._fields].filter(f => !!f).join('&')}`;
	}
	constructor(protected http: HttpClient) {}
	getAll(): Observable<T[]> {
		return this._get(this.url);
	}
	protected _get(url): Observable<T[]> {
		return this.http.get<IApiCollectionResponse<any>>(url)
		.map(response => response.data.items.map(i => this._transformFn(i)));
	}
}
