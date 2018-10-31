import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	Renderer2,
	ChangeDetectorRef,
	AfterViewInit,
	Input,
} from '@angular/core';
import { luTransformPopover } from '../../popover/index';
import { ILuOptionItem, ALuOptionItem } from '../item/index';
import { ILuOptionPickerPanel, ALuOptionPicker } from './option-picker.model';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { delay } from 'rxjs/operators/delay';
import { ALuPickerPanel } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator } from '../operator/index';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';

/**
* basic option picker panel
*/
@Component({
	selector: 'lu-option-picker',
	templateUrl: './option-picker.component.html',
	styleUrls: ['./option-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuOptionPickerComponent),
		},
	]
})
export class LuOptionPickerComponent<T = any>
extends ALuOptionPicker<T>
implements ILuOptionPickerPanel<T>, OnDestroy, AfterViewInit {
	@Input('overlap-trigger')
	set inputOverlapTrigger(v: boolean) {
		this.overlapTrigger = v;
	}
	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();
	@Output() onSelectValue = new EventEmitter<T>();

	protected _isOptionItemsInited: boolean;

	constructor(
		protected _vcr: ViewContainerRef,
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _renderer: Renderer2) {
		super();
		this.triggerEvent = 'click';
		this._isOptionItemsInited = false;
	}
	protected _options: ILuOptionItem<T>[] = [];
	protected _optionsQL: QueryList<ILuOptionItem<T>>;
	@ContentChildren(ALuOptionItem, { descendants: true }) set optionsQL(ql: QueryList<ILuOptionItem<T>>) {
		this._optionsQL = ql;
		this.initOptionItemsObservable();
	}
	@ContentChildren(ALuOptionItem, { descendants: true, read: ViewContainerRef }) optionsQLVR: QueryList<ViewContainerRef>;

	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._operators = ql.toArray();
	}

	protected _select(val: T) {
		this.onSelectValue.emit(val);
		if (!this.multiple) {
			this._emitCloseEvent();
		}
	}
	ngOnDestroy() {
		super.destroy();
	}
	ngAfterViewInit() {
		this._initHighlight();
		this._initSelected();
	}
	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}
	onOpen() {
		super.onOpen();
		this.highlightIndex = -1;
		this._applySelected();
	}
	@ViewChild(TemplateRef)
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
	}

	// keydown
	_handleKeydown(event: KeyboardEvent) {
		super._handleKeydown(event);
		switch (event.keyCode) {
			case ENTER:
				this._selectHighlighted();
				event.preventDefault();
				event.stopPropagation();
				break;
			case UP_ARROW:
				this._decrHighlight();
				event.preventDefault();
				event.stopPropagation();
				break;
			case DOWN_ARROW:
				this._incrHighlight();
				event.preventDefault();
				event.stopPropagation();
				break;
		}
	}
	protected _highlightIndex = -1;
	get highlightIndex() { return this._highlightIndex; }
	set highlightIndex(i: number) {
		this._highlightIndex = i;
		this._applyHighlight();
	}
	protected _initHighlight() {
		this._subs.add(this.optionsQLVR.changes.subscribe(options => {
			const optionCount = options.toArray().length;
			this.highlightIndex = Math.max(Math.min(this.highlightIndex, optionCount - 1), -1);
		}));
		setTimeout(() => {
			this.highlightIndex = -1;
		}, 1);
	}
	protected _incrHighlight() {
		const optionCount = this.optionsQLVR.toArray().length;
		this.highlightIndex = Math.max(Math.min(this.highlightIndex + 1, optionCount - 1), -1);
	}
	protected _decrHighlight() {
		this.highlightIndex = Math.max(this.highlightIndex - 1, -1);
	}
	protected _applyHighlight() {
		const highlightClass = 'is-highlighted';
		const options = this.optionsQLVR.toArray();
		// remove `is-highlighted` class from all other options
		options.forEach(ovcr => this._renderer.removeClass(ovcr.element.nativeElement, highlightClass));
		// apply `is-highlighted` to current highlight
		const highlightedOption = options[this.highlightIndex];
		if (!!highlightedOption) {
			this._renderer.addClass(highlightedOption.element.nativeElement, highlightClass);
			// scroll to let the highlighted option visible
			// TODO
		}
		this._changeDetectorRef.markForCheck();
	}
	protected _selectHighlighted() {
		const options = this._optionsQL ? this._optionsQL.toArray() : [];
		const highlightedOption = options[this.highlightIndex];
		if (!!highlightedOption) {
			this._updateValue(highlightedOption.value);
		}
	}
	protected _initSelected() {
		this._subs.add(this.optionsQLVR.changes.subscribe(() => {
			this._applySelected();
		}));
	}
	protected _applySelected() {
		if (!this.optionsQLVR) { return; }
		const selectedClass = 'is-selected';

		const options = this.optionsQLVR.toArray();
		// remove `is-selected` class from all other options
		options.forEach(ovcr => this._renderer.removeClass(ovcr.element.nativeElement, selectedClass));

		// add `is-selected` to all selected indexes
		const selectedIndexes = [];
		if (!this.multiple) {
			const selectedIndex = this._options.findIndex(o => JSON.stringify(o.value) === JSON.stringify(this._value));
			if (selectedIndex !== -1) { selectedIndexes.push(selectedIndex); }
			if (selectedIndex !== -1 && this.highlightIndex === -1) { this.highlightIndex = selectedIndex; }
		} else {
			const values = <T[]> this._value || [];
			selectedIndexes.push(
				...values
				.map(v => this._options.findIndex(o => JSON.stringify(o.value) === JSON.stringify(v)))
				.filter(i => i !== -1)
			);
		}
		selectedIndexes.forEach(i => {
			const option = options[i];
			if (!!option) {
				this._renderer.addClass(option.element.nativeElement, selectedClass);
			}
		});
	}

	protected initOptionItemsObservable() {
		if (this._isOptionItemsInited) {
			return;
		}

		this._isOptionItemsInited = true;

		this._optionItems$ =
			merge(of(this._optionsQL), this._optionsQL.changes)
			.pipe(
				map<QueryList<ILuOptionItem<T>>, ILuOptionItem<T>[]>(q => q.toArray()),
				delay(0),
				tap(o => this._options = o || [])
			);
	}
}
