import { ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export type ILuInput = ControlValueAccessor;

export abstract class ALuInput<T, U extends HTMLElement = HTMLElement>
	implements ILuInput
{
	protected _placeholder: string;
	get placeholder() {
		return this._placeholder;
	}
	protected _value: T;
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _elementRef: ElementRef<U>,
		protected _renderer: Renderer2,
	) {}
	setValue(value: T) {
		this.value = value;
		this._cvaOnChange(value);
		this._onTouched();
	}
	get value(): T {
		return this._value;
	}
	set value(value: T) {
		this._value = value;
		this.render();
		this.applyClasses();
		this._changeDetectorRef.markForCheck();
	}
	// From ControlValueAccessor interface
	writeValue(value: T) {
		this.value = value;
	}
	// From ControlValueAccessor interface
	protected _cvaOnChange: (value: T) => void = () => {
		return;
	};
	registerOnChange(fn: (value: T) => void) {
		this._cvaOnChange = fn;
	}
	// From ControlValueAccessor interface
	protected _onTouched: () => void = () => {
		return;
	};
	registerOnTouched(fn: () => void) {
		this._onTouched = fn;
	}
	protected isEmpty() {
		return this.value === null || this.value === undefined;
	}
	protected applyClasses() {
		if (this.isEmpty()) {
			this._renderer.removeClass(this._elementRef.nativeElement, 'is-filled');
		} else {
			this._renderer.addClass(this._elementRef.nativeElement, 'is-filled');
		}
	}

	protected abstract render(): void;
}
