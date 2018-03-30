import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Interface that define how to fill a select based on an API
 */
export interface ISelectApiFeeder<T> {

	/**
	 * Return a list of Items according to the clue (and external parameters)
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
	 * Return true if the api as a paging mecanism => then it will be cast to ISelectApiFeederWithPaging
	 */
	isPaged(): boolean;

}

/**
 * Interface to add paging behaviour to feeder
 */
export interface ISelectApiFeederWithPaging<T> extends ISelectApiFeeder<T> {
	/**
	 * Reset the paging indicator
	 */
	resetPagingStart();

	/**
	 * Give the paging step of api
	 */
	getPagingStep(): number;

	/**
	 * Return a list of Items according to the clue (and external parameters)
	 * It's recommand to increment after each call of this method the paging
	 *
	 * @param clue the search clue
	 * @param pagingStart the start paging number
	 * @param pagingStep the paging size
	 */
	getPagedItems(clue: string, pagingStart: number, pagingStep: number): Observable<T[]>;
}

/**
 * Abstract class that propose an implementation of Lucca RDD Api for the interface ISelectApiFeeder
 */
@Injectable()
export abstract class ASelectApiFeederWithPaging<T> implements ISelectApiFeederWithPaging<T> {
	_pagingStart = undefined;

	constructor(
		protected _http: HttpClient
	) {

	}

	/**
	 * See ISelectApiFeeder
	 */
	getItems(clue: string): Observable<T[]> {
		if (this._pagingStart === undefined) {
			this._pagingStart = 0;
		} else {
			this._pagingStart += this.getPagingStep();
		}

		return this.getPagedItems(clue, this._pagingStart, this.getPagingStep());
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
	isPaged(): boolean {
		return true;
	}

	/**
	 * See ISelectApiFeeder
	 */
	abstract textValue(item: T): string;

	/**
	 * Give the paging step of api
	 * See ISelectApiFeederWithPaging
	 */
	abstract getPagingStep(): number;

	/**
	 * See ISelectApiFeederWithPaging
	 */
	abstract getPagedItems(clue: string, pagingStart: number, pagingStep: number): Observable<T[]>;

}
