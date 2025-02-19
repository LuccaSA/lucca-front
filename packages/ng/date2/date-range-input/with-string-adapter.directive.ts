import { Directive } from '@angular/core';

@Directive({
	// The attribute is already prefixed with "lu-date-range-input"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-date-range-input[withStringAdapter]',
	standalone: true,
})
export class LuDateRangeWithStringAdapterDirective {}
