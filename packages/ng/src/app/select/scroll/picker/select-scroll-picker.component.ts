import {
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
} from '../../option';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISelectScrollable } from './select-scroll-picker.model';
import { LuSelectSearchIntl } from '../../utils';

/**
 * Component that manage the possibility to load the options in an infinite scroll way
 */
// tslint:disable-next-line:component-class-suffix
export abstract class ASelectScrollPicker<T> extends ASelectOptionFeeder<T>
	implements ISelectScrollable<T>, AfterViewInit, OnDestroy {
	// Inner references
	_loading = false;
	_options: T[];
	_noResults = false;
	protected _requestSubscription: Subscription;

	private _intlChanges: Subscription;

	/** The scroll element */
	@ViewChild('scrollElement') _scrollElement: ElementRef;
	/** The list of users (option) */
	@ViewChildren(LuSelectOption) _optionsList: QueryList<LuSelectOption<T>>;

	constructor(
		protected _elementRef: ElementRef,
		public _intl: LuSelectSearchIntl,
		private _changeDetectorRef: ChangeDetectorRef,
	) {
		super();
		this._options = [];
		this._populateList();
		this._intlChanges = _intl.changes.subscribe(() =>
			this._changeDetectorRef.markForCheck(),
		);
	}

	ngOnDestroy() {
		this._intlChanges.unsubscribe();
	}

	ngAfterViewInit(): void {
		this._optionsList.changes.subscribe(options => {
			if (this._callbackOptions) {
				this._callbackOptions(this._optionsList.toArray());
			}
		});
	}

	// Events
	_onScroll($event: Event) {
		// We ask more items when the scroll gooes to (size global of scroll - position of scroll - height of area)
		const scrollHeight = this._scrollElement.nativeElement.scrollHeight;
		const height = this._scrollElement.nativeElement.offsetHeight;
		const top = this._scrollElement.nativeElement.scrollTop;
		if (
			scrollHeight - height - top < 50 &&
			!this._loading &&
			!this._noResults
		) {
			this._populateList();
		}
	}

	protected _populateList(): void {
		this._loading = true;
		// We manage a clean way to cancel the previous observable
		if (this._requestSubscription && !this._requestSubscription.closed) {
			this._requestSubscription.unsubscribe();
			this._requestSubscription = null;
		}

		this._requestSubscription = this.loadMoreOptions().subscribe(
			additionnalOptions => {
				// In all case we concat the list because if it the first time we search, we will concat an empty array to the results
				this._options = this._options.concat(additionnalOptions);
				this._optionsList.setDirty();
				this._optionsList.notifyOnChanges();
				this._noResults = additionnalOptions.length === 0;

				this._requestSubscription = null;
				this._loading = false;
			},
		);
	}

	/**
	 * See ISelectOptionFeeder
	 */
	abstract open(): void;

	/**
	 * See ISelectOptionFeeder
	 */
	scrollTo(index: number) {
		const luOption = this._optionsList.toArray()[index];
		this._scrollElement.nativeElement.scrollTop = luOption.offsetTop();
	}

	/**
	 * See ISelectOptionFeeder
	 */
	abstract textValue(item: T): string;

	/**
	 * See ISelectScrollable
	 */
	abstract loadMoreOptions(): Observable<T[]>;
}
