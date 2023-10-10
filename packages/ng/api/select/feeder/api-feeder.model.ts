import { ILuOptionOperator } from '@lucca-front/ng/option';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILuApiItem } from '../../api.model';
import { ILuApiService } from '../../service/index';

export type ILuApiOptionFeeder<T extends ILuApiItem = ILuApiItem> = ILuOptionOperator<T>;
export interface ILuApiFeederService<T extends ILuApiItem = ILuApiItem> {
	getAll(): Observable<readonly T[]>;
}

export abstract class ALuApiOptionFeeder<T extends ILuApiItem = ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>> implements ILuApiOptionFeeder<T> {
	outOptions$ = new BehaviorSubject<readonly T[]>([]);
	protected _service: S;
	constructor(service: S) {
		this._service = service;
	}
	onOpen() {
		this._service.getAll().subscribe((items) => this.outOptions$.next(items));
	}
}
