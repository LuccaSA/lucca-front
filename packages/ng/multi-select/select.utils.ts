import { LuMultiSelection } from './select.model';

export function selectionToQueryParams<T, Key extends string>(key: Key, value: LuMultiSelection<T>, selector: (value: T) => unknown): Partial<Record<Key | `-${Key}`, string>> {
	if (value.mode === 'all' || value.mode === 'none') {
		return {};
	}
	return { [value.mode === 'include' ? key : `-${key}`]: value.values.map(selector).join(',') } as Record<Key | `-${Key}`, string>;
}
