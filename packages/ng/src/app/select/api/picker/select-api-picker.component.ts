import {
	Component,
	Input,
	AfterViewInit,
	ViewChild,
	ViewChildren,
	ElementRef,
	forwardRef,
	ChangeDetectorRef,
	OnDestroy,
	QueryList
} from '@angular/core';
import {
	ASelectOptionFeeder,
	ISelectOptionFeeder,
	LuSelectOption,
	LuSelectOptionSelectionChange,
} from '../../option';
import {
	LuSelectSearchIntl,
} from '../../searcher';
import {
	ASelectScrollPicker,
} from '../../scroll';
import {ISelectApiFeeder} from '../feeder';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {merge} from 'rxjs/observable/merge';
import {defer} from 'rxjs/observable/defer';
import {empty} from 'rxjs/observable/empty';
import {IApiItem} from '../../../api/api.model';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'select-api-picker',
	templateUrl: './select-api-picker.component.html',
	styleUrls: ['./select-api-picker.component.scss'],
	providers: [{provide: ASelectOptionFeeder, useExisting: forwardRef(() => LuSelectApiPicker)}]
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
// tslint:disable-next-line:component-class-suffix
export class LuSelectApiPicker<T = any>
	extends ASelectScrollPicker<T>
	implements
		OnDestroy,
		AfterViewInit {

	// Inner references
	_clue = '';
	_noResults = false;
	private _clue$: Subject<string> = new Subject<string>();
	@Input() selectApiFeeder: ISelectApiFeeder<T>;

	private _intlChanges: Subscription;
	/**
	 * The input element
	 */
	@ViewChild('inputClue') _inputElement: ElementRef;


	constructor(

		protected _elementRef: ElementRef,
		public _intl: LuSelectSearchIntl,
		private _changeDetectorRef: ChangeDetectorRef) {
			super(_elementRef);

			this._clue$
			.debounceTime(100) // wait 100ms after the last event before emitting last event
			.distinctUntilChanged() // only emit if value is different from previous value
			.subscribe(model => {
				this._clue = model;
				this._noMoreResults = false;
				this.selectApiFeeder.resetPagingStart();
				this._options = [];
				this._populateList();
			});

			this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
			this._options = [];
			// this._populateList();
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
		if (!this.selectApiFeeder) {
			// tslint:disable-next-line:no-string-throw
			throw 'selectApiFeeder attribute is not set';
		}
		this._populateList();

	}

	// Events
	_onMouseDown($e) {
		this._focused = true;
		// We prevent propagation to avoid lost of focus in input field
		$e.stopPropagation();
	}

	_onBlur() {
		this._focused = false;
		// When we quit the field, we reset the search item
		this.selectApiFeeder.resetPagingStart();
		this._noMoreResults = false;
		this._clue$.next('');
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
		this.selectApiFeeder.resetPagingStart();
		this._focused = true;
		this._inputElement.nativeElement.focus();
		if (!this._options || this._options.length === 0) {
			this._options = [];
			this._populateList();
			// this._resetOptions('', true);
		}
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

	loadMoreOptions(): Observable<T[]> {
		if (!this.selectApiFeeder) {
			return empty();
		}
		return this.selectApiFeeder.getItems(this._clue);
	}

	_selectOption(option: LuSelectOptionSelectionChange<T>) {
		this._callbackSelectOption(option.source);
	}

}
