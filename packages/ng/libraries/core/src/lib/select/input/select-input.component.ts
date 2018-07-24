import { ChangeDetectionStrategy, Component, Input, HostBinding, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LuPopoverTrigger } from '../../popover/index';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelectInputComponent),
			multi: true,
		},
	],
})
export class LuSelectInputComponent<T = any> /* extends LuPopoverTrigger */ implements ControlValueAccessor {
	_value: T;
	// From ControlValueAccessor interface
	writeValue(value: T) {
		this._value = value;
	}
	// From ControlValueAccessor interface
	private _cvaOnChange = () => {};
	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}
	// From ControlValueAccessor interface
	private _onTouched = () => {};
	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}
}
