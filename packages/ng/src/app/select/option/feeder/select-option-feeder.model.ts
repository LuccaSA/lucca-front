import { LuSelectOption } from "../";

export interface ISelectOptionFeeder<T> {

	/**
	 * @returns true if the focus is on the field
	 */
	hasFocus(): boolean;

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
	 * Scroll to the element specifyed in index
	 * @param index
	 */
	scrollTo(index: number);

}


/**
 * The component that provides available options for lu-select
 */

export abstract class ASelectOptionFeeder<T> implements ISelectOptionFeeder<T> {


	protected _callbackKeyEvent: (event: KeyboardEvent) => void;
	protected _callbackOptions: (options: LuSelectOption<T>[]) => void;
	/**
	 * See ISelectOptionFeeder
	*/
	open(): void {}
	/**
	 * See ISelectOptionFeeder
	 */
	hasFocus(): boolean {
		return false;
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
	scrollTo(index: number) {
	}

}
