import { LuSelectOption } from "../";

/**
 * Interface to implement when you want to create your own feeder of options fot the select
 * see @ASelectOptionFeeder as a reference implementation
*/
export interface ISelectOptionFeeder<T> {

	/**
	 * @returns true if the focus is on the field
	 */
	focused: boolean;

	/**
	 * Called when the popup of option is open
	 */
	open(): void;

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

}


/**
 * The component that provides available options for lu-select
 */

export abstract class ASelectOptionFeeder<T> implements ISelectOptionFeeder<T> {


	protected _callbackKeyEvent: (event: KeyboardEvent) => void;
	protected _callbackOptions: (options: LuSelectOption<T>[]) => void;
	protected _callbackSelectOption: (option: LuSelectOption<T>) => void;
	protected _focused = false;
	/**
	 * See ISelectOptionFeeder
	*/
	open(): void {}
	/**
	 * See ISelectOptionFeeder
	 */
	get focused(): boolean{
		return this._focused;
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
	registerChangeOptions(callback: (options: LuSelectOption<T>[]) => void): void {
		this._callbackOptions = callback;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	registerSelectOption(callback: (option: LuSelectOption<T>) => void): void {
		this._callbackSelectOption = callback;
	}

	/**
	 * See ISelectOptionFeeder
	 */
	scrollTo(index: number) {
	}

	/**
	 * See ISelectOptionFeeder
	 */
	textValue(item: T): string {
		return '';
	}

}
