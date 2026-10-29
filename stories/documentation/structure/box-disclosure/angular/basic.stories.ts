import { BOX_THEME, BoxDisclosureComponent } from '@lucca-front/ng/box';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/BoxDisclosure/Angular/Basic',
	component: BoxDisclosureComponent,
	argTypes: {
		theme: {
			options: setStoryOptions(BOX_THEME),
			control: { type: 'select' },
			description: 'Couleur de fond de la box. Les thèmes <code>fancy*</code> mettent la box en avant.',
			table: { category: 'inputs', defaultValue: { summary: 'white' } },
		},
		heading: {
			type: 'string',
			description: 'Titre affiché dans la zone cliquable. [PortalContent]',
			table: { category: 'inputs' },
		},
		subtitle: {
			type: 'string',
			description: 'Sous-titre visible panneau replié : y placer les informations critiques. [PortalContent]',
			table: { category: 'inputs' },
		},
		metadata: {
			control: { type: 'object' },
			description:
				'Informations courtes affichées avant le chevron, visible panneau replié. Un tableau de chaînes est affiché sous forme de listing inline. Un template peut être passé pour les cas particuliers : il est rendu dans la zone cliquable et ne doit donc contenir aucun élément interactif. [PortalContent]',
			table: { category: 'inputs', type: { summary: 'string[] | PortalContent' } },
		},
		open: {
			description: 'Place la box dans son état déplié.',
			table: { category: 'models' },
		},
		openChange: {
			description: 'Événement déclenché lors du changement d’état déplié/replié de la box.',
			action: 'openChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'boolean' } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BoxDisclosureComponent, StatusBadgeComponent],
		}),
	],
	render: ({ openChange, metadata, ...args }, { argTypes }) => {
		return {
			props: {
				...args,
				metadata,
				onOpenChange: (open: boolean) => openChange?.(open),
			},
			template: cleanupTemplate(`<lu-box-disclosure ${generateInputs(args, argTypes)} [metadata]="metadata" (openChange)="onOpenChange($event)">Custom content</lu-box-disclosure>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxDisclosureComponent> = {
	args: {
		heading: 'Title',
		subtitle: 'Subtitle',
		metadata: ['Metadata', 'Metadata'],
		theme: 'white',
		open: false,
	},
};

export const CustomMetadata: StoryObj<BoxDisclosureComponent> = {
	args: {
		heading: 'Title',
		subtitle: 'Subtitle',
		theme: 'white',
		open: false,
	},
	argTypes: {
		metadata: { control: false },
	},
	render: ({ openChange, metadata, ...args }, { argTypes }) => {
		return {
			props: {
				...args,
				onOpenChange: (open: boolean) => openChange?.(open),
			},
			template: cleanupTemplate(`<lu-box-disclosure ${generateInputs(args, argTypes)} [metadata]="customMetadata" (openChange)="onOpenChange($event)">Custom content</lu-box-disclosure>
<ng-template #customMetadata>
	<lu-status-badge label="Status" palette="success" />
</ng-template>`),
		};
	},
};
