import { Observable } from 'rxjs/Observable';
import { IRddItem } from '../../rdd.model';
import {
	IApiSelectFeederWithPaging,
	AApiSelectFeederWithPaging,
} from '../../../api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Interface that define how to fill a select based on an API
 */
export interface IRDDSelectApiFeeder<T extends IRddItem>
	extends IApiSelectFeederWithPaging<T> {
	/**
	 * Give the rdd api url
	 */
	getApiUrl(): string;

	/**
	 * Give the return fields
	 */
	getFields(): string[];

	/**
	 * Give the list of additionnals parameters
	 */
	getParams(): string[];

	/**
	 * Give the name of the field use for the search
	 */
	getClueField(): string;
}

/**
 * Abstract class that propose an implementation of Lucca RDD Api for the interface ISelectApiFeeder
 */
@Injectable()
export abstract class ARDDSelectFeeder<T extends IRddItem>
	extends AApiSelectFeederWithPaging<T>
	implements IRDDSelectApiFeeder<T> {

	private totalCountItems = 0;
	constructor(protected _http: HttpClient) {
		super();
	}

	/**
	 * See ISelectApiFeeder
	 */
	getPagedItems(
		clue: string,
		pagingStart: number,
		pagingStep: number,
	): Observable<T[]> {
		const params = [
			`${this.getClueField()}=like,${encodeURIComponent(clue)}`,
			`fields=${this.getFields().join(',')},collection.count`,
		];
		if (pagingStep !== -1) {
			params.push(`paging=${pagingStart},${pagingStep}`);
		}
		const additionalParams = this.getParams();
		if (additionalParams && additionalParams.length > 0) {
			params.push(...additionalParams);
		}
		const url = `${this.getApiUrl()}?${params.join('&')}`;
		return this._http.get<{ data: { count: number, items: T[] } }>(url).map(r => {
			if (!clue || clue.length === 0) {
				this.totalCountItems = r.data.count;
			}
			return r.data.items;
		});
	}

	/**
	 * See ISelectApiFeeder
	 */
	textValue(item: T): string {
		return item.name;
	}

	length(): number {
		return this.totalCountItems;
	}

	getAllEntities(): Observable<T[]> {
		return this.getPagedItems('', -1, -1);
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
