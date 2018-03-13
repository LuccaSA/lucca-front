import {
	AfterContentInit,
	Component,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	Renderer2,
	ElementRef,
	HostListener,
	HostBinding,
	OnInit,
	OnDestroy,
	QueryList,
	ContentChildren,
	ContentChild,
	ViewContainerRef,
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
import { ISelectClearer } from './clearer/select-clearer.model';
import { LuSelectClearerComponent } from './clearer/select-clearer.component';
import { ASelectOptionFeeder, ISelectOptionFeeder } from './option/feeder/';

/** KeyCode for End Key */
const END = 'End';
/** KeyCode for Home Key */
const HOME = 'Home';
/** KeyCode for Escape Key */
const ESCAPE = 'Escape';
/** KeyCode for Backspace Key */
const BACKSPACE = 'Backspace';
/** KeyCode for Delete Key */
const DELETE = 'Delete';
/** KeyCode for Enter Key */
const ENTER_KEY = 'Enter';
/** KeyCode for ArrowUp Key */
const UP_KEY = 'ArrowUp';
/** KeyCode for ArrowDown Key */
const DOWN_KEY = 'ArrowDown';
const TAB = 'Tab';

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
export class LuSelect<T>
implements ControlValueAccessor, AfterContentInit, OnInit, OnDestroy {

	/** Emits whenever the component is destroyed. */
	private _destroy$ = new Subject<void>();
	/** inner validator */
	protected _validator: ValidatorFn | null;

	/** True if the the component allow the clear of data  */
	_canRemove = false;
	/** The value of the select */
	get value(): T | null {
		return this._value;
	}
	/** Set the value, an event (canremove) will be sent if the directive is clearable */
	set value(value:  T | null | undefined) {
		let valueTemp = value;
		if (valueTemp === null) {
			// We have to deal with the fact that the clearer could not be set => we do nothing
			if (!this.clearer) {
				return;
			}
			// Else we take the value offer by the clearer
			valueTemp = this.clearer.clearValue();
		}
		const lastValue = this._value;
		this._value = valueTemp;
		// emit change
		if (!this._same(lastValue, valueTemp)) {
			this.isFilled = !!this._value;
			this._cvaOnChange(valueTemp);
			if (this.clearer) {
				this._emitClearable();
			}
			// Transfer the information to popover
			this._picker.selectOption(value);

		}
		// We render the option
		this._selectOption = this._picker.find(value);
		// render
		this.render(this._selectOption);
	}

	// Inner values
	protected _value: T | null;
	protected _selectOption: LuSelectOption<T> | null;
	private _forceChangeValue= true;

	// Inner Children
	@ViewChild(LuSelectDirective) _field: LuSelectDirective;
	@ViewChild(LuSelectPicker) _picker: LuSelectPicker<T>;
	/**
	 * List of LuSelectOptions
	 */
	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>>;

	/** The placeholder of the component, it is used as label (material design) */
	@Input() placeholder: string;
	/**
	 * Reference of the clearer
	 */
	@ContentChild(LuSelectClearerComponent) clearer: ISelectClearer<T>;
	/**
	 * Reference of the optionFeeder
	 */
	@ContentChild(ASelectOptionFeeder) optionFeeder: ISelectOptionFeeder<T>;
	/**
	 * Emits an event when the select recieve or lost the focus
	 */
	@Output() selectFocus= new EventEmitter<boolean>();

	/**
	 * Add a class binding for 'is-filled' when the select is filled
	 */
	@HostBinding('class.is-filled') isFilled = false;
	/**
	 * Add a class binding for 'is-focused' when the select is focused
	 */
	@HostBinding('class.is-focused') isFocused = false;


	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		return null;
	}
	private _cvaOnChange: (value: T) => void = () => {};
	_onTouched = () => {};

	constructor(
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
	) {
	}

	// Life Cycle methods
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
		// We make lu-select focusable with tab
		this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
		this._picker.itemSelected
		.subscribe(item => {
			this.value = item ? item.luOptionValue : undefined;
			this._field.closePopover();
			this.isFocused = false;
			this.selectFocus.emit(false);
		});
	}
	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

	ngAfterContentInit() {
		this.luOptions.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe((option) => {
			Promise.resolve().then(() => {
				this._picker.resetOptions(this.luOptions.toArray(), this._forceChangeValue);
				this._forceChangeValue = true;
			});

		});

		Promise.resolve().then(() => {
			if (this.clearer) {
				let first = true;
				this.clearer.subscribe((value: T) => {
					if (!first && this.value) {
						this.value = value;
					}
						if (first) {
							first = false;
						}
				});
			}

			// We have to deal in a different way a IOptionFeeder
			if (this.optionFeeder){
				this._picker.optionFeeder = this.optionFeeder;
				this.optionFeeder.registerKeyevent(this.onKeydown.bind(this));
				this.optionFeeder.registerChangeOptions(this._optionChanges.bind(this));
				this.optionFeeder.registerSelectOption(this._optionSelected.bind(this));
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
		if (this.clearer) {
			this.clearer.canRemove(canRemove);
		}
		this._canRemove = canRemove;
	}

	private _optionChanges(options: LuSelectOption<T>[]): void {
		this._forceChangeValue = false;
		this.luOptions.reset(options);
		this.luOptions.notifyOnChanges();
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
		this.value = option ? option.luOptionValue : null;
	}

	// render/display
	protected render(value = this._selectOption) {
		this._elementRef.nativeElement.value = this.display(value);
	}
	protected display(value: LuSelectOption<T> | null): string {
		// If we haven't a LuSelectOption but there is a value on select, and if we have an optionFeeder, then
		// we show the display value offer by the optionFeeder
		if (!value && this.value && this.optionFeeder) {
			return this.optionFeeder.textValue(this.value);
		}
		if (!value) {
			return '';
		}
		return value.viewValue;
	}

	// host listening
	@HostListener('keydown', ['$event'])
	onKeydown($event) {
		switch ($event.key) {
			case ESCAPE:
				if (this._field.popoverOpen) {
					this._field.closePopover();
				}
				break;
			case DELETE:
			case BACKSPACE:
				if (this.clearer) {
					this.value = this.clearer.clearValue();
				}
				break;
			case HOME:
				$event.preventDefault();
				return this._picker.onHomeKeydown(this._field.popoverOpen);
			case END:
				$event.preventDefault();
				return this._picker.onEndKeydown(this._field.popoverOpen);
			case ENTER_KEY:{
				this._field.popoverOpen ? this._picker.onEnterKeydown() : this._field.openPopover();
				if(this._field.popoverOpen && this.optionFeeder) {
					this.optionFeeder.open();
				}
				return;
			}
			case DOWN_KEY:
				$event.preventDefault();
				return this._picker.onDownKeydown(this._field.popoverOpen);
			case UP_KEY:
				$event.preventDefault();
				return this._picker.onUpKeydown(this._field.popoverOpen);
		}
	}

	@HostListener('blur', ['$event'])
	blur(e) {
		this._onTouched();
		if (this.optionFeeder && this.optionFeeder.focused) {
			return;
		}
		this.isFocused = false;
		this.selectFocus.emit(false);
		this._field.closePopover();
	}

	@HostListener('click')
	clicked() {
		this._field.togglePopover();
		if (this._field.popoverOpen && this.optionFeeder) {
			this.optionFeeder.open();
		}
		this.isFocused = this._field.popoverOpen;
		this.selectFocus.emit(this._field.popoverOpen);
		this._picker.search(this._strValue);
	}

	@HostListener('focus')
	focused(){
		this.isFocused = true;
		this.selectFocus.emit(true);
	}

	/**
	 * Inner method for close management
	*/
	_onClose(){
		this.isFocused = this._field.popoverOpen;
		this.selectFocus.emit(this._field.popoverOpen);
	}

	// Utilities

	get _strValue(): string {
		return this.value ? this._elementRef.nativeElement.value as string : (this.placeholder ? this.placeholder : '');
	}
	private _emitClearable() {
		this.canRemove(this.clearer && !!this.value);
	}

	/** detect via JSON.stringify if both value are equals */
	protected _same(oldItem: T, newItem: T) {
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
