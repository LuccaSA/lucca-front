import { IconsList } from '@/stories/icons-list';
import { ICON_COLOR, ICON_SIZE, IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Texts/Icons/Angular/Basic',
	component: IconComponent,
	argTypes: {
		alt: {
			description: 'Information restituée par le lecteur d’écran.',
			table: { category: 'inputs' },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: 'select',
			description: 'Modifie le glyphe de l’icône.',
			table: { category: 'inputs' },
		},
		color: {
			options: ICON_COLOR,
			control: {
				type: 'select',
			},
			if: { arg: 'AI', truthy: false },
			description: 'Modifie la couleur de l’icône.',
			table: { category: 'inputs', defaultValue: { summary: 'inherit' } },
		},
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		size: {
			options: setStoryOptions(ICON_SIZE),
			description: "Modifie la taille de l'icône.",
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Template: StoryObj<IconComponent> = {
	args: {
		alt: 'Texte alternatif',
		color: 'inherit',
		icon: 'heart',
		AI: false,
	},
};
