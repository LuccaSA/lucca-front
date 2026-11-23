import { map, Observable, of, switchMap } from 'rxjs';

export const applySearchDelimiter = (clue: string, delimiter: string): string => clue.split(' ').join(delimiter);

/**
 * Walks a paginated fetch to exhaustion and hands back everything it gathered. For the calls that
 * cannot stop at the first page — the full membership of a group, the children of a branch — where
 * the select’s own accumulator only grows one page at a time as the user scrolls.
 */
export function luAccumulatePages<T>(fetchPage: (page: number) => Observable<{ items: T[]; isLastPage: boolean }>, page = 0): Observable<T[]> {
	return fetchPage(page).pipe(switchMap(({ items, isLastPage }) => (isLastPage ? of(items) : luAccumulatePages(fetchPage, page + 1).pipe(map((next) => [...items, ...next])))));
}
