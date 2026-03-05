import { bob } from '@/stories/users/user.mocks';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent } from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'activity-feed-stories',
	templateUrl: './activity-feed.stories.html',
	imports: [ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent, StatusBadgeComponent, CommentComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ActivityFeedStory {
	user = bob;
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
