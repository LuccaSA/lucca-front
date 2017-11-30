import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	forwardRef,
	OnDestroy,
	Renderer2,
	ElementRef,
	HostListener
} from '@angular/core';
import { LuPopoverComponent, transformPopover, PopoverTriggerEvent } from '../../popover';

/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-api-picker',
	templateUrl: '../../popover/popover.component.html',
	styleUrls: ['./api-picker.component.scss'],
	animations: [
		transformPopover
	],
})
export class LuApiPickerComponent extends LuPopoverComponent implements OnInit {
	triggerEvent = 'focus' as PopoverTriggerEvent;

	constructor(protected _elementRef: ElementRef) {
		super(_elementRef);
	}
	ngOnInit() {
	}
}
