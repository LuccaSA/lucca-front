import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILuApiResponse, ILuApiSuggestion, LuApiV3Service } from '@lucca-front/ng/api';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ILuUser } from '../user.model';
import { ILuUserService } from './user-service.model';

@Injectable()
export class LuUserV3Service<U extends ILuUser = ILuUser> extends LuApiV3Service<U> implements ILuUserService<U> {
	protected _appInstanceId: number | string;
	set appInstanceId(appInstanceId: number | string) {
		this._appInstanceId = appInstanceId;
	}
	protected _operations: number[] = [];
	set operations(operations: number[]) {
		this._operations = operations;
	}

	constructor(protected override _http: HttpClient) {
		super(_http);
		this.api = '/api/v3/users/search';
		this.fields = 'id,firstname,lastname,picture[href]';
		this.orderBy = 'lastname,asc,firstname,asc';
	}

	getMe(): Observable<U> {
		return this._http.get<ILuApiResponse<ILuUser>>(`/api/v3/users/me?fields=id`).pipe(
			switchMap((r) => this._get(this.url + `&id=${r.data.id}`)),
			map((users) => users[0]),
		);
	}

	override get url() {
		if (!this._appInstanceId || !this._operations || !this._operations.length) {
			return `${this._api}?${[...this._filters, this._orderBy, this._fields].filter((f) => !!f).join('&')}`;
		} else {
			return `/api/v3/users/scopedsearch?${[...this._filters, `appInstanceId=${this._appInstanceId}`, `operations=${this._operations.join(',')}`, this._orderBy, this._fields]
				.filter((f) => !!f)
				.join('&')}`;
		}
	}

	// FIXME typing
	protected override _get(url: string) {
		return (super._get(url) as unknown as Observable<ILuApiSuggestion<U>[]>).pipe(map((suggestions) => suggestions.map((s: ILuApiSuggestion<U>) => s.item)));
	}

	protected override _clueFilter(clue: string) {
		const urlSafeClue = clue
			.split(' ')
			.map((c: string) => encodeURIComponent(c))
			.join(',');
		return `clue=${urlSafeClue}`;
	}
}
