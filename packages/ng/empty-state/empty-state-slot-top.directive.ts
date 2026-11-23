import { Directive } from '@angular/core';

/**
 * Projects the element it is set on above the heading of the parent `lu-empty-state-page`.
 * Alternative to the `slotTop` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luEmptyStateSlotTop]',
})
export class EmptyStateSlotTopDirective {}
