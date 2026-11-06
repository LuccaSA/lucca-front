import { Directive } from '@angular/core';

/**
 * Projects the element it is set on into the action area of the parent `lu-fieldset` legend.
 * Alternative to the `action` input of `lu-fieldset`, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luFieldsetAction]',
})
export class FieldsetActionDirective {}
