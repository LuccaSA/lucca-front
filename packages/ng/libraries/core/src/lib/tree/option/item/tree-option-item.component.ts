import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, forwardRef, ElementRef, ViewChild, ContentChild, ViewContainerRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { ALuTreeOptionItem, ILuTreeOptionItem } from './tree-option-item.model';
import { ILuTree } from '../../tree.model';
import { ILuInputDisplayer, ALuInputDisplayer } from '../../../input/index';
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
export class LuTreeOptionItemComponent<T = any> extends ALuTreeOptionItem<T> implements ILuTreeOptionItem<T> {
	protected _children = [];
	protected _tree: ILuTree<T>;
	protected _displayer: ILuInputDisplayer<T>;
	@ViewChild('value', { static: true, read: ViewContainerRef }) protected _valueVCR: ViewContainerRef;
	@ViewChild('children', { static: true, read: ViewContainerRef }) protected _childrenVCR: ViewContainerRef;

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
	get value() { return this._tree.value; }
	get children() { return this._children; }
	set children(c) { this._children = c; }
	get hasChildren() { return !!this.children && this.children.length > 0; }

	@Input() selected;
	@Input() highlighted;

	@ContentChild(ALuInputDisplayer, { static: true }) set _contentChildDisplayer(displayer: ILuInputDisplayer<T>) {
		this._displayer = displayer;
	}

	constructor(
		private _componentFactoryResolver: ComponentFactoryResolver,
		public element: ElementRef,
		@Inject(LuTreeOptionItemIntl) public intl: ILuTreeOptionItemLabel,
	) {
		super();
	}

	private _renderValue(value: T) {
		const evr = this._displayer.getViewRef(value);
		this._valueVCR.clear();
		this._valueVCR.insert(evr);
	}
	private _renderChildren(children: ILuTree<T>[] = []) {
		const factory = this._componentFactoryResolver.resolveComponentFactory(LuTreeOptionItemComponent);
		this._childrenVCR.clear();
		this.children = children.map(c => {
			const ref = this._childrenVCR.createComponent(factory);
			ref.instance._displayer = this._displayer;
			ref.instance.tree = c;
			return ref.instance;
		});
	}
}
