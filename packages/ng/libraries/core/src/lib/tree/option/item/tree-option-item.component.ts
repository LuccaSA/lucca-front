import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, forwardRef, ContentChildren, ElementRef, ViewChild, QueryList, Renderer2, OnDestroy, ViewChildren, ContentChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ILuOptionItem } from '../../../option/index';
import { ALuTreeOptionItem, ILuTreeOptionItem } from './tree-option-item.model';
import { ILuTree } from '../../tree.model';
import { ILuInputDisplayer, ALuInputDisplayer } from '../../../input/index';

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
	// @Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	@Output() onSelectSelf = new EventEmitter<this>();
	@Output() onSelectChildren = new EventEmitter<this>();
	// private _subs = new Subscription();
	select() {
		this.onSelect.emit(this);
	}
	selectSelf() {
		this.onSelectSelf.emit(this);
	}
	selectChildren() {
		this.onSelectChildren.emit(this);
	}
	// children: ILuTreeOptionItem<T>[] = [];
	// @ContentChildren(ALuTreeOptionItem, { descendants: false, read: ALuTreeOptionItem }) set _childrenItems(ql: QueryList<ALuTreeOptionItem>) {
	// 	const sub = ql.changes.pipe(
	// 		map(change => change.toArray()),
	// 		// startWith(ql.toArray()),
	// 	).subscribe((children: ALuTreeOptionItem[] = []) => {
	// 		children.shift();
	// 		this.children = children;
	// 		console.log(`${(<any>this.value).name} - ${children.length}`);
	// 	});
	// 	this._subs.add(sub);
	// }

	// @ContentChildren(ALuTreeOptionItem, { descendants: false, read: ElementRef }) set _childrenElts(ql: QueryList<ElementRef>) {
	// 	const sub = ql.changes.pipe(
	// 		map(change => change.toArray()),
	// 		// startWith(ql.toArray()),
	// 	).subscribe((children: ElementRef[] = []) => {
	// 		children.shift();
	// 		// this.displayChildren(children);
	// 	});
	// 	this._subs.add(sub);
	// }
	// @ViewChildren(ALuTreeOptionItem, { read: ALuTreeOptionItem }) set _childrenVC(ql: QueryList<ALuTreeOptionItem>) {
	// 	const sub = ql.changes.pipe(
	// 		map(change => change.toArray()),
	// 		// startWith(ql.toArray()),
	// 	).subscribe((children: ALuTreeOptionItem[] = []) => {
	// 		children.shift();
	// 		// this.children = children;
	// 		console.log(`${(<any>this.value).name} - ${children.length}`);
	// 	});
	// 	this._subs.add(sub);
	// }

	// @ViewChild('children', { read: ElementRef, static: true }) _childrenContainer: ElementRef;
	// constructor(
	// 	// protected _renderer: Renderer2,
	// ) {
	// 	super();
	// }
	// private displayChildren(childrenEltRef: ElementRef[]) {
	// 	childrenEltRef.forEach(c => {
	// 		this._renderer.appendChild(this._childrenContainer.nativeElement, c.nativeElement);
	// 	});
	// }
	// ngOnDestroy() {
	// 	this._subs.unsubscribe();
	// }
	protected _tree: ILuTree<T>;
	@Input() set tree(t: ILuTree<T>) {
		this._tree = t;
		this._renderValue(t.value);
		this._renderChildren(t.children);
	}
	get value() { return this._tree.value; }
	// get children() { return this._tree.children; }
	protected _children = [];
	get children() { return this._children; }
	set children(c) { this._children = c; }
	protected _displayer: ILuInputDisplayer<T>;
	@ContentChild(ALuInputDisplayer, { static: true }) set _contentChildDisplayer(displayer: ILuInputDisplayer<T>) {
		this._displayer = displayer;
	}
	@ViewChild('value', { static: true, read: ViewContainerRef }) protected _valueVCR: ViewContainerRef;
	@ViewChild('children', { static: true, read: ViewContainerRef }) protected _childrenVCR: ViewContainerRef;

	constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
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
