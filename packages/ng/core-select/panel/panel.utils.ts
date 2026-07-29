import { computed, Signal } from '@angular/core';

export type GroupTemplateLocation = 'group-header' | 'option' | 'none';

/**
 * In order to avoid a blinking when we go from empty clue to a clue
 * We need to delay the change of group displayer location by waiting for the options to be updated.
 */
export function getGroupTemplateLocation(hasGrouping: Signal<boolean>, clue: Signal<string>, searchable = true): Signal<GroupTemplateLocation> {
	const hasClue = computed(() => !!clue());

	return computed(() => {
		if (!hasGrouping()) {
			return 'none';
		}

		if (!searchable) {
			return 'group-header';
		}

		return hasClue() ? 'option' : 'group-header';
	});
}
