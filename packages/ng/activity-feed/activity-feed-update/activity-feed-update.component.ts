import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
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
		class: 'activityFeed-content-update',
	},
})
export class ActivityFeedUpdateComponent {
	readonly intl = input(...intlInputOptions(LU_ACTIVITY_FEED_TRANSLATIONS));

	readonly strikethrough = input(false, { transform: booleanAttribute });
}
