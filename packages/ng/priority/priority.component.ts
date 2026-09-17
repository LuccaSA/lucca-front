import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, luNumberAttribute, Palette } from '@lucca-front/ng/core';
import { TagComponent, TagSize } from '@lucca-front/ng/tag';
import { LU_PRIORITY_TRANSLATIONS } from './priority.translate';
import { PriorityLevel } from './priority.type';

const LEVEL_TRANSLATION_KEYS = {
	1: 'low',
	2: 'medium',
	3: 'high',
} as const;

@Component({
	selector: 'lu-priority',
	templateUrl: './priority.component.html',
	styleUrl: './priority.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [TagComponent],
	host: {
		'[class.is-low]': 'level() === 1',
		'[class.is-medium]': 'level() === 2',
		'[class.is-high]': 'level() === 3',
	},
})
export class PriorityComponent {
	/**
	 * Which priority level should be displayed (1 = low, 2 = medium, 3 = high). Defaults to 1
	 */
	readonly level = input<PriorityLevel>(1, { transform: luNumberAttribute<PriorityLevel> });

	/**
	 * Which size should the tag be? Defaults to M
	 */
	readonly size = input<TagSize>('M');

	/**
	 * Overrides for the default translations
	 */
	readonly intl = input(...intlInputOptions(LU_PRIORITY_TRANSLATIONS));

	readonly label = computed(() => this.intl()[LEVEL_TRANSLATION_KEYS[this.level()]]);

	readonly palette = computed<Palette>(() => {
		switch (this.level()) {
			case 2:
				return 'warning';
			case 3:
				return 'error';
			default:
				return 'neutral';
		}
	});
}
