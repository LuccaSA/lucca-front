import {
	ChangeDetectionStrategy,
	Component,
	Output,
	Input,
	EventEmitter,
	forwardRef,
	ElementRef,
	ViewChild,
	ContentChild,
	ViewContainerRef,
	ComponentFactoryResolver,
	Inject,
	ChangeDetectorRef,
} from '@angular/core';
import { ALuTreeOptionItem, ILuTreeOptionItem } from './tree-option-item.model';
import { ILuTree } from '@lucca-front/ng/core';
import { ILuInputDisplayer, ALuInputDisplayer } from '@lucca-front/ng/input';
import { ILuTreeOptionItemLabel } from './tree-option-item.translate';
import { LuTreeOptionItemIntl } from './tree-option-item.intl';

@Component({
	selector: 'lu-tree-option',
	templateUrl: './tree-option-item.component.html',
	styleUrls: ['./tree-option-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionItem,
			useExisting: forwardRef(() => LuTreeOptionItemComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionItemComponent<T = any>
	extends ALuTreeOptionItem<T>
	implements ILuTreeOptionItem<T>
{
	protected _children = [];
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

	@ContentChild(ALuInputDisplayer, { static: true }) set _contentChildDisplayer(
		displayer: ILuInputDisplayer<T>,
	) {
		this._displayer = displayer;
	}

	constructor(
		private _componentFactoryResolver: ComponentFactoryResolver,
		@Inject(LuTreeOptionItemIntl) public intl: ILuTreeOptionItemLabel,
		private _cdr: ChangeDetectorRef,
	) {
		super();
	}

	private _renderValue(value: T) {
		const evr = this._displayer.getViewRef(value);
		this._valueVCR.clear();
		this._valueVCR.insert(evr);
	}
	private _renderChildren(children: ILuTree<T>[] = []) {
		const factory = this._componentFactoryResolver.resolveComponentFactory(
			LuTreeOptionItemComponent,
		);
		this._childrenVCR.clear();
		this.children = children.map((c) => {
			const ref = this._childrenVCR.createComponent(factory);
			ref.instance._displayer = this._displayer;
			ref.instance.tree = c;
			return ref.instance;
		});
	}
}
