import { ALuService, ILuService, ILuParams } from '@lucca-front/ng/core';
import { ILuUser } from '../../user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface ILuSuggestion<T = any> {
	item: T;
}

export abstract class ALuUserService<U extends ILuUser = ILuUser>
extends ALuService<U>
implements ILuService<U> {
	// protected _appInstanceId: number | string;
	// set appInstanceId(appInstanceId: number | string) { this._appInstanceId = appInstanceId; }
	// protected _operations: number[] = [];
	// set operations(operations: number[]) { this._operations = operations; }
	constructor(protected _http: HttpClient) {
		super();
		// this.api = '/api/v3/users/search';
		// this.fields = 'id,firstname,lastname,picture[href]';
		// this.orderBy = 'lastname,asc,firstname,asc';
	}
	// get url() {
	// 	if (!this._appInstanceId || !this._operations || !this._operations.length) {
	// 		return `${this._api}?${[...this._filters, this._orderBy, this._fields].filter(f => !!f).join('&')}`;
	// 	} else {
	// 		return `/api/v3/users/scopedsearch?${[
	// 			...this._filters,
	// 			`appInstanceId=${this._appInstanceId}`,
	// 			`operations=${this._operations.join(',')}`,
	// 			this._orderBy,
	// 			this._fields,
	// 		].filter(f => !!f).join('&')}`;
	// 	}
	// }
	// protected _get(url) {
	// 	return (<any>super._get(url) as Observable<ILuSuggestion<U>[]>)
	// 	.pipe(map(suggestions => suggestions.map(s => s.item)));
	// }
	// protected _clueFilter(clue) {
	// 	const urlSafeClue = clue.split(' ').map(c => encodeURIComponent(c)).join(',');
	// 	return `clue=${urlSafeClue}`;
	// }
	get(params: ILuParams): Observable<U[]> {
		let url = '/api/v3/users';
		let suggestionResults = false;
		if (params.applicationId && params.operations && params.clue) {
			suggestionResults = true;
			url = '/api/v3/users/scopedSearch';
		} else if (params.clue) {
			suggestionResults = true;
			url = '/api/v3/users/search';
		} else if (params.applicationId && params.operations) {
			url = '/api/v3/users/scoped';
		}
		params.fields = params.fields || 'id,firstname,lastname';
		Object.keys(params).forEach(k => {
			if (params[k] === undefined) {
				delete params[k];
			}
		});
		return this._http.get(url, { params: params })
		.pipe(
			map((response: any) => {
				if (suggestionResults) {
					return response.data.items.map(i => i.item as U);
				} else {
					return response.data.items;
				}
			}),
		);
	}
}
