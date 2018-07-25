import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ContentChild,
	HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ALuPopoverTrigger } from '../../popover/index';
import { Overlay } from '@angular/cdk/overlay';
import { LuSelectPickerComponent, ILuSelectPickerPanel } from '../picker/index';

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
export class LuSelectInputComponent<T = any> extends ALuPopoverTrigger<ILuSelectPickerPanel<T>> implements ControlValueAccessor {
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
	private _value: T;
	setValue(value) {
		this.value = value;
		this._cvaOnChange(value);
	}
	get value(): T {
		return this._value;
	}
	set value(value: T) {
		this._value = value;
		this._changeDetectorRef.markForCheck();
	}
	// From ControlValueAccessor interface
	writeValue(value: T) {
		this.value = value;
	}
	// From ControlValueAccessor interface
	private _cvaOnChange = (v: T) => {};
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
	@Input('picker') set _attrPicker(picker: ILuSelectPickerPanel) { this.popover = picker; }
	@ContentChild(LuSelectPickerComponent) set _contentChildPicker(picker: ILuSelectPickerPanel) { this.popover = picker; }

	openPopover() {
		super.openPopover();
		this.popover.onSelect.subscribe(value => this.setValue(value));
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
}
