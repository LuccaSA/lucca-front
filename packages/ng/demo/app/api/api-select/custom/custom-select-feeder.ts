import { ISelectApiFeeder } from '../../../../../src/app/api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoCustomApiSelectFeeder implements ISelectApiFeeder<any> {

	private currentStep = 0;

	constructor(
		protected _http: HttpClient
	) {
	}
	getItems(clue: string): Observable<any[]> {
		const values = [];
		for (let i = this.currentStep; i < this.currentStep + 20; i++) {
			values.push({
				id: `id${i}`,
				label: `Item ${clue} ${i}`
			});
		}

		this.currentStep += 20;
		return this._http.get(`http://echo.jsontest.com/values/${encodeURIComponent(JSON.stringify(values))}`)
			.map(response => JSON.parse(decodeURIComponent((<any>response).values)));
	}
	textValue(item: any): string {
		return item.label;
	}
	resetPagingStart() {
		this.currentStep = 0;
	}
}
