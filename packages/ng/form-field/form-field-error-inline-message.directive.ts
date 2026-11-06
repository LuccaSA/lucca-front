import { Directive } from '@angular/core';

/**
 * Projects the element it is set on as the inline message displayed when the control is in error of the parent `lu-form-field`.
 * Alternative to the `errorInlineMessage` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luFormFieldErrorInlineMessage]',
})
export class FormFieldErrorInlineMessageDirective {}
