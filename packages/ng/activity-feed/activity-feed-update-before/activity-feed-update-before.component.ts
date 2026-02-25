import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca/prisme/icon';

@Component({
	selector: 'lu-activity-feed-update-before',
	templateUrl: './activity-feed-update-before.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [IconComponent, PortalDirective, NgTemplateOutlet],
	host: {
		class: 'activityFeed-content-update-before',
		'[class.mod-strikethrough]': 'strikethrough()',
	},
})
export class ActivityFeedUpdateBeforeComponent {
	readonly strikethrough = input(false, { transform: booleanAttribute });
}
