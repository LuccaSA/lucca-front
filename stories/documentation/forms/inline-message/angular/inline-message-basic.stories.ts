import { INLINE_MESSAGE_SIZE, INLINE_MESSAGE_STATE, InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/InlineMessage/Angular/Basic',
	component: InlineMessageComponent,
	argTypes: {
		state: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(INLINE_MESSAGE_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		label: {
			description: 'Modifie le texte affiché par le composant. [PortalContent]',
			table: { category: 'inputs' },
		},
		withTooltip: {
			description: 'Tronque le texte avec une ellipsis et l’affiche dans une tooltip au survol.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
	},
} as Meta;

export const Template: StoryObj<InlineMessageComponent> = {
	args: {
		state: 'default',
		label: 'Inline message',
		withTooltip: false,
	},
};
