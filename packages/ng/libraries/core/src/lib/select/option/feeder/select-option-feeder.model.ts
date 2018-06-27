import { LuSelectOption } from '../select-option.component';
import { LuSelectIntl } from '../../utils/index';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

/**
 * Interface to implement when you want to create your own feeder of options fot the select
 * see @ASelectOptionFeeder as a reference implementation
 */
export interface ISelectOptionFeeder<T> {
	/**
	 * @returns true if the focus is on the field
	 */
	focused: boolean;

	selectAll: boolean;

	multiple: boolean;

	partialSelectAll: boolean;

	/**
	 * Called when the popup of option is open
	 */
	open(): void;

	/**
	 * Register select All
	 * @param callback
	 */
	registerSelectAllEvent(callback: () => void): void;

	/**
	 * Register key events
	 * @param callback
	 */
	registerKeyevent(callback: (event: KeyboardEvent) => void): void;

	/**
	 * Register for options changes
	 * @param callback
	 */
	registerChangeOptions(callback: (options: LuSelectOption<T>[]) => void): void;

	/**
	 * Register for option selection
	 * @param callback
	 */
	registerSelectOption(callback: (option: LuSelectOption<T>) => void): void;

	/**
	 * Scroll to the element specifyed in index
	 * @param index
	 */
	scrollTo(index: number);

	/**
	 * gives the string corresponding to the item
	 * @param item The item to display
	 */
	textValue(item: T): string;

	length(): number;

	getAllEntities(): Observable<T[]>;

}

/**
 * The component that provides available options for lu-select
 */

export abstract class ASelectOptionFeeder<T> implements ISelectOptionFeeder<T>, OnDestroy {
	protected _callbackSelectAllEvent: () => void;
	protected _callbackKeyEvent: (event: KeyboardEvent) => void;
	protected _callbackOptions: (options: LuSelectOption<T>[]) => void;
	protected _callbackSelectOption: (option: LuSelectOption<T>) => void;
	protected _focused = false;

	/** true if the select has to be a multiple select */
	protected _multiple = false;

	set multiple(multiple: boolean) {
		this._multiple = multiple;
		this._changeDetectorRef.markForCheck();
	}

	get multiple(): boolean {
		return this._multiple;
	}

	protected _selectAll = false;

	/** true if the checkbox selectAll is select */
	set selectAll(selectAll) {
		this._selectAll = selectAll;
		this._changeDetectorRef.markForCheck();
	}

	get selectAll(): boolean {
		return this._selectAll;
	}
	// Partial select is use to detect when selectAll is check but when we do not select all the value
	_partialSelectAll = false;

	set partialSelectAll(partialSelectAll: boolean) {
		this._partialSelectAll = partialSelectAll;
		this._changeDetectorRef.markForCheck();
	}

	get partialSelectAll(): boolean {
		return this._partialSelectAll;
	}

	_selectAllLabel = '';
	protected _intlChanges: Subscription;

	constructor(
		public _intlSelect: LuSelectIntl,
		protected _changeDetectorRef: ChangeDetectorRef,
	) {

		this._selectAllLabel = this._intlSelect.selectAllLabel;
		this._intlChanges = _intlSelect.changes.subscribe(() => {
			this._changeDetectorRef.markForCheck();
			this._selectAllLabel = this._intlSelect.selectAllLabel;
			}
		);
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}

	/**
	 * See ISelectOptionFeeder
	 */
	abstract open(): void;
	/**
	 * See ISelectOptionFeeder
	 */
	get focused(): boolean {
		return this._focused;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	registerSelectAllEvent(callback: () => void): void {
		this._callbackSelectAllEvent = callback;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	registerKeyevent(callback: (event: KeyboardEvent) => void): void {
		this._callbackKeyEvent = callback;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	registerChangeOptions(
		callback: (options: LuSelectOption<T>[]) => void,
	): void {
		this._callbackOptions = callback;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	registerSelectOption(callback: (option: LuSelectOption<T>) => void): void {
		this._callbackSelectOption = callback;
	}

	_selectAllItems(): void {
		if (this._callbackSelectAllEvent) {
			this._callbackSelectAllEvent();
		}
	}

	/**
	 * See ISelectOptionFeeder
	 */
	abstract scrollTo(index: number);

	/**
	 * See ISelectOptionFeeder
	 */
	abstract textValue(item: T): string;

	abstract length(): number;

	abstract getAllEntities(): Observable<T[]>;
}
