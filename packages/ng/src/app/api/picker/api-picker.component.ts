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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { standardApiPickerTemplate } from './api-picker.template';

/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-api-picker',
	template: standardApiPickerTemplate,
	styleUrls: ['./api-picker.component.scss'],
	animations: [
		transformPopover
	],
})
export class LuApiPickerComponent<T extends IApiItem> extends LuPopoverComponent implements OnInit {
	triggerEvent = 'none' as PopoverTriggerEvent;

	private _options$ = new BehaviorSubject<IApiItem[]>([]);
	options$ = this._options$.asObservable();

	/** emits when the user selects an element */
	@Output() itemSelected  = new EventEmitter<T>();

	constructor(
		protected _elementRef: ElementRef,
		protected _http: HttpClient
	) {
		super(_elementRef);
	}
	ngOnInit() {
	}
	onMouseDown($e) {
		$e.preventDefault();
	}

	search(api: string, clue: string = '', filter: string = ''): void {
		this._http.get<{ data: { items: T[] } }>(`${api}?name=like,${clue}&paging=0,10&fields=id,name`)
		.subscribe(r => {
			this._options$.next(r.data.items);
		});
	}
	selectOption(option: T) {
		this.itemSelected.emit(option);
	}
}
