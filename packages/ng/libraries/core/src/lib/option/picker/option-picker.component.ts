import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	ContentChildren,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	ElementRef,
	ViewRef,
	EmbeddedViewRef,
	Renderer2,
	ChangeDetectorRef,
	OnInit,
	AfterViewInit,
	Input,
} from '@angular/core';
import { luTransformPopover } from '../../popover/index';
import { ILuOptionItem, ALuOptionItem } from '../item/index';
import { ILuOptionPickerPanel, ALuOptionPicker } from './option-picker.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { ALuPickerPanel, ALuInputDisplayer, ILuInputDisplayer } from '../../input/index';
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
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuOptionPickerComponent),
		},
		{
			provide: ALuInputDisplayer,
			useExisting: forwardRef(() => LuOptionPickerComponent),
			multi: true,
		},
	]
})
export class LuOptionPickerComponent<T = any>
extends ALuOptionPicker<T>
implements ILuOptionPickerPanel<T>, OnDestroy, ILuInputDisplayer<T>, AfterViewInit {
	@Input('overlap-trigger')
	set inputOverlapTrigger(v: boolean) {
		this.overlapTrigger = v;
	}
	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();
	@Output() onSelectValue = new EventEmitter<T>();
	setValue(value: T) {}
	constructor(
		protected _vcr: ViewContainerRef,
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _renderer: Renderer2) {
		super();
		this.triggerEvent = 'click';
	}
	protected _options: ILuOptionItem<T>[];
	protected _optionsQL: QueryList<ILuOptionItem<T>>;
	@ContentChildren(ALuOptionItem, { descendants: true }) set optionsQL(ql: QueryList<ILuOptionItem<T>>) {
		this._optionsQL = ql;
		this._optionItems$ =
			merge(Observable.of(ql), ql.changes)
			.map<QueryList<ILuOptionItem<T>>, ILuOptionItem<T>[]>(q => q.toArray())
			.do(o => this._options = o);
	}
	@ContentChildren(ALuOptionItem, { descendants: true, read: ViewContainerRef }) optionsQLVR: QueryList<ViewContainerRef>;
	@ContentChildren(ALuInputDisplayer) displayers: QueryList<ILuInputDisplayer<T>>;
	protected get _displayer() {
		return this.displayers ? this.displayers.toArray()[1] : undefined;
	}

	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._operators = ql.toArray();
	}
	protected _select(val: T) {
		this.onSelectValue.emit(val);
		this._emitCloseEvent();
	}
	ngOnDestroy() {
		super.destroy();
	}
	ngAfterViewInit() {
		this._initHighlight();
	}
	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}
	onOpen() {
		super.onOpen();
		this.highlightIndex = 0;
	}
	@ViewChild(TemplateRef)
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
	}
	findElementRef(value: T): ElementRef {
		// try to find the lo-option with the right value
		const options = this._options || [];
		const index = options.findIndex(oi => JSON.stringify(oi.value) === JSON.stringify(value));
		if (index >= 0) {
			const vcr = this.optionsQLVR.toArray()[index];
			return vcr.element;
		}
		return undefined;
	}
	getElementRef(value): ElementRef {
		if (!!this._displayer) {
			return this._displayer.getElementRef(value);
		}
		return this.findElementRef(value);
	}
	getViewRef(value): ViewRef {
		if (!!this._displayer) {
			return this._displayer.getViewRef(value);
		}
		return undefined;
	}

	// keydown
	_handleKeydown(event: KeyboardEvent) {
		super._handleKeydown(event);
		switch (event.keyCode) {
			case ENTER:
				this._selectHighlighted();
				this.onClose();
				break;
			case UP_ARROW:
				this._decrHighlight();
				break;
			case DOWN_ARROW:
				this._incrHighlight();
				break;
		}
	}
	protected _highlightIndex = 0;
	get highlightIndex() { return this._highlightIndex; }
	set highlightIndex(i: number) {
		this._highlightIndex = i;
		this._applyHighlight();
	}
	protected _initHighlight() {
		this._subs.add(this.optionsQLVR.changes.subscribe(options => {
			const optionCount = options.toArray().length;
			this.highlightIndex = Math.max(Math.min(this.highlightIndex, optionCount - 1), 0);
		}));
		setTimeout(() => {
			this.highlightIndex = 0;
		}, 1);
	}
	protected _incrHighlight() {
		const optionCount = this.optionsQLVR.toArray().length;
		this.highlightIndex = Math.max(Math.min(this.highlightIndex + 1, optionCount - 1), 0);
	}
	protected _decrHighlight() {
		this.highlightIndex = Math.max(this.highlightIndex - 1, 0);
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
			this._select(highlightedOption.value);
		}
	}
}
