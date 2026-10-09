import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, luNumberAttribute } from '@lucca-front/ng/core';
import { IconComponent, IconSize } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
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
	imports: [IconComponent, LuTooltipTriggerDirective],
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
	 * Which priority level should be displayed (1 = low, 2 = medium, 3 = high)
	 */
	readonly level = input.required({ transform: luNumberAttribute<PriorityLevel> });

	/**
	 * Which size should the component be? Defaults to M
	 */
	readonly size = input<PriorityLevelsSize>('M');

	/**
	 * Overrides for the default translations
	 */
	readonly intl = input(...intlInputOptions(LU_PRIORITY_LEVELS_TRANSLATIONS));

	/**
	 * Visually hides the label while keeping it in the DOM for screen readers, and shows it in a tooltip on the icon instead
	 */
	readonly hiddenLabel = input(false, { transform: booleanAttribute });

	readonly label = computed(() => this.intl()[LEVEL_TRANSLATION_KEYS[this.level()]]);

	readonly iconSize = computed<IconSize>(() => {
		switch (this.size()) {
			case 'S':
				return 'XXS';
			case 'L':
				return 'S';
			default:
				return 'XS';
		}
	});
}
