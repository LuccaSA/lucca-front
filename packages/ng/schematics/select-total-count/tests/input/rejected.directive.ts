import { Directive } from '@angular/core';
import { NEVER } from 'rxjs';

/** Not a core select API directive: its own `totalCount$` must be left alone. */
@Directive({ selector: '[myPagination]' })
export class MyPaginationDirective extends MyBasePagination {
	public readonly totalCount$ = NEVER;
}
