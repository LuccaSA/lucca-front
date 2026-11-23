import { Directive } from '@angular/core';

/**
 * Projects the element it is set on as the inline message of the parent `lu-form-field`.
 * Alternative to the `inlineMessage` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luFormFieldInlineMessage]',
})
export class FormFieldInlineMessageDirective {}
