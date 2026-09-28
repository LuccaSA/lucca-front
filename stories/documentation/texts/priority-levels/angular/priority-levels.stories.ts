import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { PRIORITY_LEVELS, PRIORITY_LEVELS_SIZES, PriorityLevelsComponent } from '@lucca-front/ng/priority-levels';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority levels/Angular',
	component: PriorityLevelsComponent,
	argTypes: {
		level: {
			options: PRIORITY_LEVELS,
			control: { type: 'select' },
			description: 'Niveau de priorité affiché.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(PRIORITY_LEVELS_SIZES),
			control: { type: 'select' },
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => ({
		template: `<lu-priority-levels${generateInputs(args, argTypes)} />`,
	}),
} as Meta;

export const Template: StoryObj<PriorityLevelsComponent> = {};
