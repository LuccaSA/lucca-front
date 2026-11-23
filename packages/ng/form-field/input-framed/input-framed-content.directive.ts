import { Directive } from '@angular/core';

/**
 * Projects the element it is set on in the content area of the parent `lu-input-framed`, or of a framed `lu-radio`.
 * Alternative to the `framedPortal` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luInputFramedContent]',
})
export class InputFramedContentDirective {}
