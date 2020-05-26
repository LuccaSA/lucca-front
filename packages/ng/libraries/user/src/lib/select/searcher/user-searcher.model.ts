import { ALuApiPagedSearcherService, ILuApiPagedSearcherService, ILuApiSuggestion, ILuApiResponse } from '@lucca-front/ng/api';
import { ILuUser } from '../../user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class ALuUserPagedSearcherService<U extends ILuUser = ILuUser>
extends ALuApiPagedSearcherService<U>
implements ILuApiPagedSearcherService<U> {
	protected _appInstanceId: number | string;
	set appInstanceId(appInstanceId: number | string) { this._appInstanceId = appInstanceId; }
	protected _operations: number[] = [];
	set operations(operations: number[]) { this._operations = operations; }
	constructor(protected http: HttpClient) {
		super(http);
		this.api = '/api/v3/users/search';
		this.fields = 'id,firstname,lastname,picture[href]';
		this.orderBy = 'lastname,asc,firstname,asc';
	}
	get url() {
		if (!this._appInstanceId || !this._operations || !this._operations.length) {
			return `${this._api}?${[...this._filters, this._orderBy, this._fields].filter(f => !!f).join('&')}`;
		} else {
			return `/api/v3/users/scopedsearch?${[
				...this._filters,
				`appInstanceId=${this._appInstanceId}`,
				`operations=${this._operations.join(',')}`,
				this._orderBy,
				this._fields,
			].filter(f => !!f).join('&')}`;
		}
	}
	protected _get(url) {
		return (<any>super._get(url) as Observable<ILuApiSuggestion<U>[]>)
		.pipe(map(suggestions => suggestions.map(s => s.item)));
	}
	protected _clueFilter(clue) {
		const urlSafeClue = clue.split(' ').map(c => encodeURIComponent(c)).join(',');
		return `clue=${urlSafeClue}`;
	}
	protected getMe(): Observable<ILuUser> {
		return this.http.get<ILuApiResponse<ILuUser>>(`/api/v3/users/me?${this.fields}`).pipe(
			map(r => r.data),
		);
	}
}
