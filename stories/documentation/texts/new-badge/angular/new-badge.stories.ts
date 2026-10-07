import { NewBadgeComponent } from '@lucca-front/ng/new-badge';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/NewBadge/Angular/Basic',
	component: NewBadgeComponent,
	argTypes: {
		label: {
			control: 'text',
			description: 'Modifie le texte affiché par le composant.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Template: StoryObj<NewBadgeComponent> = {
	args: {
		label: 'New',
	},
};
