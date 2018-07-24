import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewEncapsulation,
	ViewChildren,
	ContentChildren,
	AfterContentInit,
	AfterViewInit,
	QueryList,
} from '@angular/core';
import { LuPopoverComponent, luTransformPopover, LuPopoverTriggerEvent } from '../../popover/index';
import { ILuOption, LuOptionComponent } from '../../option';
import { ILuSelectPickerPanel } from './select-picker.model';

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
export class LuSelectPickerComponent<T = any> extends LuPopoverComponent implements ILuSelectPickerPanel, AfterContentInit {
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
		this.triggerEvent = 'click';
	}
	@ContentChildren(LuOptionComponent, { descendants: true}) ccoptions: QueryList<ILuOption>;
	// @ViewChildren(LuOptionComponent) vcoptions: QueryList<ILuOption>;
	ngAfterContentInit() {
		// console.log('content init');
		// console.log(this.ccoptions);
	}
	onOpen() {
		console.log('open');
		console.log(this.ccoptions);
		super.onOpen();
	}
}
