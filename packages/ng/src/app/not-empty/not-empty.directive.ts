import { Directive, ElementRef, Input } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * adds class ng-empty (or a different class) when the model is empty
 */
@Directive({
	selector: '[luNotEmpty]'
})
export class NotEmptyDirective implements ControlValueAccessor {

	constructor(private el: ElementRef) {
		debugger;
	}

	/**
	 * Write a new value to the element.
	 */
	writeValue(obj: any) {};
	/**
	 * Set the function to be called when the control receives a change event.
	 */
	registerOnChange(fn: any) {

	};
	/**
	 * Set the function to be called when the control receives a touch event.
	 */
	registerOnTouched(fn: any) {};
	/**
	 * This function is called when the control status changes to or from "DISABLED".
	 * Depending on the value, it will enable or disable the appropriate DOM element.
	 *
	 * @param isDisabled
	 */
	setDisabledState?(isDisabled: boolean) {};
}
