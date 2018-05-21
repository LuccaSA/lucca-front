import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
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
	AbstractControl,
} from '@angular/forms';
import { LuSelectDirective } from './directive/select.directive';
import { LuSelectPicker } from './picker/select-picker.component';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { startWith } from 'rxjs/operators/startWith';
import { takeUntil } from 'rxjs/operators/takeUntil';
import {
	LuSelectOption,
	ASelectOptionFeeder,
	ISelectOptionFeeder,
} from './option';
import { ISelectClearer, LuSelectClearerComponent } from './clearer';
import { sameOption, findOption, findArrayOption, LuSelectIntl } from './utils';
import { Subscription } from 'rxjs/Subscription';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './select.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelect),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuSelect),
			multi: true,
		},
	],
	styleUrls: ['./select.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class LuSelect<T>
	implements
		ControlValueAccessor,
		AfterContentInit,
		AfterViewInit,
		OnInit,
		OnDestroy {
	/** Emits whenever the component is destroyed. */
	private _destroy$ = new Subject<void>();
	/** inner validator */
	protected _validator: ValidatorFn | null;

	/** True if the the component allow the clear of data  */
	_canRemove = false;
	/** The value of the select */
	get value(): T | T[] | null {
		return this._value;
	}
	/** Set the value, an event (canremove) will be sent if the directive is clearable */
	set value(value: T | T[] | null | undefined) {
		let valueTemp = value;
		if (valueTemp === null) {
			// We have to deal with the fact that the clearer could not be set => we do nothing
			if (!this.clearer) {
				return;
			}
			// Else we take the value offer by the clearer
			valueTemp = this.clearer.clearValue();
			if (this.multiple) {
				valueTemp = valueTemp ? [valueTemp] : [];
			}
		}
		const lastValue = this._value;
		this._value = valueTemp;
		// emit change
		if (!sameOption(lastValue, valueTemp)) {
			this.isFilled = !!this._value;
			this._cvaOnChange(valueTemp);
			if (this.clearer) {
				this._emitClearable();
			}
			// Transfer the information to popover
			this._picker.selectOption(value);
		}
		// We render the option
		this._selectOption = this.multiple ? findArrayOption(this._picker.luSelectOptions(), <T[]>value) :
				findOption(this._picker.luSelectOptions(), <T>value);

		// We check the option if multiple
		if (this.multiple) {
			(<LuSelectOption<T>[]>this._selectOption).map(luOption => luOption.checked = true);
		}
		// render
		this.render(this._selectOption);
	}

	// Inner values
	protected _value: T | T[] | null;
	protected _selectOption: LuSelectOption<T> | LuSelectOption<T>[] | null;
	private _forceChangeValue = true;

	// Inner Children
	@ViewChild(LuSelectDirective) _field: LuSelectDirective;
	@ViewChild(LuSelectPicker) _picker: LuSelectPicker<T>;
	/**
	 * List of LuSelectOptions
	 */
	@ContentChildren(LuSelectOption, { descendants: true })
	luOptions: QueryList<LuSelectOption<T>>;

	/** The placeholder of the component, it is used as label (material design) */
	@Input() placeholder: string;

	@Input() multiple = false;

	private _selectAll = true;

	set selectAll(selectAll) {
		this._selectAll = selectAll;
	}

	get selectAll(): boolean {
		return this._selectAll;
	}
	_partialSelectAll = false;
	_selectAllLabel = '';

	/**
	 * Reference of the clearer
	 */
	@ContentChild(LuSelectClearerComponent) clearer: ISelectClearer<T>;
	/**
	 * Reference of the optionFeeder
	 */
	@ContentChild(ASelectOptionFeeder)
	optionFeederContent: ISelectOptionFeeder<T>;
	@ViewChild(ASelectOptionFeeder) optionFeederView: ISelectOptionFeeder<T>;
	private _optionFeeder: ISelectOptionFeeder<T>;
	/**
	 * Emits an event when the select recieve or lost the focus
	 */
	@Output() selectFocus = new EventEmitter<boolean>();

	/**
	 * Add a class binding for 'is-filled' when the select is filled
	 */
	@HostBinding('class.is-filled') isFilled = false;
	/**
	 * Add a class binding for 'is-focused' when the select is focused
	 */
	@HostBinding('class.is-focused') isFocused = false;

	private _intlChanges: Subscription;
	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		return null;
	}
	private _cvaOnChange: (value: T | T[]) => void = () => {};
	_onTouched = () => {};

	constructor(
		public _intl: LuSelectIntl,
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
		protected _changeDetectorRef: ChangeDetectorRef,
	) {
		this._selectAllLabel = this._intl.selectAllLabel;
		this._intlChanges = _intl.changes.subscribe(() => {
			this._changeDetectorRef.markForCheck();
			this._selectAllLabel = this._intl.selectAllLabel;
			}
		);
	}

	// Life Cycle methods
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);
		// We make lu-select focusable with tab
		this._renderer.setAttribute(
			this._elementRef.nativeElement,
			'tabindex',
			'0',
		);
		this._picker.itemSelected.subscribe(item => {
			if (!this.multiple) {
				this.value = item ? item.luOptionValue : undefined;
				this._field.closePopover();
				this.isFocused = false;
				this.selectFocus.emit(false);
			}
		});
	}
	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

	ngAfterContentInit() {
		this.luOptions.changes
		.pipe(startWith(null), takeUntil(this._destroy$))
			.subscribe(option => {
				Promise.resolve().then(() => {
					this.luOptions.map(luOption => luOption.multiple = this.multiple);
					if (this.multiple) {
						findArrayOption(this.luOptions.toArray(), <T[]>this.value).map(luOption => luOption.checked = true);
					}
					this._picker.resetOptions(
						this.luOptions.toArray(),
						this._forceChangeValue,
					);
					this._forceChangeValue = true;
				});
			});

		Promise.resolve().then(() => {
			if (this.clearer) {
				let first = true;
				this.clearer.subscribe((value: T) => {
					if (!first && this.value) {
						if (this.multiple) {
							// We update the state of checked items
							const tempValue = value ? [value] : [];
							this.luOptions.map(luOption => luOption.checked = false);
							findArrayOption(this.luOptions.toArray(), <T[]>tempValue).map(luOption => luOption.checked = true);
							this.value =  tempValue;
							this._selectAll = (<T[]>this.value).length > 0;
						} else {
							this.value = value;
						}
					}
					if (first) {
						first = false;
					}
				});
			}

			// We have to deal in a different way a IOptionFeeder
			if (this.optionFeederContent) {
				this.initOptionFeeder(this.optionFeederContent);
			}
		});
	}

	ngAfterViewInit() {
		// this._selectElement = this._elementRef.nativeElement.querySelector('lu-select');
		// this._selectElement.setAttribute('tabindex', '-1');
		// We have to deal in a different way a IOptionFeeder
		if (this.optionFeederView) {
			this.initOptionFeeder(this.optionFeederView);
		}
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

	protected initOptionFeeder(optionFeeder: ISelectOptionFeeder<T>): void {
		this._optionFeeder = optionFeeder;
		this._picker.optionFeeder = optionFeeder;
		optionFeeder.registerKeyevent(this.onKeydown.bind(this));
		optionFeeder.registerChangeOptions(this._optionChanges.bind(this));
		optionFeeder.registerSelectOption(this._optionSelected.bind(this));

		// render async to avoid expressionchanged exception
		Promise.resolve().then(() => {
			this.render();
		});
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
		this._changeDetectorRef.markForCheck();
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
		if (this.multiple) {
			const selectedValues = [...(<T[]>this.value)];
			if (option.checked) {
				// We have to check that the value wasn't already selected
				if (!selectedValues.find(value => sameOption(value, option.luOptionValue))) {
					selectedValues.push(option.luOptionValue);
				}
			}

			if (!option.checked) {
				const indexOption = selectedValues.findIndex(value => sameOption(value, option.luOptionValue));
				if (indexOption !== -1) {
					selectedValues.splice(indexOption, 1);
				}
			}
			const nbOptions = this._optionFeeder ? this._optionFeeder.length() : this._picker.luSelectOptions().length;
			if (!this.selectAll && selectedValues.length === nbOptions) {
				this.selectAll = true;
			}
			this._partialSelectAll = this.selectAll && selectedValues.length !== nbOptions;
			this.value = selectedValues;
			return;
		}

		this.value = option ? option.luOptionValue : null;
	}

	_selectAllItems(): void {
		this.selectAll = !this.selectAll;
		this._partialSelectAll = false;
		this._picker.luSelectOptions().map(luOption =>  luOption.checked = this.selectAll);
		const selectedValues = [...<T[]>this.value];
		selectedValues.length = 0;
		if (!this.selectAll) {
			this.value = selectedValues;
			return;
		}

		if (!this._optionFeeder) {
			selectedValues.push(...this._picker.luSelectOptions().map(luOption => luOption.luOptionValue));
			this.value = selectedValues;
			return;
		}

		// We delegate the select all behaviour to the option feeder
		this._optionFeeder.getAllEntities().subscribe((options: T[]) => {
			selectedValues.push(...options);
			this.value = selectedValues;
		});

	}

	// render/display
	protected render(value = this._selectOption) {
		this._elementRef.nativeElement.value = this.display(value);
	}
	protected display(value: LuSelectOption<T> | LuSelectOption<T>[] | null): string {
		if (!value) {
			return '';
		}

		// We have to deal with multiple values, if more than one element is selected, we
		// show the number and the type, else, we show the value expected
		if (this.multiple && (<T[]>this.value).length > 1) {
			const allEntitiesSelected = (<T[]>this.value).length === this.luOptions.length;
			const noEntitiesSelected = (<T[]>this.value).length === 0;
			const quantityLabel = noEntitiesSelected ? this._intl.noLabel : allEntitiesSelected ? this._intl.allLabel : (<T[]>this.value).length;
			const typeLabel = allEntitiesSelected ? this._intl.allTypeLabel : this._intl.typeLabel;
			return `${quantityLabel} ${typeLabel}`;
		}

		const tempValue = this.multiple ? (<T[]>this.value)[0] : <T>this.value;
		// If we haven't a LuSelectOption but there is a value on select, and if we have an optionFeeder, then
		// we show the display value offer by the optionFeeder
		if (tempValue && this._optionFeeder) {
			return this._optionFeeder.textValue(tempValue);
		}
		const optionValue = this.multiple ? (<LuSelectOption<T>[]>value)[0] : <LuSelectOption<T>>value;
		return optionValue ? optionValue.viewValue : '';
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
					const clearValue = this.clearer.clearValue();
					if (this.multiple) {
						const tempValue = clearValue ? [clearValue] : [];
						this.luOptions.map(luOption => luOption.checked = false);
						findArrayOption(this.luOptions.toArray(), <T[]>tempValue).map(luOption => luOption.checked = true);
						this._selectAll = (<T[]>tempValue).length > 0;
						this.value = tempValue;
						// We update the state of check items
					} else {
						this.value = clearValue;
					}
				}
				break;
			case HOME:
				$event.preventDefault();
				return this._picker.onHomeKeydown(this._field.popoverOpen);
			case END:
				$event.preventDefault();
				return this._picker.onEndKeydown(this._field.popoverOpen);
			case ENTER_KEY: {
				this._field.popoverOpen
					? this._picker.onEnterKeydown()
					: this._field.openPopover();
				if (this._field.popoverOpen && this._optionFeeder) {
					this._optionFeeder.open();
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
		if (this._optionFeeder && this._optionFeeder.focused) {
			return;
		}
		this.isFocused = false;
		this.selectFocus.emit(false);
		this._field.closePopover();
	}

	@HostListener('click')
	clicked() {
		this._field.togglePopover();
		if (this._field.popoverOpen && this._optionFeeder) {
			this._optionFeeder.open();
		}
		this.isFocused = this._field.popoverOpen;
		this.selectFocus.emit(this._field.popoverOpen);
		this._picker.search(this._strValue);
	}

	@HostListener('focus')
	focused() {
		this.isFocused = true;
		this.selectFocus.emit(true);
	}

	/**
	 * Inner method for close management
	 */
	_onClose() {
		this.isFocused = this._field.popoverOpen;
		this.selectFocus.emit(this._field.popoverOpen);
	}

	// Utilities

	get _strValue(): string {
		return this.value
			? (this._elementRef.nativeElement.value as string)
			: this.placeholder ? this.placeholder : '';
	}
	private _emitClearable() {
		this.canRemove(this.clearer
			&& this.multiple ? (!!this.value && (<T[]>this.value).length !== 0) : !!this.value);
	}
}
