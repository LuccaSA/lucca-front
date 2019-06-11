import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, forwardRef, ContentChildren, ElementRef, ViewChild, QueryList, Renderer2, OnDestroy, ViewChildren } from '@angular/core';
import { ILuOptionItem } from '../../../option/index';
import { ALuTreeOptionItem, ILuTreeOptionItem } from './tree-option-item.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
export class LuTreeOptionItemComponent<T = any> extends ALuTreeOptionItem<T> implements ILuOptionItem<T>, OnDestroy {
	@Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	@Output() onSelectSelf = new EventEmitter<this>();
	@Output() onSelectChildren = new EventEmitter<this>();
	private _subs = new Subscription();
	select() {
		this.onSelect.emit(this);
	}
	selectSelf() {
		this.onSelectSelf.emit(this);
	}
	selectChildren() {
		this.onSelectChildren.emit(this);
	}
	children: ILuTreeOptionItem<T>[] = [];
	@ContentChildren(ALuTreeOptionItem, { descendants: false, read: ALuTreeOptionItem }) set _childrenItems(ql: QueryList<ALuTreeOptionItem>) {
		const sub = ql.changes.pipe(
			map(change => change.toArray()),
			// startWith(ql.toArray()),
		).subscribe((children: ALuTreeOptionItem[] = []) => {
			children.shift();
			this.children = children;
			console.log(`${(<any>this.value).name} - ${children.length}`);
		});
		this._subs.add(sub);
	}

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
	constructor(
		protected _renderer: Renderer2,
	) {
		super();
	}
	// private displayChildren(childrenEltRef: ElementRef[]) {
	// 	childrenEltRef.forEach(c => {
	// 		this._renderer.appendChild(this._childrenContainer.nativeElement, c.nativeElement);
	// 	});
	// }
	ngOnDestroy() {
		this._subs.unsubscribe();
	}
}
