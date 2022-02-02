import { ILuOptionOperator } from '@lucca-front/ng/option';
import { ILuApiItem } from '../../api.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ILuApiService } from '../../service/index';

export type ILuApiOptionFeeder<T extends ILuApiItem = ILuApiItem> =
	ILuOptionOperator<T>;
export interface ILuApiFeederService<T extends ILuApiItem = ILuApiItem> {
	getAll(): Observable<T[]>;
}

export abstract class ALuApiOptionFeeder<
	T extends ILuApiItem = ILuApiItem,
	S extends ILuApiService<T> = ILuApiService<T>,
> implements ILuApiOptionFeeder<T>
{
	outOptions$ = new BehaviorSubject<T[]>([]);
	protected _service: S;
	constructor(service: S) {
		this._service = service;
	}
	onOpen() {
		this._service.getAll().subscribe((items) => this.outOptions$.next(items));
	}
}
