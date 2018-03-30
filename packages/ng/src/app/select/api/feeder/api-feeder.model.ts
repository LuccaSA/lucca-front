import { Observable } from 'rxjs/Observable';
import {IApiItem} from '../../../api/api.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Interface that define how to fill a select based on an API
 */
export interface ISelectApiFeeder<T> {

	/**
	 * Return a list of Items according to the clue (and external parameters)
	 * It's recommand to increment after each call of this method the paging
	 *
	 * @param clue the search clue
	 */
	getItems(clue: string): Observable<T[]>;

	/**
	 * Return the text to display (on option list and in the text area)
	 * @param item The item to transform into string
	 */
	textValue(item: T): string;

	/**
	 * Reset the paging indicator
	 */
	resetPagingStart();
}

/**
 * Abstract class that propose an implementation of Lucca RDD Api for the interface ISelectApiFeeder
 */
@Injectable()
export abstract class ASelectRDDApiFeeder<T extends IApiItem> implements ISelectApiFeeder<T> {
	_pagingStart = undefined;

	constructor(
		protected _http: HttpClient
	) {

	}

	/**
	 * See ISelectApiFeeder
	 */
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

	/**
	 * See ISelectApiFeeder
	 */
	resetPagingStart() {
		this._pagingStart = undefined;
	}

	/**
	 * See ISelectApiFeeder
	 */
	textValue(item: T): string {
		return item.name;
	}

	/**
	 * Give the paging step of api
	 */
	abstract getPagingStep(): number;

	/**
	 * Give the rdd api url
	 */
	abstract getApiUrl(): string;

	/**
	 * Give the return fields
	 */
	abstract getFields(): string[];

	/**
	 * Give the list of additionnals parameters
	 */
	abstract getParams(): string[];

	/**
	 * Give the name of the field use for the search
	 */
	abstract getClueField(): string;

}
