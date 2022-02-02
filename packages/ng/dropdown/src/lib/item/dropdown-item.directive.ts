import {
	Directive,
	forwardRef,
	ElementRef,
	HostListener,
	EventEmitter,
	Output,
	OnDestroy,
} from '@angular/core';
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
export class LuDropdownItemDirective
	extends ALuDropdownItem
	implements OnDestroy
{
	@Output() onSelect = new EventEmitter<boolean>();
	constructor(private _eltRef: ElementRef) {
		super();
	}
	@HostListener('click', ['$event']) onClick($event: Event) {
		// $event.stopPropagation();
		this.onSelect.emit(true);
	}
	@HostListener('keydown.enter', ['$event']) onEnter($event: Event) {
		// $event.stopPropagation();
		this.onSelect.emit(true);
	}
	focus() {
		this._eltRef.nativeElement.focus();
	}
	ngOnDestroy() {
		this.onSelect.complete();
	}
}
