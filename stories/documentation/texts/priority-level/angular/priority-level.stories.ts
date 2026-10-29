import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { PRIORITY_LEVELS, PRIORITY_LEVEL_SIZES, PriorityLevelComponent, PriorityLevelSize } from '@lucca-front/ng/priority-level';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority level/Angular',
	component: PriorityLevelComponent,
	argTypes: {
		level: {
			options: PRIORITY_LEVELS,
			control: { type: 'select' },
			description: 'Niveau de priorité affiché.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(PRIORITY_LEVEL_SIZES),
			control: { type: 'select' },
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		hiddenLabel: {
			control: { type: 'boolean' },
			description: 'Masque visuellement le libellé (accessible aux lecteurs d’écran) et l’affiche dans une tooltip sur l’icône.',
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => ({
		template: `<lu-priority-level${generateInputs(args, argTypes)} />`,
	}),
} as Meta;

export const Template: StoryObj<Omit<PriorityLevelComponent, 'size'> & { size: PriorityLevelSize | '' }> = {
	args: {
		level: 1,
		size: '',
		hiddenLabel: false,
	},
};
