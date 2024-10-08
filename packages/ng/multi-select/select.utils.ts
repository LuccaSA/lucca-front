import { LuMultiSelectWithSelectAllValue } from './select.model';

export function selectionToQueryParams<T, Key extends string>(key: Key, value: LuMultiSelectWithSelectAllValue<T>, selector: (value: T) => unknown): Partial<Record<Key | `-${Key}`, string>> {
	if (value.mode === 'all') {
		return {};
	}
	return { [value.mode === 'include' ? key : `-${key}`]: value.values.map(selector).join(',') } as Record<Key | `-${Key}`, string>;
}
