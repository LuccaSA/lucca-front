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
	const now = Date.now();
	return `<lu-activity-feed>
	<lu-activity-feed-step [user]="user" [date]="'${now}'" label="Lorem ipsum dolor." />
	<lu-activity-feed-step [user]="user" [date]="'${now}'" label="Daniel Hernandez a modifié un statut.">
		<lu-activity-feed-update>
			<ng-container before><lu-status-badge palette="critical" label="Refusé" /></ng-container>
			<ng-container after><lu-status-badge palette="success" label="Approuvé" /></ng-container>
		</lu-activity-feed-update>
		<ng-template #before><lu-status-badge palette="error" label="Refusé" /></ng-template>
		<ng-template #after><lu-status-badge palette="success" label="Accepté" /></ng-template>
		<lu-comment noInfos content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum velit nec leo tempor." />
	</lu-activity-feed-step>
	<lu-activity-feed-step [user]="user" [date]="'${now}'" label="Daniel Hernandez a modifié le budget.">
		<lu-activity-feed-update strikethrough>
			<ng-container before>1000 €</ng-container>
			<ng-container after>800 €</ng-container>
		</lu-activity-feed-update>
		<lu-file-entry [entry]="{ name: 'facture.pdf', size: 28420, type: 'application/pdf' }" size="S" />
	</lu-activity-feed-step>
</lu-activity-feed>`;
}

const Template = (args: ActivityFeedBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ActivityFeedBasicStory> = {
	args: {
		user: bob,
	},
	render: Template,
};
