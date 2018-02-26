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
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import { standardApiPickerTemplate } from './api-picker.template';

/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-api-picker',
	templateUrl: './api-picker.component.html',
	styleUrls: ['./api-picker.component.scss'],
	animations: [
		transformPopover
	],
})
export class LuApiPickerComponent<T extends IApiItem> extends LuPopoverComponent implements OnInit, OnDestroy {
	triggerEvent = 'none' as PopoverTriggerEvent;

	protected _options$ = new BehaviorSubject<T[]>([]);
	options$ = this._options$.asObservable();
	protected highlightIndex = 0;
	protected optionsLength = 0;
	protected _highlightIndex$ = new BehaviorSubject<number>(this.highlightIndex);
	highlightIndex$ = this._highlightIndex$.asObservable();

	highlightedOption: T;
	highlightedOptionSub: Subscription;

	/** emits when the user selects an element */
	@Output() itemSelected  = new EventEmitter<T>();
	/** the api to query */
	@Input() api: string;
	/** filter to apply while querying the api */
	@Input() filter: string;

	constructor(
		protected _elementRef: ElementRef,
		protected _http: HttpClient
	) {
		super(_elementRef);
	}
	ngOnInit() {
		this.highlightedOptionSub = Observable.combineLatest(
			this.options$,
			this.highlightIndex$,
			(options, index) => {
				if (!!options) {
					return options[index];
				}
				return undefined;
			}
		).subscribe(o => this.highlightedOption = o);
	}
	ngOnDestroy() {
		this.highlightedOptionSub.unsubscribe();
	}
	onMouseDown($e) {
		$e.preventDefault();
	}

	search(clue: string = ''): void {
		this.getOptions(clue)
		.subscribe(options => {
			this.highlightIndex = 0;
			this._highlightIndex$.next(this.highlightIndex);
			this.optionsLength = options.length;
			this._options$.next(options);
		});
	}
	selectOption(option: T) {
		this.itemSelected.emit(option);
	}
	onEnterKeydown() {
		this.selectOption(this.highlightedOption);
	}
	onDownKeydown() {
		this.highlightIndex++;
		this.highlightIndex = Math.min(this.highlightIndex, this.optionsLength - 1);
		this._highlightIndex$.next(this.highlightIndex);
	}
	onUpKeydown() {
		this.highlightIndex--;
		this.highlightIndex = Math.max(this.highlightIndex, 0);
		this._highlightIndex$.next(this.highlightIndex);
	}

	protected getOptions(clue: string = ''): Observable<T[]> {
		const params = [`name=like,${clue}`, 'paging=0,10', 'fields=id,name'];
		if (this.filter) {
			params.push(this.filter);
		}
		const url = `${this.api}?${params.join('&')}`;
		return this._http.get<{ data: { items: T[] } }>(url)
		.map(r => r.data.items);
	}
}
