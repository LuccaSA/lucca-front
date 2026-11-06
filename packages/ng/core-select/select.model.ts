import { Injectable, InjectionToken } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { Observable } from 'rxjs';

export interface SelectDataSourceParams {
	clue: string;
	page: number;
}

export interface SelectDataSource<TOption, TGroup = never> {
	/**
	 * Emits when the params behind `getOptions` changed, so the select resets and reloads from page 0
	 * with the current clue — a panel header toggle, a filter bound to an input…
	 *
	 * It must not emit on clue changes: those are the select's own business, debounce included, and an
	 * emission here would load the same page a second time.
	 */
	paramsChange?: Observable<unknown>;
	/** Optional debounce in ms for clue-based re-queries (useful for API data sources) */
	clueDebounceMs?: number;
	/**
	 * Whether `getOptions` answers page by page. When false, it emits the whole list at once and `page`
	 * is always 0: the select accumulates nothing, `nextPage` is only a request for more, and the loading
	 * row is left to the consumer through the `loading` input.
	 * @default true
	 */
	paginated?: boolean;
	getOptions(params: SelectDataSourceParams): Observable<readonly TOption[]>;
	/**
	 * Optional post-processing applied to the whole list of loaded options (all pages accumulated),
	 * every time it changes. Use it for decorations that can't be computed page by page —
	 * for example flagging homonyms, which requires seeing every loaded option at once.
	 */
	transformOptions?(options: readonly TOption[]): Observable<readonly TOption[]>;
	getTotalCount?(params: SelectDataSourceParams): Observable<number>;
	getGroupOptions?: [TGroup] extends [never] ? never : (group: TGroup) => Observable<TOption[]>;
	reset?(): void;
}

export interface LuOptionContext<T> {
	$implicit: T;
}

export interface LuOptionGroupByContext<T, TGroup> {
	$implicit: LuOptionGroup<T, TGroup>;
}

export interface LuOptionGrouping<TOption, TGroup> {
	selector: (option: TOption) => TGroup;
	content: PortalContent<LuOptionGroupByContext<TOption, TGroup>>;
}

export interface LuOptionGroup<T, TGroup> {
	key: TGroup;
	options: T[];
}

export type LuOptionComparer<T> = (a: T, b: T) => boolean;

export type CoreSelectAddOptionStrategy = 'never' | 'always' | 'if-empty-clue' | 'if-not-empty-clue';

/**
 * Feature flag gating the responsive dialog system as a whole: below the `XS` breakpoint the select
 * trigger becomes a button and its panel opens as a bottom sheet instead of a popover anchored to the
 * field.
 *
 * It defaults to `false`, so a consumer that provides nothing keeps the anchored popover at every
 * viewport size. Turn it on application-wide with `{ provide: SELECT_RESPONSIVE_DIALOG, useValue: true }`.
 */
export const SELECT_RESPONSIVE_DIALOG = new InjectionToken<boolean>('SELECT_RESPONSIVE_DIALOG', { factory: () => false });

export const SELECT_ID = new InjectionToken<number>('LuSelectPanelData');
export const SELECT_LABEL = new InjectionToken<HTMLLabelElement | undefined>('LuSelectLabel');
export const SELECT_LABEL_ID = new InjectionToken<string>('LuSelectLabelId');

/**
 * Contract behind {@link CORE_SELECT_API_TOTAL_COUNT_PROVIDER}: a directive fulfills it by declaring
 * a `totalCount$`, which the select-all of `lu-multi-select` then reads through the token. Providing
 * a count stays optional — see `ALuCoreSelectApiDirective.totalCount$`.
 */
export interface CoreSelectApiTotalCountProvider {
	totalCount$: Observable<number>;
}

export const CORE_SELECT_API_TOTAL_COUNT_PROVIDER = new InjectionToken<CoreSelectApiTotalCountProvider>('CoreSelectApiTotalCountProvider');

@Injectable({
	providedIn: 'root',
	useFactory: () => new DefaultIsSelectedStrategy(),
})
export abstract class ɵIsSelectedStrategy<TOption> {
	abstract isSelected(option: TOption, selectedOptions: TOption[], optionComparer: LuOptionComparer<TOption>): boolean;
	abstract isGroupSelected(options: TOption[], notSelectedOptions: TOption[]): boolean;
}

class DefaultIsSelectedStrategy<TOption> extends ɵIsSelectedStrategy<TOption> {
	isSelected(option: TOption, selectedOptions: TOption[], optionComparer: LuOptionComparer<TOption>): boolean {
		return selectedOptions.some((o) => optionComparer(o, option));
	}

	isGroupSelected(options: TOption[], notSelectedOptions: TOption[]): boolean {
		return !notSelectedOptions.length && notSelectedOptions.length !== options.length;
	}
}
