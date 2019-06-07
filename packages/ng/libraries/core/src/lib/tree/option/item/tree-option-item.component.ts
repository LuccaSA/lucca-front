import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, forwardRef, ContentChildren, ElementRef, ViewChild, QueryList, Renderer2 } from '@angular/core';
import { ILuOptionItem, ALuOptionItem } from '../../../option/index';
import { ALuTreeOptionItem } from './tree-option-item.model';

@Component({
	selector: 'lu-tree-option',
	templateUrl: './tree-option-item.component.html',
	styleUrls: ['./tree-option-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		// {
		// 	provide: ALuOptionItem,
		// 	useExisting: forwardRef(() => LuTreeOptionItemComponent),
		// 	multi: true,
		// },
		{
			provide: ALuTreeOptionItem,
			useExisting: forwardRef(() => LuTreeOptionItemComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionItemComponent<T = any> extends ALuTreeOptionItem<T> implements ILuOptionItem<T> {
	@Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	select() {
		this.onSelect.emit(this);
	}
	childrenOptionItems: ILuOptionItem<T>[] = [];
	@ContentChildren(ALuTreeOptionItem, { descendants: false, read: ALuTreeOptionItem }) set _childrenItems(ql: QueryList<ALuTreeOptionItem>) {
		const children = ql.toArray();
		// need to remove item at index 0 cuz its this LuTreeOptionItemComponent
		children.shift();
		this.childrenOptionItems = children;
		// TODO - plug ql.changes to refresh if children changes
	}

	@ContentChildren(ALuTreeOptionItem, { descendants: false, read: ElementRef }) set _childrenElts(ql: QueryList<ElementRef>) {
		const children = ql.toArray();
		// need to remove item at index 0 cuz its this LuTreeOptionItemComponent
		children.shift();
		this.displayChildren(children);
		// TODO - plug ql.changes to refresh if children changes
	}
	@ViewChild('children', { read: ElementRef, static: true }) _childrenContainer: ElementRef;
	constructor(
		protected _renderer: Renderer2,
	) {
		super();
	}
	private displayChildren(childrenEltRef: ElementRef[]) {
		childrenEltRef.forEach(c => {
			this._renderer.appendChild(this._childrenContainer.nativeElement, c.nativeElement);
		});
	}
}
