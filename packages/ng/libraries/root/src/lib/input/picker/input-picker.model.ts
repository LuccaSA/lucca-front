import { Observable } from 'rxjs';
import { ILuPopoverPanel, ALuPopoverPanel, ILuPopoverTrigger } from '../../overlay/index';
import { ControlValueAccessor } from '@angular/forms';

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

export interface ILuInputWithPicker<TValue = any, TPanel extends ILuPickerPanel<TValue> = ILuPickerPanel<TValue>>
extends ILuInput<TValue>, ControlValueAccessor, ILuPopoverTrigger<TPanel> {}