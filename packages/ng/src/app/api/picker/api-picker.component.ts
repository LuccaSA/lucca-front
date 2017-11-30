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
import { IApiItem } from '../api.model';

/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-api-picker',
	// templateUrl: '../../popover/popover.component.html',
	templateUrl: './api-picker.component.html',
	styleUrls: ['./api-picker.component.scss'],
	animations: [
		transformPopover
	],
})
export class LuApiPickerComponent extends LuPopoverComponent implements OnInit {
	triggerEvent = 'none' as PopoverTriggerEvent;

	/** emits when the user selects an element */
	@Output() itemSelected  = new EventEmitter<IApiItem>();

	constructor(protected _elementRef: ElementRef) {
		super(_elementRef);
	}
	ngOnInit() {
	}
	debug() {
		this.itemSelected.emit({ id: 12, name: 'debug' });
	}
}
