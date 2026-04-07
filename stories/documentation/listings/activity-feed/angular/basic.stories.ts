import { bob } from '@/stories/users/user.mocks';
import { LOCALE_ID } from '@angular/core';
import { ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent } from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { ButtonComponent } from '@lucca/prisme/button';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ActivityFeedBasicStory {
	statusStep: boolean;
	pendingStep: boolean;
	updated: boolean;
	attachedContent: 'none' | 'file' | 'readMore';
	addAction: boolean;
	user: unknown;
}

export default {
	title: 'Documentation/Listings/Activity feed/Angular/Basic',
	argTypes: {
		statusStep: {
			control: 'boolean',
			description: 'Exemple avec des étapes success et critical.',
		},
		pendingStep: {
			control: 'boolean',
			description: 'Exemple avec une étape en attente.',
		},
		updated: {
			control: 'boolean',
			description: 'Présente une étape avec des valeurs modifiées grace au sous-composant <code>lu-activity-feed-update</code>.',
		},
		attachedContent: {
			options: ['none', 'file', 'readMore'],
			control: { type: 'select' },
			description: 'Présente avec une étape avec un contenu attaché (fichier ou commentaire).',
		},
		addAction: {
			control: 'boolean',
			description: 'Exemple avec un bouton d’action supplémentaire à la fin du fil d’activité.',
		},
		user: {
			description: "Permet de définir l'utilisateur présenté dans l'avatar",
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent, StatusBadgeComponent, CommentComponent, FileEntryComponent, ReadMoreComponent, ButtonComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

function getTemplate(args: ActivityFeedBasicStory): string {
	const statusSteps = args.statusStep
		? `
	<lu-activity-feed-step status="success" [date]="date" label="Lorem ipsum dolor." />
	<lu-activity-feed-step status="critical" [date]="date" label="Lorem ipsum dolor." />`
		: '';
	const pendingStep = args.pendingStep
		? `
	<lu-activity-feed-step status="pending" [user]="user" label="En attente d'approbation par Daniel Hernandez. " />`
		: '';
	const updatedStep = args.updated
		? `
	<lu-activity-feed-step [user]="user" [date]="date" label="Daniel Hernandez a modifié un statut.">
		<lu-activity-feed-update>
			<lu-status-badge activityFeedUpdateBefore palette="critical" label="Refusé" />
			<lu-status-badge activityFeedUpdateAfter palette="success" label="Approuvé" />
		</lu-activity-feed-update>
		<lu-comment noInfos content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum velit nec leo tempor." />
	</lu-activity-feed-step>`
		: '';
	let attachedContentStep = '';
	if (args.attachedContent === 'file') {
		attachedContentStep = `
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor.">
		<lu-file-entry [entry]="{ name: 'facture.pdf', size: 28420, type: 'application/pdf' }" size="S" downloadURL="https://example.com/" />
	</lu-activity-feed-step>`;
	} else if (args.attachedContent === 'readMore') {
		attachedContentStep = `
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor.">
		<lu-comment noInfos [content]="commentContent">
			<ng-template #commentContent>
				<lu-read-more lineClamp="3" textFlow>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</lu-read-more>
			</ng-template>
		</lu-comment>
	</lu-activity-feed-step>`;
	} else {
		attachedContentStep = `
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />`;
	}
	const addActionStep = args.addAction
		? `
	<lu-activity-feed-step>
		<button type="button" luButton>Afficher plus</button>
	</lu-activity-feed-step>`
		: '';
	return `<lu-activity-feed>
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />${attachedContentStep}${statusSteps}${pendingStep}${updatedStep}${addActionStep}
</lu-activity-feed>`;
}

const Template = (args: ActivityFeedBasicStory) => ({
	props: { ...args, date: new Date() },
	template: getTemplate(args),
});

export const Basic: StoryObj<ActivityFeedBasicStory> = {
	args: {
		user: bob,
		statusStep: false,
		pendingStep: false,
		updated: false,
		attachedContent: 'none',
		addAction: false,
	},
	render: Template,
};
