import { ILuPopoverPanel } from '../../popover/index';
import { Observable } from 'rxjs/Observable';

export interface ILuPickerPanel<T = any> extends ILuPopoverPanel {
	/**
	 * emits when a value was selected on the picker
	 */
	onSelectValue: Observable<T>;
	/**
	 * called to tell the picker what's the current value
	 * @param value
	 */
	setValue(value: T): void;
}
