import { bob } from '@/stories/users/user.mocks';
import { LOCALE_ID } from '@angular/core';
import { ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent } from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ActivityFeedBasicStory {}

export default {
	title: 'Documentation/Listings/Activity feed/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent, StatusBadgeComponent, CommentComponent, FileEntryComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

function getTemplate(args: ActivityFeedBasicStory): string {
	return `<lu-activity-feed>
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
	<lu-activity-feed-step [user]="user" [date]="date" label="Daniel Hernandez a modifié un statut.">
		<lu-activity-feed-update>
			<lu-status-badge activityFeedUpdateBefore palette="critical" label="Refusé" />
			<lu-status-badge activityFeedUpdateAfter palette="success" label="Approuvé" />
		</lu-activity-feed-update>
		<lu-comment noInfos content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum velit nec leo tempor." />
	</lu-activity-feed-step>
	<lu-activity-feed-step [user]="user" [date]="date" label="Daniel Hernandez a modifié le budget.">
		<lu-activity-feed-update strikethrough>
			<ng-container activityFeedUpdateBefore>1000 €</ng-container>
			<ng-container activityFeedUpdateAfter>800 €</ng-container>
		</lu-activity-feed-update>
		<lu-file-entry [entry]="{ name: 'facture.pdf', size: 28420, type: 'application/pdf' }" size="S" downloadURL="https://example.com/" />
	</lu-activity-feed-step>
</lu-activity-feed>`;
}

const Template = (args: ActivityFeedBasicStory) => ({
	props: { ...args, date: new Date() },
	template: getTemplate(args),
});

export const Basic: StoryObj<ActivityFeedBasicStory> = {
	args: {
		user: bob,
	},
	render: Template,
};
