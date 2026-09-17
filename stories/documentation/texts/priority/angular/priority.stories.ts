import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { PRIORITY_LEVELS, PriorityComponent } from '@lucca-front/ng/priority';
import { TAG_SIZE } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority/Angular',
	component: PriorityComponent,
	argTypes: {
		level: {
			options: PRIORITY_LEVELS,
			control: { type: 'select' },
			description: 'Niveau de priorité affiché.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(TAG_SIZE),
			control: { type: 'select' },
			description: 'Modifie la taille du tag.',
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => ({
		template: `<lu-priority${generateInputs(args, argTypes)} />`,
	}),
} as Meta;

export const Template: StoryObj<PriorityComponent> = {};
