import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca/prisme/icon';

@Component({
	selector: 'lu-activity-feed-update-after',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [IconComponent, PortalDirective, NgTemplateOutlet],
	host: {
		class: 'activityFeed-content-update-after',
	},
})
export class ActivityFeedUpdateAfterComponent {}
