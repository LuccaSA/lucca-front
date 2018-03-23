import { Observable } from 'rxjs/Observable';
import {IApiItem} from '../../../api/api.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface ISelectApiFeeder<T> {

	getItems(clue: string): Observable<T[]>;

	textValue(item: T): string;

	resetPagingStart();
}

@Injectable()
export abstract class ASelectRDDApiFeeder<T extends IApiItem> implements ISelectApiFeeder<T> {
	_pagingStart = undefined;

	constructor(
		protected _http: HttpClient
	) {

	}


	getItems(clue: string): Observable<T[]> {
		if (!this._pagingStart) {
			this._pagingStart = 0;
		} else {
			this._pagingStart += this.getPagingStep();
		}

		const params = [
				`${this.getClueField()}=like,${encodeURIComponent(clue)}`,
				`paging=${this._pagingStart},${this.getPagingStep()}`,
				`fields=${this.getFields().join(',')}`,
			];
		const additionalParams = this.getParams();
		if (additionalParams && additionalParams.length > 0) {
			params.push(...additionalParams);
		}
		const url = `${this.getApiUrl()}?${params.join('&')}`;
		return this._http.get<{ data: { items: T[] } }>(url)
		.map(r => r.data.items);
	}

	resetPagingStart() {
		this._pagingStart = undefined;
	}

	textValue(item: T): string {
		return item.name;
	}

	abstract getPagingStep(): number;

	abstract getApiUrl(): string;

	abstract getFields(): string[];

	abstract getParams(): string[];

	abstract getClueField(): string;

}
