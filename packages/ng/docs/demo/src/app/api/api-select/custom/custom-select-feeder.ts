import {
	ALuApiSelectFeederWithPaging,
	IApiSelectFeederWithPaging,
} from '@lucca-front/ng';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoCustomApiSelectFeeder extends ALuApiSelectFeederWithPaging<any>
	implements IApiSelectFeederWithPaging<any> {

	private totalCountItems = 0;
	private totalItems = [];

	constructor(protected _http: HttpClient) {
		super();
	}

	getPagedItems(
		clue: string,
		pagingStart: number,
		pagingStep: number,
	): Observable<any[]> {
		if (pagingStart === 0 ) {
			this.totalItems = [];
		}
		const values = [];
		for (let i = pagingStart; i < pagingStart + pagingStep; i++) {
			values.push({
				id: `id${i}`,
				label: `Item ${clue} ${i}`,
			});
		}
		this.totalCountItems += pagingStep;

		return this._http
			.get(
				`http://echo.jsontest.com/values/${encodeURIComponent(
					JSON.stringify(values),
				)}`,
			)
			.map(response => {
				const items = JSON.parse(decodeURIComponent((<any>response).values));
				this.totalItems.push(...items);
				return items;
			});
	}

	getPagingStep(): number {
		return 20;
	}

	textValue(item: any): string {
		return item.label;
	}

	length(): number {
		return this.totalCountItems;
	}

	getAllEntities(): Observable<any[]> {
		return Observable.of(this.totalItems);
	}
}
