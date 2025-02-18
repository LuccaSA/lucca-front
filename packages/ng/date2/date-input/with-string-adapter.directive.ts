import { Directive } from '@angular/core';

@Directive({
	// The attribute is already prefixed with "lu-date-input"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-date-input[withStringAdapter]',
	standalone: true,
})
export class LuDateInputWithStringAdapterDirective {}
