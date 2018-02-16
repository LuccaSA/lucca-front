import {
	Component,
} from '@angular/core';
import {ISelectOptionFeeder} from './select-option-feeder.model';

/**
 * The component that provides available options for lu-select
 */
@Component({
	template: '',
})
export class AbstractSelectOptionFeederComponent<T> implements ISelectOptionFeeder<T> {

	_emitter: (T) => void;
	subscribe(next: (T: any) => void) {
		this._emitter = next;
	}
	/**
	 * See ISelectOptionFeeder
	 */
	hasFocus(): boolean {
		return false;
	}

	emit(value: T): void{
		this._emitter(value);
	}

}
