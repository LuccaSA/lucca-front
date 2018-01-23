import {
	AfterContentInit,
	Component,
	Input,
	EventEmitter,
	forwardRef,
	ElementRef,
	OnInit,
	OnDestroy,
	QueryList,
	ContentChildren,
	ViewEncapsulation,
	ViewChild,
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
import {LuSelectDirective} from './directive/select.directive';
import {LuSelectPicker} from './picker/select-picker.component';
import {Subject} from 'rxjs/Subject';
import {take} from 'rxjs/operators/take';
import {startWith} from 'rxjs/operators/startWith';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {LuSelectOption} from './option/select-option.component';

/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-select',
	encapsulation: ViewEncapsulation.Emulated,
	templateUrl: './select.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuSelect), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuSelect), multi: true },
	],
	styleUrls: ['./select.component.scss'],
})
export class LuSelect<T> implements ControlValueAccessor, AfterContentInit, OnInit, OnDestroy {

	/** Emits whenever the component is destroyed. */
	private _destroy$ = new Subject<void>();
	/** inner value of component */
	protected _value: T | null;
	/** inner validator */
	protected _validator: ValidatorFn | null;
	/** True if the the component allow the clear of data  */
	protected _canRemove = false;
	/** The value of the select */
	get value(): T | null {
		return this._value;
	}
	set value(value:  T | null) {
		let valueTemp = value;
		if (valueTemp === null && !this.clearable && this.luOptions && this.luOptions.first) {
			valueTemp = this.luOptions.first.value;
		}
		const lastValue = this._value;
		this._value = valueTemp;
		// render
		if (!this._same(lastValue, valueTemp)) {
			this._valueChange.emit(valueTemp);
			this._cvaOnChange(valueTemp);
			this._field.value = value;
		}

	}
	protected _valueChange = new EventEmitter<T|null>();
	// Inner Children
	@ViewChild(LuSelectDirective)_field: LuSelectDirective<T>;
	@ViewChild(LuSelectPicker) _picker: LuSelectPicker<T>;
	/**
	 * List of LuSelectOptions
	 */
	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>>;

	/** The placeholder of the component, it is used as label (material design) */
	@Input() placeholder: String;
	/** True if the component allow to clear the value.  */
	@Input() clearable = false;
	/** Define the graphical mod apply to the component : 'mod-material' / 'mod-compact' / classic (without mod) */
	@Input() mod: String;
	private _cvaOnChange: (value: T) => void = () => {};


	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		return null;
	}
	_onTouched = () => {};

	constructor(private element: ElementRef
	) {
	}

	// Life Cycle methods
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
	}
	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

	ngAfterContentInit() {
		this.luOptions.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe((option) => {
			console.log(option);
			if (this._picker.luOptions$) {
				this._picker.luOptions$.next(this.luOptions.toArray());
			}
		});
		Promise.resolve().then(() => {
			if (!this.clearable && !this.value) {
				if (this.luOptions.length === 0) {
					throw new Error('Empty list for the select ! As it is not clearable, the list cannot be empty !');
				}
				this.value = this.luOptions.first.value;
			}
		});
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


	/** true if the component allow to remove data */
	private canRemove(canRemove: boolean = false): void {
		this._canRemove = canRemove;
	}

	/** set the value to null */
	_clear(): void {
		this.value = null;
	}
	/**
	 * Select the option
	 * @param option : the LuSelectOption to apply
	 */
	_optionSelected(option: LuSelectOption<T>): void {
		this.value = option ? option.value : null;
	}

	// Utilities

	protected _same(oldItem: T, newItem: T): boolean {
		if (oldItem === newItem) {
			return true;
		}
		if (!oldItem && !newItem) {
			return true;
		}
		if (!oldItem || !newItem) {
			return false;
		}
		return JSON.stringify(oldItem) === JSON.stringify(newItem);
	}

}
