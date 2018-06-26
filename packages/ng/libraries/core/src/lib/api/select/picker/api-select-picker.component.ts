import {
	ChangeDetectionStrategy,
	Component,
	Input,
	AfterViewInit,
	ViewChild,
	ViewChildren,
	ElementRef,
	forwardRef,
	ChangeDetectorRef,
	OnDestroy,
	QueryList,
} from '@angular/core';
import {
	ASelectOptionFeeder,
	ISelectOptionFeeder,
	LuSelectOption,
	LuSelectOptionSelectionChange,
	LuSelectSearchIntl,
	LuSelectIntl,
	ASelectScrollPicker,
} from '../../../select/index';
import { IApiSelectFeeder, IApiSelectFeederWithPaging } from '../feeder/index';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/observable/merge';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'lu-api-select-picker',
	templateUrl: './api-select-picker.component.html',
	styleUrls: ['./api-select-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ASelectOptionFeeder,
			useExisting: forwardRef(() => LuApiSelectPicker),
		},
	],
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
// tslint:disable-next-line:component-class-suffix
export class LuApiSelectPicker<T = any> extends ASelectScrollPicker<T>
	implements AfterViewInit {
	// Inner references
	_clue = '';
	_noResults = false;
	private _clue$: Subject<string> = new Subject<string>();
	/** Refence the ISelectApiFeeder instance that will be use to fill the select */
	@Input() selectApiFeeder: IApiSelectFeeder<T>;

	/**
	 * The input element
	 */
	@ViewChild('inputClue') _inputElement: ElementRef;

	constructor(
		protected _elementRef: ElementRef,
		public _intlSelect: LuSelectIntl,
		public _intl: LuSelectSearchIntl,
		protected _changeDetectorRef: ChangeDetectorRef,
	) {
		super(_elementRef, _intlSelect, _intl, _changeDetectorRef);

		this._clue$
			.debounceTime(100) // wait 100ms after the last event before emitting last event
			.distinctUntilChanged() // only emit if value is different from previous value
			.subscribe(model => {
				this._clue = model;
				this._noResults = false;
				if (this.selectApiFeeder.isPaged()) {
					(<IApiSelectFeederWithPaging<T>>this
						.selectApiFeeder).resetPagingStart();
				}
				this._options = [];
				this._populateList();
				this._changeDetectorRef.markForCheck();
			});

		this._options = [];
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
		if (!this.selectApiFeeder) {
			// tslint:disable-next-line:no-string-throw
			throw 'selectApiFeeder attribute is not set';
		}
		// We initialize at first the list with a first set
		this._populateList();
	}

	// Events
	_onMouseDown($e) {
		this._focused = true;
		// We prevent propagation to avoid lost of focus in input field
		$e.stopPropagation();
		this._changeDetectorRef.markForCheck();
	}

	_onBlur() {
		this._focused = false;
		// When we quit the field, we reset the search item
		this._noResults = false;
		this._clue$.next('');
		this._changeDetectorRef.markForCheck();
	}

	_onKeydown($event: KeyboardEvent) {
		this._callbackKeyEvent($event);
	}

	_onFieldChange(clue: string) {
		this._clue$.next(clue);
	}

	/**
	 * See ISelectOptionFeeder
	 */
	open(): void {
		// When we open the list we reset the start index because we load all items when opening the popup
		/*if (this.selectApiFeeder.isPaged()) {
			(<ISelectApiFeederWithPaging<T>>this.selectApiFeeder).resetPagingStart();
		}*/
		this._focused = true;
		this._inputElement.nativeElement.focus();
		if (!this._options || this._options.length === 0) {
			this._options = [];
			this._populateList();
		}
		this._changeDetectorRef.markForCheck();
	}

	/**
	 * See ISelectOptionFeeder
	 */
	textValue(item: T): string {
		if (!this.selectApiFeeder) {
			return '';
		}
		return this.selectApiFeeder.textValue(item);
	}

	/**
	 * See ISelectScrollable
	 */
	loadMoreOptions(): Observable<T[]> {
		if (!this.selectApiFeeder) {
			return empty();
		}
		return this.selectApiFeeder.getItems(this._clue);
	}

	_selectOption(option: LuSelectOptionSelectionChange<T>) {
		this._callbackSelectOption(option.source);
	}

	length(): number {
		return this.selectApiFeeder.length();
	}

	getAllEntities(): Observable<T[]> {
		return this.selectApiFeeder.getAllEntities();
	}
}
