// import { UP_ARROW, DOWN_ARROW, TAB } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ALuPopoverPanel, ILuPopoverPanel, luTransformPopover } from '@lucca-front/ng/popover';
import { merge, Observable, Subscription } from 'rxjs';
import { debounceTime, delay, map, share, startWith, switchMap } from 'rxjs/operators';
import { ALuDropdownItem, ILuDropdownItem } from '../item/index';

@Component({
	selector: 'lu-dropdown',

	templateUrl: './dropdown-panel.component.html',
	styleUrls: ['./dropdown-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuDropdownPanel',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
})
export class LuDropdownPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel, OnDestroy, AfterViewInit {
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

	/** Event emitted when the popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() override close = new EventEmitter<void>();
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();

	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<unknown>) {
		this.templateRef = tr;
	}

	// protected _highlightIndex = -1;
	// get highlightIndex() { return this._highlightIndex; }
	// set highlightIndex(i: number) {
	// 	this._highlightIndex = i;
	// 	this._applyHighlight();
	// }
	protected _items: ILuDropdownItem[] = [];
	protected _itemsQL: QueryList<ILuDropdownItem>;
	@ContentChildren(ALuDropdownItem, { descendants: true }) set optionsQL(ql: QueryList<ILuDropdownItem>) {
		this._itemsQL = ql;
	}

	private _subs = new Subscription();

	constructor() {
		super();
	}
	protected initItems() {
		const items$ = this._itemsQL.changes.pipe(
			startWith(this._itemsQL),
			map<QueryList<ILuDropdownItem>, ILuDropdownItem[]>((ql) => ql.toArray()),
			delay(0),
			share(),
		);
		const itemsSub = items$.subscribe((i) => (this._items = i || []));
		this._subs.add(itemsSub);
		// this.highlightIndex = -1;

		const singleFlow$: Observable<boolean> = items$.pipe(
			switchMap((items) => merge(...items.map((i) => i.onSelect))),
			debounceTime(1),
		);

		const itemSelectSub = singleFlow$.subscribe(() => this.close.emit());
		this._subs.add(itemSelectSub);
	}

	ngAfterViewInit() {
		this.initItems();
	}

	ngOnDestroy() {
		this.onClose();
		this.close.complete();
		this._subs.unsubscribe();
	}

	_emitCloseEvent(): void {
		this.close.emit();
	}

	_emitOpenEvent(): void {
		this.open.emit();
	}

	_emitHoveredEvent(hovered: boolean): void {
		this.hovered.emit(hovered);
	}

	override onOpen() {
		this.focusFirstItem();
	}

	private focusFirstItem() {
		const firstItem = this._items[0];
		if (firstItem) {
			firstItem.focus();
		}
	}

	// keydown
	// _handleKeydown(event: KeyboardEvent) {
	// 	super._handleKeydown(event);
	// switch (event.keyCode) {
	// 	case UP_ARROW:
	// 		this._decrHighlight();
	// 		if (!this._highlightOutOfBounds()) {
	// 			event.preventDefault();
	// 			event.stopPropagation();
	// 		}
	// 		break;
	// 	case DOWN_ARROW:
	// 		this._incrHighlight();
	// 		if (!this._highlightOutOfBounds()) {
	// 			event.preventDefault();
	// 			event.stopPropagation();
	// 		}
	// 		break;
	// 	case TAB:
	// 		if (event.shiftKey) {
	// 			this._decrHighlight();
	// 		} else {
	// 			this._incrHighlight();
	// 		}
	// 		if (!this._highlightOutOfBounds()) {
	// 			event.preventDefault();
	// 			event.stopPropagation();
	// 		}
	// 		break;
	// }
	// }
	// protected _incrHighlight() {
	// 	this.highlightIndex++;
	// }
	// protected _decrHighlight() {
	// 	this.highlightIndex--;
	// }
	// protected _highlightOutOfBounds(): boolean {
	// 	const itemsCount = this._items.length;
	// 	return this.highlightIndex < 0 || this.highlightIndex >= itemsCount;
	// }
	// protected _applyHighlight() {

	// 	const highlightedItem = this._items[this.highlightIndex];
	// 	if (highlightedItem) {
	// 		highlightedItem.focus();
	// 	}
	// }
}
