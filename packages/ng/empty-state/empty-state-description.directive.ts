import { Directive } from '@angular/core';

/**
 * Projects the element it is set on as the description of the parent `lu-empty-state-page` or `lu-empty-state-section`.
 * Alternative to the `description` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luEmptyStateDescription]',
})
export class EmptyStateDescriptionDirective {}
