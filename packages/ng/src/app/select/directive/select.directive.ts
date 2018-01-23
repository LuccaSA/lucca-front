import {
	OnChanges,
	Directive,
	OnInit,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	OnDestroy,
	AfterViewInit,
	Renderer2,
	ElementRef,
	SimpleChanges,
	ViewContainerRef,
	HostListener,
	HostBinding
} from '@angular/core';
import {
	Overlay,
	OverlayConfig,
} from '@angular/cdk/overlay';
import {
	NgModel,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	Validator,
	ValidatorFn,
	ValidationErrors,
	AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { LuPopoverTrigger } from '../../popover';
import { LuSelectPicker } from '../picker/select-picker.component';
import { LuSelectOption } from '../option/select-option.component';

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

/**
 * Directive to put on a div to allow it to react with a popover to emulate a select component
 */
@Directive({
	selector: 'input[luSelect]',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuSelectDirective), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuSelectDirective), multi: true },
	],
})
export class LuSelectDirective<T>
extends LuPopoverTrigger
implements ControlValueAccessor, OnDestroy, OnChanges, OnInit, AfterViewInit, Validator {

	/** the name of the picker linked to this input */
	@Input('luSelect') popover: LuSelectPicker<T>;

	/** true if the directive allow the remove of the data (false by default).
	 * If set to false, the first value of options will be select if nothing is select */
	@Input() clearable = false;

	/** the event trigger when the directive allow to clear the the value (true or false) */
	@Output() canremove = new EventEmitter<boolean>();

	/** The current value selected */
	get value(): T | null {
		return this._value;
	}
	/** Set the value, an event (canremove) will be sent if the directive is clearable */
	set value(value:  T | null) {
		let valueTemp = value;
		if (valueTemp === null && !this.clearable && this.popover && this.popover.luOptions$.value.length > 0) {
			valueTemp = this.popover.luOptions$.value[0].value;
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
			this.popover.selectOption(value);
			this.popover.find(value).subscribe(selectOption => {
				this._selectOption = selectOption;
				// render
				this.render(selectOption);
			});
		}
	}
	// value stuff
	protected get _strValue(): string {
		return this._elementRef.nativeElement.value as string;
	}

	// inner references
	protected _selectOption: LuSelectOption<T> | null;
	protected _value: T | null;
	protected _validator: ValidatorFn | null;

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
	) {
		super(
			_overlay,
			_elementRef,
			_viewContainerRef,
		);
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

	// host listening
	@HostListener('keydown', ['$event'])
	onKeydown($event) {
		switch ($event.key) {
			case ESCAPE:
				if (this.popoverOpen) {
					this.closePopover();
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
			return this.popover.onHomeKeydown(this.popoverOpen);
			case END:
			$event.preventDefault();
			return this.popover.onEndKeydown(this.popoverOpen);
			case ENTER_KEY:
			return this.popoverOpen ? this.popover.onEnterKeydown() : this.openPopover();
			case DOWN_KEY:
			$event.preventDefault();
			return this.popover.onDownKeydown(this.popoverOpen);
			case UP_KEY:
			$event.preventDefault();
			return this.popover.onUpKeydown(this.popoverOpen);
		}
	}

	@HostListener('blur', ['$event'])
	blur(e) {
		this._onTouched();
		this.closePopover();
	}

	@HostListener('click')
	clicked() {
		super.togglePopover();
		if (this.popoverOpen) {
			this.popover.search(this._strValue);
		}
	}
	_onTouched = () => {};

	// From ControlValueAccessor interface
	private _cvaOnChange: (value: T) => void = () => {};


	// init/destroy/changes
	ngOnInit() {
		this.popover.itemSelected
		.subscribe(item => {
			this.value = item ? item.value : undefined;
			this.closePopover();
		});

		this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
	}

	ngAfterViewInit() {
		Promise.resolve().then(() => {
			if (!this.popover) {
				throw new Error('No overlay was linked to the directive');
			}

			if (!this.clearable && !this.value) {
				if (this.popover.luOptions$.value.length === 0) {
					throw new Error('Empty list for the select ! As it is not clearable, the list cannot be empty !');
				}
				this.value = this.popover.luOptions$.value[0].value;
			}
		});
	}
	ngOnDestroy() {
		// this._valueChange.complete();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['clearable']) {
			this._emitClearable();
		}
	}

	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	// For Validators interface
	private _validatorOnChange = () => {};

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

	// Emit canremove event
	private _emitClearable() {
		this.canremove.emit(this.clearable && !!this.value);
	}
	/** Open the popover linked to the directive */
	openPopover(): void {
		super.openPopover();
		this._subscribeToBackdrop();
	}
	protected _getOverlayConfig(): OverlayConfig {
		const config = super._getOverlayConfig();
		config.hasBackdrop = true;
		config.backdropClass = 'cdk-overlay-transparent-backdrop';
		const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
		config.minWidth = `${clientRect.width}px`;
		return config;
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
