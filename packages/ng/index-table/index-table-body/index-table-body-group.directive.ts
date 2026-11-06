import { Directive } from '@angular/core';

/**
 * Projects the element it is set on as the group heading of the parent `tbody[luIndexTableBody]`.
 * Alternative to the `group` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luIndexTableBodyGroup]',
})
export class IndexTableBodyGroupDirective {}
