import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ContentChild,
	HostListener,
	TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ALuPopoverTrigger } from '../../popover/index';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ILuPickerPanel, ALuPickerPanel } from '../../input/index';
import { LuOptionItemComponent } from '../../option';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelectInputComponent),
			multi: true,
		},
	],
})
export class LuSelectInputComponent<TValue = any, TPanel extends ILuPickerPanel<TValue> = ILuPickerPanel<TValue>>
extends ALuPopoverTrigger<TPanel>
implements ControlValueAccessor, ILuInputWithPicker<TValue> {
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
	private _value: TValue;
	setValue(value) {
		this.value = value;
		this._cvaOnChange(value);
		this._onTouched();
	}
	get value(): TValue {
		return this._value;
	}
	set value(value: TValue) {
		this._value = value;
		this._changeDetectorRef.markForCheck();
	}
	// From ControlValueAccessor interface
	writeValue(value: TValue) {
		this.value = value;
	}
	// From ControlValueAccessor interface
	private _cvaOnChange = (v: TValue) => {};
	registerOnChange(fn: any) {
		this._cvaOnChange = fn;
	}
	// From ControlValueAccessor interface
	private _onTouched = () => {};
	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}

	/**
	 * popover trigger class extension
	 */
	@Input('picker') set _attrPicker(picker: TPanel) {
		this.popover = picker;
		this.popover.onSelectValue.subscribe(value => this.setValue(value));
		this.popover.close.subscribe(e => this._onTouched());
	}
	@ContentChild(ALuPickerPanel) set _contentChildPicker(picker: TPanel) {
		this.popover = picker;
		this.popover.onSelectValue.subscribe(value => this.setValue(value));
		this.popover.close.subscribe(e => this._onTouched());
	}

	@HostListener('click')
	onClick() {
		super.onClick();
	}
	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}
	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
	onBlur() {
		super.onBlur();
	}

	displayTemplate: TemplateRef<any>;
	@ContentChild(TemplateRef) set _contentChildDisplayTemplate(templateRef: TemplateRef<any>) {
		this.displayTemplate = templateRef;
	}
}
