import { IApiItem } from '../../api.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ILuApiOptionFeeder, ILuApiFeederService, ALuApiFeederService } from '../feeder/index';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import { merge } from 'rxjs/observable/merge';

export interface ILuApiOptionSearcher<T extends IApiItem = IApiItem> extends ILuApiOptionFeeder<T> {}
export interface ILuApiSearcherService<T extends IApiItem = IApiItem> extends ILuApiFeederService<T> {
	searchAll(clue: string): Observable<T[]>;
}

export abstract class ALuApiOptionSearcher<T extends IApiItem = IApiItem> implements ILuApiOptionFeeder<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	loading$: Observable<boolean>;

	protected _results$: Observable<T[]>;
	protected _clue$: Observable<string>;
	set clue$(clue$: Observable<string>) {
		this._clue$ = clue$;
		this.initObservables();
	}
	constructor(protected service: ILuApiSearcherService<T>) {}
	onOpen() {
		this.resetClue();
	}
	protected initObservables() {
		this._results$ = this._clue$.switchMap(clue => this.service.searchAll(clue).catch(err => of([])));

		this._results$.subscribe(items => this.outOptions$.next(items));
		this.loading$ = merge(
			this._clue$.mapTo(true),
			this._results$.mapTo(false),
		);
	}
	abstract resetClue();
}

export abstract class ALuApiSearcherService<T extends IApiItem = IApiItem>
extends ALuApiFeederService<T>
implements ILuApiSearcherService<T> {
	protected _searchProperty = 'name';
	set searchProperty(sp: string) { this._searchProperty = sp; }
	constructor(protected http: HttpClient) { super(http); }
	searchAll(clue = '') {
		if (!clue) {
			return this.getAll();
		}
		const urlSafeClue = encodeURIComponent(clue);
		const url = `${this.url}&${this._searchProperty}=like,${urlSafeClue}`;
		return this._get(url);
	}
}
