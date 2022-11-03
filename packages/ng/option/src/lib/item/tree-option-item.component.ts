/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ILuTree } from '@lucca-front/ng/core';
import { ALuInputDisplayer, ILuInputDisplayer } from '@lucca-front/ng/input';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuTreeOptionItemIntl } from './tree-option-item.intl';
import { ALuTreeOptionItem, ILuTreeOptionItem } from './tree-option-item.model';
import { LU_TREE_OPTION_ITEM_TRANSLATIONS } from './tree-option-item.token';
import { ILuTreeOptionItemLabel, luTreeOptionItemTranslations } from './tree-option-item.translate';

@Component({
	selector: 'lu-tree-option',
	templateUrl: './tree-option-item.component.html',
	styleUrls: ['./tree-option-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, LuTooltipTriggerDirective],
	providers: [
		{
			provide: ALuTreeOptionItem,
			useExisting: forwardRef(() => LuTreeOptionItemComponent),
			multi: true,
		},
		{
			provide: LU_TREE_OPTION_ITEM_TRANSLATIONS,
			useValue: luTreeOptionItemTranslations,
		},
		LuTreeOptionItemIntl,
	],
})
export class LuTreeOptionItemComponent<T> extends ALuTreeOptionItem<T> implements ILuTreeOptionItem<T> {
	protected _children: this[] = [];
	protected _tree: ILuTree<T>;
	protected _displayer: ILuInputDisplayer<T>;
	@ViewChild('value', { static: true, read: ViewContainerRef })
	protected _valueVCR: ViewContainerRef;
	@ViewChild('children', { static: true, read: ViewContainerRef })
	protected _childrenVCR: ViewContainerRef;
	@ViewChild('element', { read: ElementRef, static: true }) element: ElementRef;

	@Output() onSelect = new EventEmitter<this>();
	@Output() onSelectSelf = new EventEmitter<this>();
	@Output() onSelectChildren = new EventEmitter<this>();
	select() {
		this.onSelect.emit(this);
	}
	selectSelf() {
		this.onSelectSelf.emit(this);
	}
	selectChildren() {
		this.onSelectChildren.emit(this);
	}

	@Input() set tree(t: ILuTree<T>) {
		this._tree = t;
		this._renderValue(t.value);
		this._renderChildren(t.children);
	}
	get value() {
		return this._tree.value;
	}
	get children() {
		return this._children;
	}
	set children(c) {
		this._children = c;
	}
	get hasChildren() {
		return !!this.children && this.children.length > 0;
	}

	protected _selected = false;
	get selected() {
		return this._selected;
	}
	@Input() set selected(s: boolean) {
		if (s !== this._selected) {
			this._selected = s;
			this._cdr.markForCheck();
		}
	}
	protected _highlighted = false;
	get highlighted() {
		return this._highlighted;
	}
	@Input() set highlighted(h: boolean) {
		if (h !== this._highlighted) {
			this._highlighted = h;
			this._cdr.markForCheck();
		}
	}
	protected _disabled = false;
	get disabled() {
		return this._disabled;
	}
	@Input() set disabled(h: boolean) {
		if (h !== this._disabled) {
			this._disabled = h;
			this._cdr.markForCheck();
		}
	}

	@ContentChild(ALuInputDisplayer, { static: true }) set _contentChildDisplayer(displayer: ILuInputDisplayer<T>) {
		this._displayer = displayer;
	}

	constructor(@Inject(LuTreeOptionItemIntl) public intl: ILuTreeOptionItemLabel, private _cdr: ChangeDetectorRef) {
		super();
	}

	private _renderValue(value: T) {
		const evr = this._displayer.getViewRef(value);
		this._valueVCR.clear();
		this._valueVCR.insert(evr);
	}
	private _renderChildren(children: ILuTree<T>[] = []) {
		this._childrenVCR.clear();
		this.children = children.map((c) => {
			const ref = this._childrenVCR.createComponent(LuTreeOptionItemComponent);
			ref.instance._displayer = this._displayer;
			ref.instance.tree = c;
			return ref.instance as this; //yolo
		});
	}
}
