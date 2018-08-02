import { ILuOptionOperator } from '../../option/index';
import { IApiItem } from '../api.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ILuApiOptionFeeder<T extends IApiItem = IApiItem> extends ILuOptionOperator<T> {}
export interface ILuApiFeederService<T extends IApiItem = IApiItem> {
	getAll(): Observable<T[]>;
}

export class ALuApiOptionFeeder<T extends IApiItem = IApiItem> implements ILuApiOptionFeeder<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(protected service: ILuApiFeederService<T>) {}
	onOpen() {
		this.service.getAll()
		.subscribe(items => this.outOptions$.next(items));
	}
}
