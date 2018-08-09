import {
	ChangeDetectorRef,
	ViewContainerRef,
	ElementRef,
	Renderer2,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ALuPopoverTrigger } from '../../popover/index';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ILuPickerPanel, ALuPickerPanel, ILuClearer, ILuInput } from '../../input/index';

export abstract class ALuSelectInput<T = any, P extends ILuPickerPanel<T> = ILuPickerPanel<T>, C extends ILuClearer<T> = ILuClearer<T>>
extends ALuPopoverTrigger<P>
implements ControlValueAccessor, ILuInputWithPicker<T>, ILuInput<T> {
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
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
	protected _placeholder: string;
	get placeholder() { return this._placeholder; }
	/**
	 * contriol value accessor interface implementation
	 */
	protected _value: T;
	setValue(value) {
		if (this.disabled) {
			return;
		}
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
	set disabled(d) { this._disabled = d; }
	get disabled() { return this._disabled; }
	setDisabledState(disabled: boolean) {
		this.disabled = disabled;
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
	/**
	 * popover trigger class extension
	 */
	protected set _picker(picker: P) {
		this.popover = picker;
		this.subToPickerEvts();
	}
	protected set _clearer(clearer: C) {
		if (!!clearer && !!clearer.onClear) {
			clearer.onClear.subscribe(value => this.setValue(value));
		}
	}
	protected subToPickerEvts() {
		if (!!this.popover) {
			this.popover.onSelectValue.subscribe(value => this.setValue(value));
			this.popover.close.subscribe(e => {
				this._onTouched();
				this.closePopover();
			});
		}
	}

	protected _getOverlayConfig(): OverlayConfig {
		const config = super._getOverlayConfig();
		const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
		config.width = `${clientRect.width}px`; // might become min/maxWidth
		return config;
	}

	protected abstract render();
}
