import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ILuUser, LuUserPictureComponent } from '@lucca-front/ng/user';

@Component({
	selector: 'lu-activity-feed-step',
	templateUrl: './activity-feed-step.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuUserPictureComponent, DatePipe],
	host: {
		role: 'listitem',
		class: 'activityFeed-step',
	},
})
export class ActivityFeedStepComponent {
	readonly date = input.required<Date>();
	readonly user = input.required<ILuUser>();
	readonly label = input.required<string>();
}
