import {
	Component,
} from '@angular/core';
import {ISelectOptionFeeder} from './select-option-feeder.model';
import {LuSelectOption} from './select-option.component';

/**
 * The component that provides available options for lu-select
 */
@Component({
	template: '',
})
export class AbstractSelectOptionFeederComponent<T> implements ISelectOptionFeeder<T> {


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
