import { finn } from '@/stories/users/user.mocks';
import { LOCALE_ID } from '@angular/core';
import {
	ACTIVITY_FEED_STEP_STATUS,
	ActivityFeedComponent,
	ActivityFeedStepComponent,
	ActivityFeedStepStatus,
	ActivityFeedUpdateComponent,
	ActivityFeedUpdateItemComponent,
	luActivityFeedTranslations,
} from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { ButtonComponent } from '@lucca/prisme/button';
import { applicationConfig, ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

interface ActivityFeedBasicStory {
	statusStep: boolean;
	pendingStep: boolean;
	updated: boolean;
	attachedContent: 'none' | 'file' | 'readMore';
	addAction: boolean;
	user: unknown;
	label: string;
	status: ActivityFeedStepStatus | '';
	datePipeFormat: string;
}

export default {
	title: 'Documentation/Listings/Activity feed/Angular/Basic',
	argTypes: {
		statusStep: {
			control: 'boolean',
			description: 'Exemple avec des étapes success et critical.',
			table: { category: 'story' },
		},
		pendingStep: {
			control: 'boolean',
			description: 'Exemple avec une étape en attente.',
			table: { category: 'story' },
		},
		updated: {
			control: 'boolean',
			description: 'Présente une étape avec des valeurs modifiées grâce aux sous-composant <code>lu-activity-feed-update</code> et <code>lu-activity-feed-update-item</code>.',
			table: { category: 'story' },
		},
		attachedContent: {
			options: ['none', 'file', 'readMore'],
			control: { type: 'select' },
			description: 'Présente une étape avec un contenu attaché (fichier ou commentaire).',
			table: { category: 'story' },
		},
		addAction: {
			control: 'boolean',
			description: 'Exemple avec un bouton d’action supplémentaire à la fin du fil d’activité.',
			table: { category: 'story' },
		},
		label: {
			control: 'text',
			description: 'Description de l’étape. [PortalContent]',
			table: { category: 'inputs (activity-feed-step)' },
		},
		user: {
			description: 'Permet de définir l’utilisateur présenté dans l’avatar (masqué pour les statuts `success` et `critical`).',
			table: { category: 'inputs (activity-feed-step)', type: { summary: 'ILuUser' } },
		},
		status: {
			options: setStoryOptions(ACTIVITY_FEED_STEP_STATUS),
			control: { type: 'select' },
			description: 'Statut de l’étape : `success` et `critical` remplacent l’avatar par un indicateur d’état.',
			table: { category: 'inputs (activity-feed-step)', type: { summary: 'ActivityFeedStepStatus' } },
		},
		date: {
			control: false,
			description: 'Date de l’étape, affichée par défaut sous forme de date et heure complètes.',
			table: { category: 'inputs (activity-feed-step)', type: { summary: 'Date | string' } },
		},
		datePipeFormat: {
			control: 'text',
			description: 'Format passé au `DatePipe` pour afficher la date (ex. `dd/MM/yyyy`). Voir <a href="https://angular.dev/api/common/DatePipe#custom-format-options">les options de format</a>.',
			table: { category: 'inputs (activity-feed-step)' },
		},
		updateItemLabel: {
			name: 'label',
			control: false,
			description: 'Libellé de la valeur modifiée (requis).',
			table: { category: 'inputs (activity-feed-update-item)', type: { summary: 'string' } },
		},
		intl: intlArgType(luActivityFeedTranslations, 'ActivityFeedTranslate', 'lu-activity-feed-step, lu-activity-feed-update-item'),
	},
	decorators: [
		moduleMetadata({
			imports: [
				ActivityFeedUpdateItemComponent,
				ActivityFeedComponent,
				ActivityFeedStepComponent,
				ActivityFeedUpdateComponent,
				StatusBadgeComponent,
				CommentComponent,
				FileEntryComponent,
				ReadMoreComponent,
				ButtonComponent,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

function getTemplate(args: ActivityFeedBasicStory, argTypes: ArgTypes): string {
	const { label, status, datePipeFormat } = args;
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
	<lu-activity-feed-step [user]="user" [date]="date" label="Daniel Hernandez a modifié une demande.">
		<lu-activity-feed-update>
			<lu-activity-feed-update-item label="Statut">
				<lu-status-badge activityFeedUpdateBefore palette="critical" label="Refusé" />
				<lu-status-badge activityFeedUpdateAfter palette="success" label="Approuvé" />
			</lu-activity-feed-update-item>
			<lu-activity-feed-update-item label="Montant">
				<ng-container activityFeedUpdateBefore>1000 €</ng-container>
				<ng-container activityFeedUpdateAfter>500 €</ng-container>
			</lu-activity-feed-update-item>
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
	<lu-activity-feed-step [user]="user" [date]="date"${generateInputs({ label, status, datePipeFormat }, argTypes)} />${attachedContentStep}${statusSteps}${pendingStep}${updatedStep}${addActionStep}
</lu-activity-feed>`;
}

const Template = (args: ActivityFeedBasicStory, { argTypes }: { argTypes: ArgTypes }) => ({
	props: { user: args.user, date: new Date() },
	template: getTemplate(args, argTypes),
});

export const Basic: StoryObj<ActivityFeedBasicStory> = {
	args: {
		label: 'Lorem ipsum dolor.',
		user: finn,
		status: '',
		datePipeFormat: '',
		statusStep: false,
		pendingStep: false,
		updated: false,
		attachedContent: 'none',
		addAction: false,
	},
	render: Template,
};
