import {
	Component,
	forwardRef,
	OnInit,
} from '@angular/core';
import {
	NgModel,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	Validator,
	Validators,
	ValidatorFn,
	ValidationErrors,
	AbstractControl
} from '@angular/forms';
import {
	IUser
} from '../user.model';
@Component({
	selector: 'user-select',
	templateUrl: './user-select.component.html',
	styleUrls: ['./user-select.component.scss'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuUserSelect), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuUserSelect), multi: true },
	],
})
export class LuUserSelect<T extends IUser>
implements ControlValueAccessor,
	OnInit
{
	/** inner validator */
	protected _validator: ValidatorFn | null;

	/** The value of the select */
	get value(): T | null {
		return this._value;
	}
	/** Set the value, an event (canremove) will be sent if the directive is clearable */
	set value(value:  T | null | undefined) {
		let valueTemp = value;
		this._value = valueTemp;
	}

	// Inner values
	protected _value: T | null;

	private _onTouched = () => {};


	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		return null;
	}
	private _cvaOnChange: (value: T) => void = () => {};

	// Life Cycle methods
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
	}

	// From ControlValueAccessor interface
	writeValue(value: T) {
		this.value = value;
	}
	// From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}
	// From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}

}
