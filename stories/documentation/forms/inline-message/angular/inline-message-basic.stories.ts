import { INLINE_MESSAGE_SIZE, InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { Meta, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/InlineMessage/Angular/Basic',
	component: InlineMessageComponent,
	argTypes: {
		state: {
			options: ['success', 'warning', 'error', 'default'],
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
		},
		size: {
			options: setStoryOptions(INLINE_MESSAGE_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		label: {
			description: 'Modifie le texte affiché par le composant. PortalContent. ',
		},
	},
} as Meta;

export const Template: StoryObj<InlineMessageComponent> = {
	args: {
		state: 'default',
		label: 'Inline message',
	},
};
