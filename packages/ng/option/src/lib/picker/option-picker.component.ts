/* eslint-disable @angular-eslint/no-output-native */
import { DOCUMENT } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	Directive,
	EventEmitter,
	forwardRef,
	Inject,
	Input,
	OnDestroy,
	Output,
	QueryList,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { ALuPickerPanel } from '@lucca-front/ng/picker';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { merge, of } from 'rxjs';
import { delay, map, share } from 'rxjs/operators';
import { ALuOptionItem } from '../item/option-item.model';
import {
	ALuOptionPicker,
	ILuOptionPickerPanel,
	LuOptionComparer,
} from './option-picker.model';

@Directive()
export abstract class ALuOptionPickerComponent<
		T,
		O extends import('../item/option-item.model').ILuOptionItem<T> = import('../item/option-item.model').ILuOptionItem<T>,
	>
	extends ALuOptionPicker<T, O>
	implements ILuOptionPickerPanel<T>, OnDestroy, AfterViewInit
{
	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('panel-classes')
	set inputPanelClasses(classes: string) {
		this.panelClasses = classes;
	}
	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container. Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('content-classes')
	set inputContentClasses(classes: string) {
		this.contentClasses = classes;
	}

	/**
	 * This method take a function that compare options from feeder and options from form value.
	 * By default, compare JSON values.
	 */
	@Input('option-comparer')
	set inputOptionComparer(comparer: LuOptionComparer<T>) {
		this.optionComparer = comparer;
	}

	@Output() override close = new EventEmitter<void>();
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() override onSelectValue = new EventEmitter<T>();

	protected _isOptionItemsInitialized: boolean;
	protected _defaultOverlayPaneClasses = ['mod-optionPicker'];

	protected _options: O[] = [];
	protected _optionsQL: QueryList<O>;
	@ContentChildren(ALuOptionItem, { descendants: true }) set optionsQL(
		ql: QueryList<O>,
	) {
		this._optionsQL = ql;
	}

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		@Inject(DOCUMENT) protected document: Document,
	) {
		super();
		this._isOptionItemsInitialized = false;
		this.overlayPaneClass = this._defaultOverlayPaneClasses;
	}

	protected _emitSelectValue(val: T) {
		this.onSelectValue.emit(val);
	}
	ngOnDestroy() {
		super.destroy();
	}
	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}
	_emitHoveredEvent(h: boolean): void {
		this.hovered.emit(h);
	}
	override onOpen() {
		super.onOpen();
		this.highlightIndex = 0;
		// this._initObserver();
		this._applySelected();
	}
	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<HTMLElement>) {
		this.templateRef = tr;
	}

	// keydown
	override _handleKeydown(event: KeyboardEvent) {
		super._handleKeydown(event);
		switch (event.key) {
			case 'Enter':
				this._selectHighlighted();
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'ArrowUp':
				this._decrHighlight();
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'ArrowDown':
				this._incrHighlight();
				event.preventDefault();
				event.stopPropagation();
				break;
		}
	}
	protected _highlightIndex = -1;
	get highlightIndex() {
		return this._highlightIndex;
	}
	set highlightIndex(i: number) {
		this._highlightIndex = i;
		this._applyHighlight(true);
	}
	protected _initHighlight() {
		this._subs.add(
			this._options$.subscribe((options) => {
				const optionCount = options.length;
				const newHighlight = Math.max(
					Math.min(this.highlightIndex, optionCount - 1),
					-1,
				);
				if (newHighlight !== this.highlightIndex) {
					this.highlightIndex = newHighlight;
				}
			}),
		);
		setTimeout(() => {
			this.highlightIndex = -1;
		}, 1);
	}
	protected _incrHighlight() {
		const optionCount = this._options.length;
		this.highlightIndex = Math.max(
			Math.min(this.highlightIndex + 1, optionCount - 1),
			-1,
		);
	}
	protected _decrHighlight() {
		this.highlightIndex = Math.max(this.highlightIndex - 1, -1);
	}
	protected _applyHighlight(reScroll = false) {
		if (!this.isOpen) {
			return;
		}
		// const highlightClass = 'is-highlighted';
		const options = this._options;
		// remove `is-highlighted` class from all other options
		options.forEach((option) => (option.highlighted = false));
		// apply `is-highlighted` to current highlight
		const highlightedOption = options[this.highlightIndex];
		if (highlightedOption) {
			highlightedOption.highlighted = true;
			// scroll to let the highlighted option visible
			if (reScroll) {
				setTimeout(() => {
					this._scrollToHighlight(highlightedOption.element.nativeElement);
				}, 1);
			}
		}
		this._changeDetectorRef.markForCheck();
	}
	protected _scrollToHighlight(targetElt: HTMLElement) {
		if (!targetElt) {
			return;
		}
		const contentElt =
			this.document.querySelector<HTMLElement>('.lu-picker-content');
		if (!contentElt) {
			return;
		}
		const headerElt = this.document.querySelector<HTMLElement>(
			'.lu-picker-content .lu-picker-header',
		);
		const headerHeight = headerElt ? headerElt.offsetHeight : 0;
		const footerElt = this.document.querySelector<HTMLElement>(
			'.lu-picker-content .lu-picker-footer',
		);
		const footerHeight = footerElt ? footerElt.offsetHeight : 0;
		// highlighted option is too high
		if (contentElt.scrollTop + headerHeight > targetElt.offsetTop) {
			contentElt.scrollTop = targetElt.offsetTop - headerHeight;
			return;
		}
		// highlight option is too low
		const offsetHeight = contentElt.offsetHeight;
		if (
			contentElt.scrollTop + offsetHeight - footerHeight <
			targetElt.offsetTop + targetElt.offsetHeight
		) {
			contentElt.scrollTop =
				targetElt.offsetTop +
				targetElt.offsetHeight -
				offsetHeight +
				footerHeight;
			return;
		}
	}
	protected _selectHighlighted() {
		const options = this._options ? this._options : [];
		const highlightedOption = options[this.highlightIndex];
		if (highlightedOption) {
			this._toggle(highlightedOption);
		}
	}
	protected _initSelected() {
		this._subs.add(
			this._options$.subscribe(() => {
				this._applySelected();
			}),
		);
	}
	protected _applySelected() {
		if (!this._options) {
			return;
		}
		// const selectedClass = 'is-selected';

		const options = this._options;
		// remove `is-selected` class from all other options
		options.forEach((option) => (option.selected = false));

		// add `is-selected` to all selected indexes
		const selectedIndexes: number[] = [];
		if (!this.multiple) {
			const selectedIndex = this._options.findIndex((o) =>
				this.optionComparer(o.value, this._value as T),
			);
			if (selectedIndex !== -1) {
				selectedIndexes.push(selectedIndex);
			}
			if (selectedIndex !== -1 && this.highlightIndex === -1) {
				this.highlightIndex = selectedIndex;
			}
		} else {
			const values = <T[]>this._value || [];
			const matchingIndexes = this._options
				.map((o) => values.some((v) => this.optionComparer(o.value, v)))
				.map((f, i) => (f ? i : null))
				.filter((i) => i !== null);
			selectedIndexes.push(...matchingIndexes);
			// selectedIndexes.push(
			// 	...values
			// 	.map(v => this._options.findIndex(o => this.optionComparer(o.value, v)))
			// 	.filter(i => i !== -1)
			// );
		}
		selectedIndexes.forEach((i) => {
			const option = options[i];
			if (option) {
				option.selected = true;
			}
		});
	}

	protected initItems() {
		const items$ = merge(of(this._optionsQL), this._optionsQL.changes).pipe(
			map<QueryList<O>, O[]>((q) => q.toArray()),
			delay(0),
			share(),
		);
		items$.subscribe((o) => (this._options = o || []));
		this._options$ = items$;
		this._initHighlight();
		this._initSelected();
	}
	ngAfterViewInit() {
		this.initItems();
	}
}
/**
 * basic option picker panel
 */
@Component({
	selector: 'lu-option-picker',
	templateUrl: './option-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuOptionPickerComponent),
		},
	],
})
export class LuOptionPickerComponent<
	T,
	O extends import('../item/option-item.model').ILuOptionItem<T> = import('../item/option-item.model').ILuOptionItem<T>,
> extends ALuOptionPickerComponent<T, O> {
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		@Inject(DOCUMENT) document: Document,
	) {
		super(_changeDetectorRef, document);
	}
}
