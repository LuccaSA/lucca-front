import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ILuPopoverPanel, LuPopoverComponent, luTransformPopover } from '../../popover/index';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-select-picker',
	templateUrl: './select-picker.component.html',
	styleUrls: ['./select-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuSelectPicker',
})
export class LuSelectPickerComponent<T = any> extends LuPopoverComponent implements ILuPopoverPanel {
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
	}
}
