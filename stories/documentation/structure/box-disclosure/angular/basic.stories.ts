import { BOX_THEME, BoxDisclosureComponent } from '@lucca-front/ng/box';
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
			type: 'string',
			description: 'Information courte affichée avant le chevron, visible panneau replié.',
			table: { category: 'inputs' },
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
			imports: [BoxDisclosureComponent],
		}),
	],
	render: ({ openChange, ...args }, { argTypes }) => {
		return {
			props: {
				...args,
				onOpenChange: (open: boolean) => openChange?.(open),
			},
			template: cleanupTemplate(`<lu-box-disclosure ${generateInputs(args, argTypes)} (openChange)="onOpenChange($event)">Custom content</lu-box-disclosure>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxDisclosureComponent> = {
	args: {
		heading: 'Title',
		subtitle: 'Subtitle',
		metadata: 'Metadata',
		theme: 'white',
		open: false,
	},
};
