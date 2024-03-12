import { Pipe, PipeTransform } from '@angular/core';
import { LuOptionGroup } from '../select.model';

/**
 * Generate groups with a O(n) complexity. Note that the options must be sorted by group.
 */
export function generateGroups<T, TGroup>(options: T[], selector: (option: T) => TGroup): LuOptionGroup<T, TGroup>[] {
	if (!options?.length) {
		return [];
	}

	const groups: Array<LuOptionGroup<T, TGroup>> = [];
	let group: LuOptionGroup<T, TGroup>;

	for (const option of options) {
		const groupKey = selector(option);
		if (!group || group.key !== groupKey) {
			if (group) {
				groups.push(group);
			}
			group = { key: groupKey, options: [option] };
		} else {
			group.options.push(option);
		}
	}

	if (group) {
		groups.push(group);
	}

	return groups;
}

@Pipe({
	name: 'luOptionGroup',
	standalone: true,
})
export class LuOptionGroupPipe<T, TGroup> implements PipeTransform {
	public transform(options: T[], selector: (option: T) => TGroup): LuOptionGroup<T, TGroup>[];
	public transform(options: T, selector: (option: T) => TGroup): LuOptionGroup<T, TGroup>;
	public transform(options: T[] | T, selector: (option: T) => TGroup): LuOptionGroup<T, TGroup>[] | LuOptionGroup<T, TGroup> {
		return Array.isArray(options) ? generateGroups(options, selector) : generateGroups([options], selector)[0];
	}
}
