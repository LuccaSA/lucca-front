import {
	AfterContentInit,
	Component,
	ContentChildren,
	OnInit,
	Input,
	Output,
	NgZone,
	EventEmitter,
	OnDestroy,
	QueryList,
	ElementRef,
} from '@angular/core';
import { LuPopoverComponent, transformPopover, PopoverTriggerEvent } from '../../popover';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operators/map';
import 'rxjs/operators/mergeMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import {filter} from 'rxjs/operators/filter';
import {find} from 'rxjs/operators/find';
import {take} from 'rxjs/operators/take';
import {merge} from 'rxjs/observable/merge';
import {defer} from 'rxjs/observable/defer';
import {switchMap} from 'rxjs/operators/switchMap';
import {startWith} from 'rxjs/operators/startWith';
import {takeUntil} from 'rxjs/operators/takeUntil';
import { standardSelectTemplate } from './select.template';
import {LuSelectOption, LuSelectOptionSelectionChange} from '../option';


/**
 * The component that provides available options with the luSelect directive
 */
@Component({
	selector: 'lu-select-picker',
	template: standardSelectTemplate,
	styleUrls: ['./select-picker.component.scss'],
	animations: [
		transformPopover,
	],
})
export class LuSelectPicker<T> extends LuPopoverComponent implements AfterContentInit, OnInit, OnDestroy {

	/** Observable of options */
	protected _options$ = new BehaviorSubject<T[]>([]);
	/** Inner reference of cursor in the list of options */
	protected _highlightIndex = 0;
	/** Number of options */
	protected _optionsLength = 0;
	/** Observable of the index for easier manipulating */
	protected _highlightIndex$ = new BehaviorSubject<number>(this._highlightIndex);

	/** Emits whenever the component is destroyed. */
	private _destroy$ = new Subject<void>();

	/** Reference of the highlight option (of type LuSelectOption) */
	private _highlightedLuOption: LuSelectOption<T>;
	/** Refence of the value of the highlight option */
	private _highlightedOption: T;
	/** Observable for highlight mecanism */
	private _highlightedOptionSub: Subscription;

	/** emits when the user selects an element */
	@Output() itemSelected  = new EventEmitter<LuSelectOption<T>>();

	/** All of the defined select options. */
	@ContentChildren(LuSelectOption, { descendants: true })
	private _luOptions: QueryList<LuSelectOption<T>> = new QueryList<LuSelectOption<T>>();
	/** Observable of the LuSelectOption, contained in the popover  */
	luOptions$ = new BehaviorSubject<LuSelectOption<T>[]>([]);

	/** Observable use for the detection of selection */
	private _optionSelectionChanges: Observable<LuSelectOptionSelectionChange<T>> = defer(() => {
		if (this._luOptions) {
			return merge(...this._luOptions.map(option => option.onSelectionChange));
		}

		return this._ngZone.onStable
			.asObservable()
			.pipe(take(1), switchMap(() => this._optionSelectionChanges));
	});

	constructor(
		protected _elementRef: ElementRef,
		private _ngZone: NgZone,
	) {
		super(_elementRef);
		this.triggerEvent = 'none';
	}

	// LifeCycle methods
	ngOnInit() {
		this._options$.next([]);
		this._highlightedOptionSub = Observable.combineLatest(
			this._options$,
			this._highlightIndex$,
			(options, index) => {
				if (!!options) {
					return {option: options[index], index};
				}
				return undefined;
			}
		).subscribe(o => {
			this._highlightedOption = o.option;
			if (this._highlightedLuOption) {
				this._highlightedLuOption.unfocus();
			}
			this._highlightedLuOption = this._luOptions.find((option, index) => index === o.index);
			if (this._highlightedLuOption) {
				this._highlightedLuOption.focus();
			}
		});
	}
	ngOnDestroy() {
		this._highlightedOptionSub.unsubscribe();
		this._destroy$.next();
		this._destroy$.complete();
	}

	ngAfterContentInit() {
		this.luOptions$.subscribe(luOptions => {
			if (this._luOptions && this._luOptions.length === 0) {
				this._luOptions.reset(luOptions);
			}
		});
		this._luOptions.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe(() => {
			this.luOptions$.next(this._luOptions.toArray());
			// Defer setting the value in order to avoid the "Expression
			// has changed after it was checked" errors from Angular.
			Promise.resolve().then(() => {
				this._resetOptions();
			});
		});
	}


	/** Drops current option subscriptions and IDs and resets from scratch. */
	private _resetOptions(): void {
		// if (!this.options || this.options.length === 0) {
			this._optionSelectionChanges.pipe(
				takeUntil(merge(this._destroy$, this._luOptions.changes)),
				filter(event => event.isUserInput)
			).subscribe(event => {
				this.selectOption(event.source.luOptionValue);
			});
			this._optionsLength = this._luOptions.length;
			this._options$.next(this._luOptions.map<T>(luOption => luOption.luOptionValue));

		// }
	}

	/**
	 * Check if two objects are equals (use JSON.Stringify)
	 * @param oldItem the first item to compare
	 * @param newItem the second item to compare
	 * @returns true if the elements are equals.
	 */
	protected same(oldItem: T, newItem: T): boolean {
		if (oldItem === newItem) {
			return true;
		}
		if (!oldItem && !newItem) {
			return true;
		}
		if (!oldItem || !newItem) {
			return false;
		}
		return JSON.stringify(oldItem) === JSON.stringify(newItem);
	}

	/**
	 * Search an option in the list of options of the popover
	 * @param option the option to find
	 * @returns an observable of the LuSelectOption find
	 */
	find(option: T): Observable<LuSelectOption<T>> {
		return this.luOptions$.map(selectOptions => {
			return selectOptions.find(selectOption => this.same(selectOption.luOptionValue, option));
		});
	}
	/**
	 * Search for highliting the option corresponding to the clue
	 * @param clue
	 */
	search(clue: string = ''): void {
		this.luOptions$.subscribe(selectOptions => {
			this._highlightIndex = selectOptions.findIndex((selectOption) => {
				return selectOption.viewValue === clue;
			});

			this._highlightIndex$.next(this._highlightIndex);
		});
	}
	/**
	 * Select the option (value) of the popover.
	 * This method will fire an event of itemSelected
	 * @param option : the option should be in the list of options of the popover
	 */
	selectOption(option: T): void {
		this.luOptions$.subscribe(selectOptions => {
			if (!selectOptions || selectOptions.length === 0) {
				return;
			}

			this._highlightIndex = selectOptions.findIndex((selectOption) => {
				return this.same(selectOption.luOptionValue, option);
			});

			this._highlightIndex$.next(this._highlightIndex);
			this.itemSelected.emit(selectOptions[this._highlightIndex]);
		});
	}

	// Comes from LuPopoverComponent
	onMouseDown($e) {
		$e.preventDefault();
	}
	/** Call when the key "Enter" is hit */
	onEnterKeydown(): void {
		this.selectOption(this._highlightedOption);
	}
	/**
	 * Call when the key "Down" is hit
	 * @param popoverOpen true if the popover is open
	 */
	onDownKeydown(popoverOpen: boolean = false): void {
		this._highlightIndex++;
		this._applyHighlightIndex();
		if (!popoverOpen) {
			this._selectHighlightOption();
		}
	}
	/**
	 * Call when the key "Up" is hit
	 * @param popoverOpen true if the popover is open
	 */
	onUpKeydown(popoverOpen: boolean = false): void {
		this._highlightIndex--;
		this._applyHighlightIndex();
		if (!popoverOpen) {
			this._selectHighlightOption();
		}
	}
	/**
	 * Call when the key "Home" is hit
	 * @param popoverOpen true if the popover is open
	 */
	onHomeKeydown(popoverOpen: boolean = false): void {
		this._highlightIndex = 0;
		this._applyHighlightIndex();
		if (!popoverOpen) {
			this._selectHighlightOption();
		}
	}
	/**
	 * Call when the key "End" is hit
	 * @param popoverOpen true if the popover is open
	 */
	onEndKeydown(popoverOpen: boolean = false): void {
		this._highlightIndex = this._optionsLength - 1;
		this._applyHighlightIndex();
		if (!popoverOpen) {
			this._selectHighlightOption();
		}
	}
	/**
	 * Helper method for updating the highlight index (observable, ...)
	 */
	private _applyHighlightIndex(): void {
		this._highlightIndex = Math.min(this._highlightIndex, this._optionsLength - 1);
		this._highlightIndex = Math.max(this._highlightIndex, 0);
		this._highlightIndex$.next(this._highlightIndex);
	}

	/**
	 * Helper method to fire the event of selection
	 */
	private _selectHighlightOption(): void {
		this.luOptions$.subscribe(selectOptions => {
			if (!!selectOptions) {
				this.itemSelected.emit(selectOptions[this._highlightIndex]);
			}
		});
	}

	/**
	 * @returns an observable of the values of options
	 */
	protected getOptions(): Observable<T[]> {
		return this._options$;
	}
}
