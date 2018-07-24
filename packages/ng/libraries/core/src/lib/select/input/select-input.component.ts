import {
	ChangeDetectionStrategy,
	Component,
	Input,
	HostBinding,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ViewChild,
	ContentChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LuPopoverTrigger } from '../../popover/index';
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
export class LuSelectInputComponent<T = any> extends LuPopoverTrigger implements ControlValueAccessor {
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
	private _cvaOnChange = () => {};
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
	popover: ILuSelectPickerPanel<T>;
	@Input('picker') set _attrPicker(picker: ILuSelectPickerPanel) { this.popover = picker; }
	@ContentChild(LuSelectPickerComponent) set _contentChildPicker(picker: ILuSelectPickerPanel) { this.popover = picker; }

	openPopover() {
		super.openPopover();
		this.popover.onSelect.subscribe(val => this.value = val);
	}

}
