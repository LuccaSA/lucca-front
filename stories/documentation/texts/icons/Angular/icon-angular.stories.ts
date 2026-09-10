import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { IconsList } from '@/stories/icons-list';
import { ICON_COLOR, ICON_SIZE, IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Icons/Angular',
	component: IconComponent,
	argTypes: {
		alt: {
			description: 'Information restituée par le lecteur d’écran.',
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: 'select',
			description: 'Modifie le glyphe de l’icône.',
		},
		color: {
			options: setStoryOptions(ICON_COLOR),
			if: { arg: 'AI', truthy: false },
			description: 'Modifie la couleur de l’icône.',
			table: {
				category: 'inputs',
				defaultValue: { summary: 'inherit' },
			},
		},
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			control: {
				type: 'boolean',
			},
		},
		size: {
			options: setStoryOptions(ICON_SIZE),
			description: "Modifie la taille de l'icône.",
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<IconComponent> = {
	render: (args, { argTypes }) => ({
		template: `<lu-icon${generateInputs(args, argTypes)} />`,
	}),
	args: {
		alt: '',
		color: 'inherit',
		icon: 'heart',
		AI: false,
	},
};
