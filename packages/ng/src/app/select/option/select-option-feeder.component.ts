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

	/**
	 * See ISelectOptionFeeder
	 */
	hasFocus(): boolean {
		return false;
	}


}
