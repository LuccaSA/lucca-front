import { ILuInput } from '@lucca-front/ng/input';
import { ALuPopoverPanel, ILuPopoverPanel, ILuPopoverTrigger } from '@lucca-front/ng/popover';
import { Observable } from 'rxjs';

export declare interface ILuPickerPanel<T> extends ILuPopoverPanel {
	/**
	 * self explainatory
	 */
	multiple: boolean;
	/**
	 * emits when a value was selected on the picker
	 */
	onSelectValue: Observable<T | readonly T[]>;
	/**
	 * called to tell the picker what's the current value
	 * @param value
	 */
	setValue(value: T | readonly T[]): void;
}
export abstract class ALuPickerPanel<T> extends ALuPopoverPanel implements ILuPickerPanel<T> {
	multiple: boolean;
	onSelectValue: Observable<T | readonly T[]>;
	abstract setValue(value: T | readonly T[]): void;
}

export declare interface ILuInputWithPicker<TValue> extends ILuInput, ILuPopoverTrigger<ILuPickerPanel<TValue>> {}
