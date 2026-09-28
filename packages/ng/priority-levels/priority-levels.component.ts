import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, luNumberAttribute } from '@lucca-front/ng/core';
import { LU_PRIORITY_LEVELS_TRANSLATIONS } from './priority-levels.translate';
import { PriorityLevel, PriorityLevelsSize } from './priority-levels.type';

const LEVEL_TRANSLATION_KEYS = {
	1: 'low',
	2: 'medium',
	3: 'high',
} as const;

@Component({
	selector: 'lu-priority-levels',
	templateUrl: './priority-levels.component.html',
	styleUrl: './priority-levels.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'priorityLevels',
		'[class.mod-low]': 'level() === 1',
		'[class.mod-medium]': 'level() === 2',
		'[class.mod-high]': 'level() === 3',
		'[class.mod-S]': "size() === 'S'",
		'[class.mod-L]': "size() === 'L'",
	},
})
export class PriorityLevelsComponent {
	/**
	 * Which priority level should be displayed (1 = low, 2 = medium, 3 = high). Defaults to 1
	 */
	readonly level = input<PriorityLevel>(1, { transform: luNumberAttribute<PriorityLevel> });

	/**
	 * Which size should the component be? Defaults to M
	 */
	readonly size = input<PriorityLevelsSize>('M');

	/**
	 * Overrides for the default translations
	 */
	readonly intl = input(...intlInputOptions(LU_PRIORITY_LEVELS_TRANSLATIONS));

	readonly label = computed(() => this.intl()[LEVEL_TRANSLATION_KEYS[this.level()]]);

	readonly iconSizeClass = computed(() => {
		switch (this.size()) {
			case 'S':
				return 'mod-XXS';
			case 'L':
				return 'mod-S';
			default:
				return 'mod-XS';
		}
	});
}
