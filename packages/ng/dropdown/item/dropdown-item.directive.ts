import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, OnDestroy, Output } from '@angular/core';
import { ALuDropdownItem } from './dropdown-item.model';

@Directive({
	selector: '[luDropdownItem]',
	exportAs: 'LuDropdownItem',
	providers: [
		{
			provide: ALuDropdownItem,
			useExisting: forwardRef(() => LuDropdownItemDirective),
			multi: true,
		},
	],
})
export class LuDropdownItemDirective extends ALuDropdownItem implements OnDestroy {
	// arreter les ONxxxx
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onSelect = new EventEmitter<boolean>();
	constructor(private _eltRef: ElementRef<HTMLElement>) {
		super();
	}
	@HostListener('click', ['$event']) onClick(_event: Event) {
		this.onSelect.emit(true);
	}
	@HostListener('keydown.enter', ['$event']) onEnter(_event: Event) {
		this.onSelect.emit(true);
	}
	focus() {
		this._eltRef.nativeElement.focus();
	}
	ngOnDestroy() {
		this.onSelect.complete();
	}
}
