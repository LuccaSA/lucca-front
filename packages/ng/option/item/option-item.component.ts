/* eslint-disable @angular-eslint/no-output-on-prefix */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ALuOptionItem, ILuOptionItem } from './option-item.model';

@Component({
	selector: 'lu-option',
	templateUrl: './option-item.component.html',
	styleUrls: ['./option-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	standalone: true,
	providers: [
		{
			provide: ALuOptionItem,
			useExisting: forwardRef(() => LuOptionItemComponent),
			multi: true,
		},
	],
})
export class LuOptionItemComponent<T> extends ALuOptionItem<T> implements ILuOptionItem<T> {
	@Input() value: T;
	@Output() onSelect = new EventEmitter<this>();
	@ViewChild('element', { read: ElementRef, static: true }) element: ElementRef;

	constructor(private _cdr: ChangeDetectorRef) {
		super();
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

	@Input() set disabled(d: boolean) {
		this._disabled = d;
	}

	select() {
		if (!this.disabled) {
			this.onSelect.emit(this);
		}
	}
}
