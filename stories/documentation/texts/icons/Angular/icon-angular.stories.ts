import { ɵIconsList } from '@lucca-front/icons';
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
			options: ɵIconsList.map((i) => i.icon),
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
			description: "Modifie la taille de l'icône.",
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
