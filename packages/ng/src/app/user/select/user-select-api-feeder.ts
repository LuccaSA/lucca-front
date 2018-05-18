import {
	AApiSelectFeederWithPaging,
	IApiSelectFeederWithPaging,
} from '../../api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../';

@Injectable()
export class UserSelectApiFeeder<
	T extends IUser
> extends AApiSelectFeederWithPaging<T> {
	/** The pagingStart.  */
	set pagingStart(paging: number) {
		this._pagingStart = paging;
	}
	get pagingStart() {
		return this._pagingStart;
	}
	/** The paging size. */
	pagingSize = 10;
	/** True if you want to see the former Employees. */
	formerEmployees = false;

	/** The additionnals fields to use in the search. */
	fields = [];

	private _api = '/api/v3/users/find';

	private totalCountUsers = 0;

	constructor(protected _http: HttpClient) {
		super();
	}

	getPagingStep(): number {
		return this.pagingSize;
	}
	getPagedItems(
		clue: string,
		pagingStart: number,
		pagingStep: number,
	): Observable<T[]> {
		const fields = ['id', 'firstName', 'lastName', 'collection.count', ...this.fields];
		const params = [
			`formerEmployees=${this.formerEmployees}`,
			`clue=${encodeURIComponent(clue)}`,
			`fields=${fields.join(',')}`,
		];

		if (pagingStep !== -1) {
			params.push(`paging=${this.pagingStart},${this.pagingSize}`);
		}

		const url = `${this._api}?${params.join('&')}`;
		return this._http.get<{ data: { count: number, items: T[] } }>(url).map(r => {
			this.totalCountUsers = r.data.count;
			return r.data.items;
		});
	}

	textValue(item: T): string {
		return `${item.firstName} ${item.lastName}`;
	}

	length(): number {
		return this.totalCountUsers;
	}

	getAllEntities(): Observable<T[]> {
		return this.getPagedItems('', -1, -1);
	}
}
