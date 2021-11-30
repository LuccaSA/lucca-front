import {
	ChangeDetectorRef,
	ViewContainerRef,
	ElementRef,
	Renderer2,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ALuPopoverTrigger, LuPopoverTarget, ILuPopoverTarget } from '@lucca-front/ng/popover';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ILuClearer, ILuInput, ILuInputDisplayer } from '@lucca-front/ng/input';
import { ILuInputWithPicker, ILuPickerPanel } from '@lucca-front/ng/picker';
import { Subscription } from 'rxjs';

export abstract class ALuSelectInput<T = any, TPicker extends ILuPickerPanel<T> = ILuPickerPanel<T>>
extends ALuPopoverTrigger<TPicker>
implements ControlValueAccessor, ILuInputWithPicker<T>, ILuInput {
	protected _subs = new Subscription();
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef,
		protected override _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
	) {
		super(
			_overlay,
			_elementRef,
			_viewContainerRef,
		);
		this.target = new LuPopoverTarget() as ILuPopoverTarget;
		this.target.elementRef = this._elementRef;
		this.target.position = 'below';
		this.target.alignment = 'left';
	}
	protected _isContentInitialized = false;
	protected _placeholder: string;
	get placeholder() { return this._placeholder; }
	set placeholder(p: string) { this._placeholder = p; }
	/**
	 * contriol value accessor interface implementation
	 */
	protected _value: T | T[];
	setValue(value: T | T[]) {
		if (this.disabled) {
			return;
		}
		this.value = value;
		this._cvaOnChange(value);
		this._onTouched();
	}
	get value(): T | T[] {
		return this._value;
	}
	set value(value: T | T[]) {
		this._value = value;
		this.render();
		this.applyClasses();
		if (!!this._picker) {
			this._picker.setValue(value);
		}
		this._changeDetectorRef.markForCheck();
	}
	// From ControlValueAccessor interface
	writeValue(value: T | T[]) {
		this.value = value;
	}
	// From ControlValueAccessor interface
	protected _cvaOnChange = (v: T | T[]) => { };
	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}
	// From ControlValueAccessor interface
	protected _onTouched = () => { };
	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}
	override set disabled(d) { this._disabled = d; }
	override get disabled() { return this._disabled; }
	setDisabledState(disabled: boolean) {
		this.disabled = disabled;
		this._changeDetectorRef.markForCheck();
	}
	protected isEmpty() {
		const isEmptyArray = Array.isArray(this.value) && this.value.length === 0;
		return this.value === null || this.value === undefined || isEmptyArray;
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
	protected set _picker(picker: TPicker) {
		this.panel = picker;
		picker.multiple = this._multiple;
		this.subToPickerEvts();
	}
	protected get _picker() { return this.panel; }
	protected set _clearer(clearer: ILuClearer<T>) {
		if (!!clearer && !!clearer.onClear) {
			this._subs.add(clearer.onClear.subscribe(value => this.setValue(value)));
		}
	}
	protected subToPickerEvts() {
		if (!!this.panel) {
			this._subs.add(this.panel.onSelectValue.subscribe(value => this.setValue(value)));
		}
	}

	override closePopover() {
		this._onTouched();
		super.closePopover();
	}

	onDestroy() {
		if (this._popoverOpen) {
			this.closePopover();
		}
		this.destroyPopover();
		this._subs.unsubscribe();
		this._cleanUpSubscriptions();
	}

	protected override _getOverlayConfig(): OverlayConfig {
		const config = super._getOverlayConfig();
		const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
		config.minWidth = `${Math.max(185, clientRect.width)}px`; // might become min/maxWidth
		return config;
	}

	/* Rendering via a inpt displayer */
	protected _displayer: ILuInputDisplayer<T>;
	protected _displayContainer: ViewContainerRef;
	protected set displayer(d: ILuInputDisplayer<T>) {
		this._displayer = d;
		this.render();
	}
	protected set displayContainer(vcr: ViewContainerRef) {
		this._displayContainer = vcr;
	}
	protected render() {
		if (!this._displayer || !this._isContentInitialized) { return; }
		if (this.useMultipleViews()) {
			this.renderMultipleViews();
		} else {
			this.renderSingleView();
		}
	}
	protected useMultipleViews() {
		return this._multiple && !!this._displayer && !this._displayer.multiple;
	}

	protected renderSingleView() {
		this.clearDisplay();
		if (this.value !== null && this.value !== undefined) {
			const newView = this.getView(this.value);
			this.displayView(newView);
		}
	}
	protected clearDisplay() {
		this._displayContainer.clear();
	}
	protected getView(value: T | T[]) {
		if (!!this._displayer) {
			return this._displayer.getViewRef(value);
		}
		return undefined;
	}
	protected displayView(view) {
		if (!!view) {
			this._displayContainer.insert(view);
		}
	}

	protected renderMultipleViews() {
		this.clearDisplay();
		const values = <T[]>this.value || [];
		const views = values.map(value => this.getView(value));
		views.forEach(view => this.displayView(view));
	}
	// multiple
	protected _multiple = false;
	set multiple(m: boolean) {
		this._multiple = m;
		if (this._picker) {
			this._picker.multiple = m;
		}
	}
	get multiple() { return this._multiple; }
}
