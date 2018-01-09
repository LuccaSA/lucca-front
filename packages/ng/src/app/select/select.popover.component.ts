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
import { LuPopoverComponent, transformPopover, PopoverTriggerEvent } from '../popover';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operators/map';
import 'rxjs/operators/mergeMap';
import {filter} from 'rxjs/operators/filter';
import {find} from 'rxjs/operators/find';
import {take} from 'rxjs/operators/take';
import {merge} from 'rxjs/observable/merge';
import {defer} from 'rxjs/observable/defer';
import {switchMap} from 'rxjs/operators/switchMap';
import {startWith} from 'rxjs/operators/startWith';
import {takeUntil} from 'rxjs/operators/takeUntil';
import { standardSelectTemplate } from './select.template';
import {LuSelectOption, LuSelectOptionSelectionChange} from './select.option.component';

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;


/**
 * The component that provides available options from the api with the currently inputed text
 */
@Component({
	selector: 'lu-select-popover',
	template: standardSelectTemplate,
	styleUrls: ['./select.popover.component.scss'],
	animations: [
		transformPopover,
	],
})
export class LuSelectPopover<T> extends LuPopoverComponent implements AfterContentInit, OnInit, OnDestroy {
	triggerEvent = 'none' as PopoverTriggerEvent;

	protected _originalOptions: Array<T> = [];
	protected _originalOptions$ = new BehaviorSubject<T[]>([]);
	protected _options$ = new BehaviorSubject<T[]>([]);
	options$ = this._options$.asObservable();
	_optionsTemplate$ = new BehaviorSubject<T[]>([]);
	optionsTemplate$ = this._optionsTemplate$.asObservable();
	protected highlightIndex = 0;
	protected optionsLength = 0;
	protected _highlightIndex$ = new BehaviorSubject<number>(this.highlightIndex);
	highlightIndex$ = this._highlightIndex$.asObservable();

	/** Emits whenever the component is destroyed. */
	private _destroy$ = new Subject<void>();

	highlightedLuOption: LuSelectOption<T>;
	highlightedOption: T;
	highlightedOptionSub: Subscription;
	_id = _uniqueIdCounter++;

	get options(): Array<T> {return this._originalOptions; }
	set options(value: Array<T>) {
		this._originalOptions = value;
		this.optionsLength = value ? value.length : 0;
	}

	/** emits when the user selects an element */
	@Output() itemSelected  = new EventEmitter<LuSelectOption<T>>();

	/** All of the defined select options. */
	@ContentChildren(LuSelectOption, { descendants: true }) luOptions: QueryList<LuSelectOption<T>> = new QueryList<LuSelectOption<T>>();
	luOptions$ = new BehaviorSubject<LuSelectOption<T>[]>([]);

	optionSelectionChanges: Observable<LuSelectOptionSelectionChange<T>> = defer(() => {
		if (this.luOptions) {
			return merge(...this.luOptions.map(option => option.onSelectionChange));
		}

		return this._ngZone.onStable
			.asObservable()
			.pipe(take(1), switchMap(() => this.optionSelectionChanges));
	});

	constructor(
		protected _elementRef: ElementRef,
		private _ngZone: NgZone,
	) {
		super(_elementRef);
	}
	ngOnInit() {
		this._optionsTemplate$.next(this.options);
		this._options$.next(this.options);
		this.highlightedOptionSub = Observable.combineLatest(
			this.options$,
			this.highlightIndex$,
			(options, index) => {
				if (!!options) {
					return {option: options[index], index};
				}
				return undefined;
			}
		).subscribe(o => {
			this.highlightedOption = o.option;
			if (this.highlightedLuOption) {
				this.highlightedLuOption.unfocus();
			}
			this.highlightedLuOption = this.luOptions.find((option, index) => index === o.index);
			if (this.highlightedLuOption) {
				this.highlightedLuOption.focus();
			}
		});
	}
	ngOnDestroy() {
		this.highlightedOptionSub.unsubscribe();
		this._destroy$.next();
		this._destroy$.complete();
	}

	ngAfterContentInit() {
		this.luOptions$.subscribe(luOptions => {
			if (this.luOptions && this.luOptions.length === 0) {
				this.luOptions.reset(luOptions);
			}
		});
		this.luOptions.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe(() => {
			this.luOptions$.next(this.luOptions.toArray());
			this._resetOptions();
		});
	}


	/** Drops current option subscriptions and IDs and resets from scratch. */
	private _resetOptions(): void {
		// if (!this.options || this.options.length === 0) {
			this.optionSelectionChanges.pipe(
				takeUntil(merge(this._destroy$, this.luOptions.changes)),
				filter(event => event.isUserInput)
			).subscribe(event => {
				this.selectOption(event.source.value);
			});
			this.optionsLength = this.luOptions.length;
			this._options$.next(this.luOptions.map<T>(luOption => luOption.value));

		// }
	}

	protected same(oldItem: T, newItem: T) {
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

	onMouseDown($e) {
		$e.preventDefault();
	}

	find(option: T): Observable<LuSelectOption<T>> {
		return this.luOptions$.map(selectOptions => {
			return selectOptions.find(selectOption => this.same(selectOption.value, option));
		});
	}
	search(clue: string = ''): void {
		this.luOptions$.subscribe(selectOptions => {
			this.highlightIndex = selectOptions.findIndex((selectOption) => {
				return selectOption.viewValue === clue;
			});

			this._highlightIndex$.next(this.highlightIndex);
		});
	}
	selectOption(option: T) {
		this.luOptions$.subscribe(selectOptions => {
			this.highlightIndex = selectOptions.findIndex((selectOption) => {
				return this.same(selectOption.value, option);
			});

			this._highlightIndex$.next(this.highlightIndex);
			this.itemSelected.emit(selectOptions[this.highlightIndex]);
		});
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

	onDownKeydownValidate() {
		this.highlightIndex++;
		this.highlightIndex = Math.min(this.highlightIndex, this.optionsLength - 1);
		this._highlightIndex$.next(this.highlightIndex);
		this.selectHighlightOption();
	}

	onUpKeydownValidate() {
		this.highlightIndex--;
		this.highlightIndex = Math.max(this.highlightIndex, 0);
		this._highlightIndex$.next(this.highlightIndex);
		this.selectHighlightOption();
	}

	private selectHighlightOption() {
		this.luOptions$.subscribe(selectOptions => {
			if (!!selectOptions) {
				this.itemSelected.emit(selectOptions[this.highlightIndex]);
			}
		});
	}

	protected getOptions(): Observable<T[]> {
		return this.options$;
	}
}
