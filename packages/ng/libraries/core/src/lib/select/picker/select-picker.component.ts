import { ChangeDetectionStrategy, Component, Input, HostBinding, ChangeDetectorRef, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LuPopoverTrigger, ILuPopoverPanel, LuPopoverComponent } from '../../popover/index';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-select-picker',
	templateUrl: './select-picker.component.html',
	styleUrls: ['./select-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuSelectPickerComponent<T = any> extends LuPopoverComponent implements ILuPopoverPanel {
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
	}
}
