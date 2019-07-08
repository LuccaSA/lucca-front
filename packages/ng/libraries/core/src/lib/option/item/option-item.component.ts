import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, forwardRef, ElementRef, ChangeDetectorRef } from '@angular/core';
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
	protected _selected = false;
	get selected() { return this._selected; }
	@Input() set selected(s: boolean) {
		if (s !== this._selected) {
			this._selected = s;
			this._cdr.markForCheck();
		}
	}
	protected _highlighted = false;
	get highlighted() { return this._highlighted; }
	@Input() set highlighted(h: boolean) {
		if (h !== this._highlighted) {
			this._highlighted = h;
			this._cdr.markForCheck();
		}
	}
	@Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	select() {
		this.onSelect.emit(this);
	}
	constructor(public element: ElementRef, private _cdr: ChangeDetectorRef) {
		super();
	}
}
