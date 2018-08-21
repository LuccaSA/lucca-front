import { ILuPopoverPanel, ALuPopoverPanel } from '../../popover/index';
import { Observable } from 'rxjs/Observable';

export interface ILuPickerPanel<T = any> extends ILuPopoverPanel {
	/**
	 * self explainatory
	 */
	multiple: boolean;
	/**
	 * emits when a value was selected on the picker
	 */
	onSelectValue: Observable<T | T[]>;
	/**
	 * called to tell the picker what's the current value
	 * @param value
	 */
	setValue(value: T | T[]): void;
}
export abstract class ALuPickerPanel<T = any> extends ALuPopoverPanel implements ILuPickerPanel<T> {
	multiple: boolean;
	onSelectValue: Observable<T | T[]>;
	abstract setValue(value: T | T[]): void;
}
