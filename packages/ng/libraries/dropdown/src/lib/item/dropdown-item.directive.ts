import { Directive, forwardRef, ElementRef } from '@angular/core';
import { ALuDropdownItem } from './dropdown-item.model';

@Directive({
	selector: '[luDropdownItem]',
	exportAs: 'LuDropdownItem',
	providers: [
		{
			provide: ALuDropdownItem,
			useExisting: forwardRef(() => LuDropdownItemDirective),
			multi: true,
		}
	]
})
export class LuDropdownItemDirective extends ALuDropdownItem {
	constructor(
		private _eltRef: ElementRef,
	) {
		super();
	}
	focus() {
		this._eltRef.nativeElement.focus();
	}
}
