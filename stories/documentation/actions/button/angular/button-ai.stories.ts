import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Actions/Button/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [ButtonComponent, IconComponent],
		}),
	],
	argTypes: {
		label: {
			description: 'Libellé du bouton.',
			table: { category: 'story' },
		},
		hiddenLabel: {
			description: 'Masque visuellement le libellé (bouton icône seule), qui reste restitué par le lecteur d’écran.',
			table: { category: 'story' },
		},
		icon: {
			options: ['weatherStars', 'officePenStar', 'bubbleStars'],
			control: {
				type: 'select',
			},
			description: 'Modifie le glyphe de l’icône IA.',
			table: { category: 'inputs (icon)' },
		},
		altIcon: {
			name: 'alt',
			description: 'Information restituée par le lecteur d’écran pour l’icône.',
			table: { category: 'inputs (icon)' },
		},
	},
	render: ({ label, icon, altIcon, hiddenLabel }) => {
		const text = hiddenLabel && label ? `<span class="pr-u-mask">${label}</span>` : `${label}`;
		return {
			template: `<button type="button" luButton="AI">
	<lu-icon icon="${icon}" alt="${altIcon}" />
	${text}
</button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<{ label: string; icon: string; altIcon: string; hiddenLabel: boolean }> = {
	args: {
		label: 'Reformuler',
		hiddenLabel: false,
		icon: 'officePenStar',
		altIcon: 'Assistant IA',
	},
};
