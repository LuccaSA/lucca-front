import { Directive, ElementRef, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { ALuDropdownItem } from './dropdown-item.model';

@Directive({
	selector: '[luDropdownItem]',
	exportAs: 'LuDropdownItem',
	host: {
		'(click)': 'onClick($event)',
		'(keydown.enter)': 'onEnter($event)',
	},
	providers: [
		{
			provide: ALuDropdownItem,
			useExisting: forwardRef(() => LuDropdownItemDirective),
			multi: true,
		},
	],
})
export class LuDropdownItemDirective extends ALuDropdownItem implements OnDestroy {
	readonly onSelect = new EventEmitter<boolean>();

	protected readonly onSelectOutput = outputFromObservable(this.onSelect, { alias: 'onSelect' });

	constructor(private _eltRef: ElementRef<HTMLElement>) {
		super();
	}

	onClick(_event: Event) {
		this.onSelect.emit(true);
	}

	onEnter(_event: Event) {
		this.onSelect.emit(true);
	}

	focus() {
		this._eltRef.nativeElement.focus();
	}

	ngOnDestroy() {
		this.onSelect.complete();
	}
}
