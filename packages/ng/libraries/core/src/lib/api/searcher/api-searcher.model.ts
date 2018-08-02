import { IApiItem } from '../api.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ILuApiOptionFeeder, ILuApiFeederService, ALuApiFeederService } from '../feeder/index';
import { HttpClient } from '@angular/common/http';

export interface ILuApiOptionSearcher<T extends IApiItem = IApiItem> extends ILuApiOptionFeeder<T> {}
export interface ILuApiSearcherService<T extends IApiItem = IApiItem> extends ILuApiFeederService<T> {
	searchAll(clue: string): Observable<T[]>;
}

export abstract class ALuApiOptionSearcher<T extends IApiItem = IApiItem> implements ILuApiOptionFeeder<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	clue: string;
	constructor(protected service: ILuApiSearcherService<T>) {}
	onOpen() {
		this.clue = '';
		this.onClueChange();
	}
	onClueChange(clue: string = this.clue) {
		this.service.searchAll(this.clue)
		.subscribe(items => this.outOptions$.next(items));
	}
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
