import {
	ChangeDetectorRef,
	ViewContainerRef,
	ElementRef,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ALuPopoverTrigger } from '../../popover/index';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ILuPickerPanel, ALuPickerPanel, ILuClearer } from '../../input/index';

export abstract class ALuSelectInput<T = any, P extends ILuPickerPanel<T> = ILuPickerPanel<T>, C extends ILuClearer<T> = ILuClearer<T>>
extends ALuPopoverTrigger<P>
implements ControlValueAccessor, ILuInputWithPicker<T> {
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {
		super(
			_overlay,
			_elementRef,
			_viewContainerRef,
		);
	}
	/**
	 * contriol value accessor interface implementation
	 */
	protected _value: T;
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
