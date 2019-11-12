import { ControlValueAccessor } from '@angular/forms';
import { ILuPickerPanel } from './picker/input-picker.model';
import { ILuPopoverTrigger } from '../overlay/index';
import { ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';

export interface ILuInput<T = any> extends ControlValueAccessor {}

export interface ILuInputWithPicker<TValue = any, TPanel extends ILuPickerPanel<TValue> = ILuPickerPanel<TValue>>
extends ILuInput<TValue>, ControlValueAccessor, ILuPopoverTrigger<TPanel> {}

export abstract class ALuInput<T = any> implements ILuInput<T> {
	protected _placeholder: string;
	get placeholder() { return this._placeholder; }
	protected _value: T;
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
	) {}
	setValue(value) {
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
	protected _cvaOnChange = (v: T) => {};
	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}
	// From ControlValueAccessor interface
	protected _onTouched = () => {};
	registerOnTouched(fn: any) {
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
