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
import { LuPopoverComponent } from '../../popover';

/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-api-picker',
	templateUrl: './api-picker.component.html',
	styleUrls: ['./api-picker.component.scss'],
})
export class LuApiPickerComponent extends LuPopoverComponent implements OnInit {

	constructor(protected _elementRef: ElementRef) {
		super(_elementRef);
	}
	ngOnInit() {
	}
}
