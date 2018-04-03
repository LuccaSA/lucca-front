import { AApiSelectFeederWithPaging, IApiSelectFeederWithPaging } from '../../../../../src/app/api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoCustomApiSelectFeeder
	extends AApiSelectFeederWithPaging<any>
	implements IApiSelectFeederWithPaging<any> {

	constructor(
		protected _http: HttpClient
	) {
		super(_http);
	}
	getPagedItems(clue: string, pagingStart: number, pagingStep: number): Observable<any[]> {
		const values = [];
		for (let i = pagingStart; i < pagingStart + pagingStep; i++) {
			values.push({
				id: `id${i}`,
				label: `Item ${clue} ${i}`
			});
		}

		return this._http.get(`http://echo.jsontest.com/values/${encodeURIComponent(JSON.stringify(values))}`)
			.map(response => JSON.parse(decodeURIComponent((<any>response).values)));
	}

	getPagingStep(): number {
		return 20;
	}

	textValue(item: any): string {
		return item.label;
	}
}
