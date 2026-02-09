import { IconsList } from '@/stories/icons-list';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Icons/Angular',
	component: IconComponent,
	argTypes: {
		alt: {
			description: "Information restituée par le lecteur d'écran.",
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: 'select',
			description: "Modifie le glyphe de l'icône.",
		},
		color: {
			if: { arg: 'AI', truthy: false },
			description: "Modifie la couleur de l'icône.",
		},
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			control: {
				type: 'boolean',
			},
		},
		size: {
			options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
			description: "Modifie la taille de l'icône.",
			control: {
				type: 'select',
			},
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
