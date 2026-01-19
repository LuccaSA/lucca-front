import { LuMultiSelection } from './select.model';

export function selectionToQueryParams<T, Key extends string>(key: Key, value: LuMultiSelection<T>, selector: (value: T) => unknown): Partial<Record<Key | `-${Key}`, string>> {
	if (value.mode === 'all' || value.mode === 'none') {
		return {};
	}
	return { [value.mode === 'include' ? key : `-${key}`]: value.values.map(selector).join(',') } as Record<Key | `-${Key}`, string>;
}

/**
 * Transforms a selection from withSelectAll, the complete list of options and a getKey function to a list of options.
 *
 * @example
 * ```ts
 * const selection = { mode: 'exclude', values: [{ id: 1, name: 'foo' }] };
 * const allOptions = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }];
 *
 * const selectedOptions = selectionToOptions(selection, allOptions, (o) => o.id);
 * ```
 */
export function selectionToOptions<T>(selection: LuMultiSelection<T>, options: T[], getKeyFn: (value: T) => unknown): T[] {
	switch (selection.mode) {
		case 'include':
			return selection.values;
		case 'exclude': {
			const excludedKeys = new Set(selection.values.map(getKeyFn));
			return options.filter((o) => !excludedKeys.has(getKeyFn(o)));
		}
		case 'all':
			return options;
		case 'none':
			return [];
	}
}
