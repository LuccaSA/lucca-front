import { ChangeDetectionStrategy, Component, Output, HostListener, Input, EventEmitter, forwardRef, ElementRef, HostBinding } from '@angular/core';
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
	@Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	@HostListener('click')
	onclick() {
		this.onSelect.emit(this);
	}
	constructor(public element: ElementRef) {
		super();
	}
	@HostBinding('class.is-selected') selected;
	@HostBinding('class.is-highlighted') highlighted;
}
