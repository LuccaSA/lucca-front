import {
	Component,
	forwardRef,
	Renderer2,
	ElementRef,
	HostListener,
	HostBinding,
	ContentChild,
	ViewChild,
	Input,
	OnInit,
	AfterViewInit,
	AfterContentInit,
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
import { LuSelect, LuSelectClearerComponent, ISelectClearer } from '../../select';
import {  } from '../../select/clearer/select-clearer.model';
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
	OnInit,
	AfterViewInit,
	AfterContentInit

{

	@HostBinding('class.is-filled') isFilled = false;
	@HostBinding('class.is-focused') isFocused = false;
	/** The placeholder of the component, it is used as label (material design) */
	@Input() placeholder: string;

	@ContentChild(LuSelectClearerComponent) clearer: ISelectClearer<T>;
	@ViewChild(LuSelect) _luSelect: LuSelect<T>;
	@ViewChild('select') _luSelectElement: ElementRef;

	private _selectElement: any;
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
		this.isFilled = !!this._value;
		this._cvaOnChange(valueTemp);
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

	constructor(
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
	) {
	}

	// Life Cycle methods
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
		this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
	}

	ngAfterViewInit(){
		this._selectElement = this._elementRef.nativeElement.querySelector('lu-select');
		this._selectElement.setAttribute('tabindex', '-1');
	}

	ngAfterContentInit(){
		// Hack to force Angular to thave the right information (else, the contentChild in the select stay empty)
		if (this.clearer){
			this._luSelect.clearer = this.clearer;
		}
	}

	@HostListener('keydown', ['$event'])
	onKeydown($event) {
		this._luSelect.onKeydown($event);
	}

	@HostListener('focus', ['$event'])
	onFocus($event) {
		$event.stopPropagation();
		this.isFocused = true;
	}

	onSelectFocus(focus: boolean){
		this.isFocused = focus;
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
