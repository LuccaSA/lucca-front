import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-activity-feed',
	styleUrl: './activity-feed.component.scss',
	templateUrl: './activity-feed.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityFeedComponent {}
