import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, forwardRef, ElementRef, HostBinding } from '@angular/core';
import { ILuOptionItem, ALuOptionItem } from './option-item.model';

@Component({
	selector: 'lu-option',
	templateUrl: './option-item.component.html',
	styleUrls: ['./option-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionItem,
			useExisting: forwardRef(() => LuOptionItemComponent),
			multi: true,
		},
	],
})
export class LuOptionItemComponent<T = any> extends ALuOptionItem<T> implements ILuOptionItem<T> {
	@Input() selected;
	@Input() highlighted;
	@Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	select() {
		this.onSelect.emit(this);
	}
	constructor(public element: ElementRef) {
		super();
	}
}
