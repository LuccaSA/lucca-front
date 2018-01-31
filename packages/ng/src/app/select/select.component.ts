import {
	AfterContentInit,
	Component,
	Input,
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
	protected _canRemove = false;
	/** The value of the select */
	get value(): T | null {
		return this._value;
	}
	/** Set the value, an event (canremove) will be sent if the directive is clearable */
	set value(value:  T | null) {
		let valueTemp = value;
		if (valueTemp === null
				&& !this.clearable
				&& this._picker
				&& this.luOptions
				&& this.luOptions.length > 0) {
			valueTemp = this.luOptions.first.value;
		}
		const lastValue = this._value;
		this._value = valueTemp;
		// emit change
		if (!this._same(lastValue, valueTemp)) {
			this._cvaOnChange(valueTemp);
			if (this.clearable) {
				this._emitClearable();
			}
			// Transfer the information to popover
			this._picker.selectOption(value);
			this._picker.find(value).subscribe(selectOption => {
				this._selectOption = selectOption;
				// render
				this.render(selectOption);
			});
		}
	}

	// Inner values
	protected _value: T | null;
	protected _selectOption: LuSelectOption<T> | null;

	// Inner Children
	@ViewChild(LuSelectDirective) _field: LuSelectDirective;
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
		this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
		this._picker.itemSelected
		.subscribe(item => {
			this.value = item ? item.value : undefined;
			this._field.closePopover();
		});
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

	// render/display
	protected render(value = this._selectOption) {
		this._elementRef.nativeElement.value = this.display(value);
	}
	protected display(value: LuSelectOption<T> | null): string {
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
				if (this.clearable) {
					this.value = null;
				}
				break;
			case HOME:
			$event.preventDefault();
			return this._picker.onHomeKeydown(this._field.popoverOpen);
			case END:
			$event.preventDefault();
			return this._picker.onEndKeydown(this._field.popoverOpen);
			case ENTER_KEY:
			return this._field.popoverOpen ? this._picker.onEnterKeydown() : this._field.openPopover();
			case DOWN_KEY:
			$event.preventDefault();
			return this._picker.onDownKeydown(this._field.popoverOpen);
			case UP_KEY:
			$event.preventDefault();
			return this._picker.onUpKeydown(this._field.popoverOpen);
			case TAB:
			break;
			default:
			$event.preventDefault();
		}
	}

	@HostListener('blur', ['$event'])
	blur(e) {
		this._onTouched();
		this._field.closePopover();
	}

	@HostListener('click')
	clicked() {
		this._field.togglePopover();
		if (this._field.popoverOpen) {
			this._picker.search(this._strValue);
		}
	}

	// Utilities

	protected get _strValue(): string {
		return this._elementRef.nativeElement.value as string;
	}
	private _emitClearable() {
		this.canRemove(this.clearable && !!this.value);
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
