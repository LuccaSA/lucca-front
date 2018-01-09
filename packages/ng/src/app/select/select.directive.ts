import {
	OnChanges,
	Directive,
	OnInit,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	OnDestroy,
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
	Validators,
	ValidatorFn,
	ValidationErrors,
	AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { LuPopoverTrigger } from '../popover';
import { LuSelectPopover } from './select.popover.component';
import { LuSelectOption, LuSelectOptionRendering } from './select.option.component';

const ENTER_KEY = 'Enter';
const UP_KEY = 'ArrowUp';
const DOWN_KEY = 'ArrowDown';

/**
 * Directive to put on a div to allow it to react with a popover to emulate a select component
 */
@Directive({
	selector: 'div[luSelect]',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuSelectDirective), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => LuSelectDirective), multi: true },
	],
})
export class LuSelectDirective<T>
extends LuPopoverTrigger
implements ControlValueAccessor, OnDestroy, OnChanges, OnInit,  Validator {

	/** the name of the picker linked to this input */
	@Input('luSelect') popover: LuSelectPopover<T>;

	@Output() canremove = new EventEmitter<boolean>();
	@Input() clearable = false;
	@Input() rendering: LuSelectOptionRendering<T>;

	// value stuff
	protected get _strValue(): string {
		return this._elementRef.nativeElement.innerHTML as string;
	}

	protected _selectOption: LuSelectOption<T> | null;
	protected _value: T | null;
	get value(): T | null {
		return this._value;
	}
	set value(value:  T | null) {
		const lastValue = this._value;
		this._value = value;
		// emit change
		if (!this.same(lastValue, value)) {
			this._valueChange.emit(value);
			this._cvaOnChange(value);
			this.emitClearable();
			this.popover.selectOption(value);
			this.popover.find(value).subscribe(selectOption => {
				this._selectOption = selectOption;
				// render
				this.render(selectOption);
			});
		}
	}
	protected _valueChange = new EventEmitter<T|null>();

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
	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}
	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}

	// host listening
	@HostListener('keydown', ['$event'])
	onKeydown($event) {
		switch ($event.key) {
			case ENTER_KEY:
			return this.popoverOpen ? this.popover.onEnterKeydown() : this.openPopover();
			case DOWN_KEY:
			$event.preventDefault();
			return this.popoverOpen ? this.popover.onDownKeydown() : this.popover.onDownKeydownValidate();
			case UP_KEY:
			$event.preventDefault();
			return this.popoverOpen ? this.popover.onUpKeydown() : this.popover.onUpKeydownValidate();
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
	private _cvaOnChange: (value: T) => void = () => {};


	// init/destroy
	ngOnInit() {
		this._validator = Validators.compose([this._itemValidator]);

		this.popover.itemSelected
		.subscribe(item => {
			this.value = item ? item.value : undefined;
			this.closePopover();
		});

		this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
	}
	ngOnDestroy() {
		this._valueChange.complete();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['clearable']) {
			this.emitClearable();
		}
	}

	emitClearable() {
		this.canremove.emit(this.clearable && !!this.value);
	}

	// validators
	validate(c: AbstractControl): ValidationErrors | null {
		return this._validator ? this._validator(c) : null;
	}

	openPopover() {
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


	private _validatorOnChange = () => {};
	private _itemValidator: ValidatorFn = (): ValidationErrors | null => {
		if (!this._strValue) {
			return null;
		}
		if (!!this.value) {
			return null;
		}
		return {'tpApi': {'text': `0 or several items match '${this._elementRef.nativeElement.value}'`}};
	}

	// render/display
	protected render(value = this._selectOption) {
		this._elementRef.nativeElement.innerHTML = this.display(value);
	}
	protected display(value: LuSelectOption<T> | null): string {
		if (!value) {
			return '';
		}
		return value.viewValue;
	}
	protected same(oldItem: T, newItem: T) {
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
