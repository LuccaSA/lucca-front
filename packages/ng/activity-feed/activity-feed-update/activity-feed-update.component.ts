import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca/prisme/icon';
import { LU_ACTIVITY_FEED_TRANSLATIONS } from '../activity-feed.translate';

@Component({
	selector: 'lu-activity-feed-update',
	templateUrl: './activity-feed-update.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [IconComponent, NgTemplateOutlet],
	host: {
		class: 'activityFeed-content-group-update',
	},
})
export class ActivityFeedUpdateComponent {
	#locale = inject(LOCALE_ID);

	readonly intl = input(...intlInputOptions(LU_ACTIVITY_FEED_TRANSLATIONS));

	readonly label = input.required<string>();

	readonly colonDisplay = computed(() => {
		if (this.#locale === 'fr') {
			return ' :';
		}
		return ':';
	});
}
