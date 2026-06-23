import { finn } from '@/stories/users/user.mocks';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent, ActivityFeedUpdateGroupComponent } from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { ButtonComponent } from '@lucca/prisme/button';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'activity-feed-stories',
	templateUrl: './activity-feed.stories.html',
	imports: [ActivityFeedUpdateGroupComponent, ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent, StatusBadgeComponent, CommentComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ActivityFeedStory {
	user = finn;
	date = new Date();
}

export default {
	title: 'QA/ActivityFeed',
	component: ActivityFeedStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ActivityFeedStory> = {
	args: {},
	render: template,
};
