import {
	Input,
	AfterViewInit,
	ViewChild,
	ViewChildren,
	ElementRef,
	forwardRef,
	OnDestroy,
	QueryList
} from '@angular/core';
import {
	ASelectOptionFeeder,
	ISelectOptionFeeder,
	LuSelectOption,
} from '../../option';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ISelectScrollable } from './select-scroll-picker.model';

/**
 * Component that manage the possibility to search in the options of a select.
 */
// tslint:disable-next-line:component-class-suffix
export abstract class ASelectScrollPicker<T>
	extends ASelectOptionFeeder<T>
	implements
		ISelectScrollable<T>,
		AfterViewInit {

	// Inner references
	_loading = false;
	_options: T[];
	protected _noMoreResults = false;
	protected _requestSubscription: Subscription;

	/** The scroll element */
	@ViewChild('scrollElement') _scrollElement: ElementRef;
	/** The list of users (option) */
	@ViewChildren(LuSelectOption) _optionsList: QueryList<LuSelectOption<T>>;

	constructor(

		protected _elementRef: ElementRef) {
		super();
		this._options = [];
		this._populateList();
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
		const scrollHeight = this._scrollElement.nativeElement.scrollHeight;
		const height = this._scrollElement.nativeElement.offsetHeight;
		const top = this._scrollElement.nativeElement.scrollTop;
		if (scrollHeight - height - top < 50 && !this._loading && !this._noMoreResults) {
			this._populateList();
		}
	}


	protected _populateList(): void {
		this._loading = true;
		if (this._requestSubscription && !this._requestSubscription.closed) {
			this._requestSubscription.unsubscribe();
			this._requestSubscription = null;
		}

		this._requestSubscription = this.loadMoreOptions().subscribe((additionnalOptions) => {
			this._options = this._options.concat(additionnalOptions);
			this._optionsList.setDirty();
			this._optionsList.notifyOnChanges();
			this._noMoreResults = additionnalOptions.length === 0;

			this._requestSubscription = null;
			this._loading = false;
		});
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
	 *
	 */
	abstract loadMoreOptions(): Observable<T[]>;
}
