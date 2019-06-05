import { ChangeDetectionStrategy, Component, Output, HostListener, Input, EventEmitter, forwardRef, ViewContainerRef } from '@angular/core';
import { ILuOptionItem, ALuOptionItem } from '../../../option/index';
import { ALuTreeOptionItem } from './tree-option-item.model';

@Component({
	selector: 'lu-tree-option',
	templateUrl: './tree-option-item.component.html',
	styleUrls: ['./tree-option-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionItem,
			useExisting: forwardRef(() => LuTreeOptionItemComponent),
			multi: true,
		},
		{
			provide: ALuTreeOptionItem,
			useExisting: forwardRef(() => LuTreeOptionItemComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionItemComponent<T = any> extends ALuOptionItem<T> implements ILuOptionItem<T> {
	@Input() value: T;
	@Output() onSelect = new EventEmitter<T>();
	@HostListener('click')
	onclick() {
		this.onSelect.emit(this.value);
	}
	constructor(protected _vcr: ViewContainerRef) {
		super();
	}
}
