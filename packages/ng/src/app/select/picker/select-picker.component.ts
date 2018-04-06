import {
	Component,
	ContentChildren,
	ContentChild,
	OnInit,
	Input,
	Output,
	NgZone,
	EventEmitter,
	OnDestroy,
	QueryList,
	ElementRef,
} from '@angular/core';
import {
	LuPopoverComponent,
	transformPopover,
	PopoverTriggerEvent,
} from '../../popover';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import 'rxjs/operators/mergeMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import { filter } from 'rxjs/operators/filter';
import { find } from 'rxjs/operators/find';
import { take } from 'rxjs/operators/take';
import { merge } from 'rxjs/observable/merge';
import { defer } from 'rxjs/observable/defer';
import { switchMap } from 'rxjs/operators/switchMap';
import { startWith } from 'rxjs/operators/startWith';
import { takeUntil } from 'rxjs/operators/takeUntil';
import {
	LuSelectOption,
	LuSelectOptionSelectionChange,
	ISelectOptionFeeder,
} from '../option';
import { sameOption } from '../utils';

/**
 * The component that provides available options with the luSelect directive
 */
@Component({
	selector: 'lu-select-picker',
	templateUrl: './select-picker.component.html',
	styleUrls: ['./select-picker.component.scss'],
	animations: [transformPopover],
})
// tslint:disable-next-line:component-class-suffix
export class LuSelectPicker<T> extends LuPopoverComponent
	implements OnInit, OnDestroy {
	/** Observable of options */
	protected _options$ = new BehaviorSubject<T[]>([]);
	/** Inner reference of cursor in the list of options */
	protected _highlightIndex = 0;
	/** Number of options */
	protected _optionsLength = 0;
	/** Observable of the index for easier manipulating */
	protected _highlightIndex$ = new BehaviorSubject<number>(
		this._highlightIndex,
	);

	/** Emits whenever the component is destroyed. */
	private _destroy$ = new Subject<void>();

	/** Reference of the highlight option (of type LuSelectOption) */
	private _highlightedLuOption: LuSelectOption<T>;
	/** Refence of the value of the highlight option */
	private _highlightedOption: T;
	/** Observable for highlight mecanism */
	private _highlightedOptionSub: Subscription;
	private _selectOptionValue: T;

	/** emits when the user selects an element */
	@Output() itemSelected = new EventEmitter<LuSelectOption<T>>();

	/** Observable of the LuSelectOption, contained in the popover  */
	private luOptions$ = new BehaviorSubject<LuSelectOption<T>[]>([]);

	/**
	 * Reference to OptionFeeder when available
	 */
	optionFeeder: ISelectOptionFeeder<T>;

	/** Observable use for the detection of selection */
	private _optionSelectionChanges: Observable<
		LuSelectOptionSelectionChange<T>
	> = defer(() => {
		if (this.luOptions$) {
			return merge(
				...this.luOptions$.getValue().map(option => option.onSelectionChange),
			);
		}

		return this._ngZone.onStable
			.asObservable()
			.pipe(take(1), switchMap(() => this._optionSelectionChanges));
	});

	constructor(protected _elementRef: ElementRef, private _ngZone: NgZone) {
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
				// We select the option corresponding to _highlightIndex$ or _options$ moves
				if (!!options && index <= options.length) {
					return { option: options[index], index };
				}
				return undefined;
			},
		).subscribe(o => {
			if (!o) {
				return;
			}
			Promise.resolve().then(() => {
				this._highlightedOption = o.option;
				if (this._highlightedLuOption) {
					this._highlightedLuOption.unfocus();
				}
				this._highlightedLuOption = this.luOptions$
					.getValue()
					.find((option, index) => index === o.index);
				if (this._highlightedLuOption) {
					this._highlightedLuOption.focus();
				}
			});
		});
	}
	ngOnDestroy() {
		this.luOptions$.unsubscribe();
		this._highlightedOptionSub.unsubscribe();
		this._destroy$.next();
		this._destroy$.complete();
	}

	/** Drops current option subscriptions and IDs and resets from scratch. */
	public resetOptions(
		options: LuSelectOption<T>[],
		forceChangeValue: boolean = true,
	): void {
		this.luOptions$.next(options);
		this.luOptions$.getValue().map(luOption => {
			luOption.onSelectionChange.subscribe(
				(event: LuSelectOptionSelectionChange<T>) =>
					this.selectOption(event.source.luOptionValue),
			);
		});
		if (forceChangeValue) {
			this.selectOption(this._selectOptionValue);
		}
		this._optionsLength = this.luOptions$.getValue().length;
		this._options$.next(
			this.luOptions$.getValue().map<T>(luOption => luOption.luOptionValue),
		);
	}

	/**
	 * Search for highliting the option corresponding to the clue
	 * @param clue
	 */
	search(clue: string = ''): void {
		const selectOptions = this.luOptions$.getValue(); // subscribe(selectOptions => {
		this._highlightIndex = selectOptions.findIndex(selectOption => {
			return selectOption.viewValue === clue;
		});

		this._highlightIndex$.next(this._highlightIndex);
		// });
	}
	/**
	 * Select the option (value) of the popover.
	 * This method will fire an event of itemSelected
	 * @param option : the option should be in the list of options of the popover
	 */
	selectOption(option: T): void {
		this._selectOptionValue = option;
		const selectOptions = this.luOptions$.getValue();
		this._selectWithoutEmit(option);
		const luSelectOption = selectOptions[this._highlightIndex];
		// We let the selection be effective even if the list is empty, (we won't fire any event in that case)
		if (luSelectOption) {
			this.itemSelected.emit(luSelectOption);
		}
	}

	/**
	 * @return the list of LuSelectOption of the picker
	 */
	public luSelectOptions(): LuSelectOption<T>[] {
		return this.luOptions$.getValue();
	}

	private _selectWithoutEmit(option: T): void {
		const selectOptions = this.luOptions$.getValue();
		if (!selectOptions || selectOptions.length === 0) {
			return;
		}

		this._highlightIndex = selectOptions.findIndex(selectOption => {
			return sameOption(selectOption.luOptionValue, option);
		});

		this._highlightIndex$.next(this._highlightIndex);
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
		this._highlightIndex = Math.min(
			this._highlightIndex,
			this._optionsLength - 1,
		);
		this._highlightIndex = Math.max(this._highlightIndex, 0);
		this._highlightIndex$.next(this._highlightIndex);
		this._scrollTo();
	}

	/**
	 * Inner function to deal with scroll
	 */
	private _scrollTo() {
		if (this.optionFeeder) {
			this.optionFeeder.scrollTo(this._highlightIndex);
		} else {
			const luOption = this.luOptions$.getValue()[this._highlightIndex];
			this._elementRef.nativeElement.scrollTop = luOption.offsetTop();
		}
	}

	/**
	 * Helper method to fire the event of selection
	 */
	private _selectHighlightOption(): void {
		const selectOptions = this.luOptions$.getValue(); // selectOptions => {
		if (!!selectOptions) {
			this.itemSelected.emit(selectOptions[this._highlightIndex]);
		}
		// });
	}

	/**
	 * @returns an observable of the values of options
	 */
	protected getOptions(): Observable<T[]> {
		return this._options$;
	}
}
