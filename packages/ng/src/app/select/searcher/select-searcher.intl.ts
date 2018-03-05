import {Injectable, SkipSelf, Optional } from '@angular/core';
import {Subject} from 'rxjs/Subject';

/**
 * To modify the labels and text displayed, create a new instance of LuSelectSearchIntl and
 * include it in a custom provider
 */
@Injectable()
export class LuSelectSearchIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for empty. */
  noResultsLabel: string = 'No results';

}

/** @docs-private */
export function LU_SELECT_SEARCH_INTL_PROVIDER_FACTORY(parentIntl: LuSelectSearchIntl) {
  return parentIntl || new LuSelectSearchIntl();
}

/** @docs-private */
export const LU_SELECT_SEARCH_INTL_PROVIDER = {
  // If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
  provide: LuSelectSearchIntl,
  deps: [[new Optional(), new SkipSelf(), LuSelectSearchIntl]],
  useFactory: LU_SELECT_SEARCH_INTL_PROVIDER_FACTORY
};
