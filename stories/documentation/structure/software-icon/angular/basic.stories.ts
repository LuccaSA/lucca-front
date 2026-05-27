import { SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Basic',
	argTypes: {
		icon: {
			options: SoftwareIconList,
			control: {
				type: 'select',
			},
			description: 'Modifie l’icône produit.',
		},
		size: {
			options: ['XXS', 'XS', 'S', '', 'L'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		disabled: {
			description: 'Marque le produit comme inactif.',
		},
		iconAlt: {
			description: 'Texte alternatif de l’illustration restitué par les lecteurs d’écran.',
		},
		withTooltip: {
			description: 'Ajoute une info-bulle qui reprend l’alternative textuelle de l’icône. (Ce paramètre est automatiquement activé quand l’icône est dans son wrapper.)',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconComponent],
		}),
	],
	render: ({ disabled, size, withTooltip, ...args }, { argTypes }) => {
		const disabledArg = disabled ? ` disabled` : ``;
		const sizeArg = size !== '' ? ` size="${size}"` : ``;
		const tooltipArg = withTooltip ? ` withTooltip` : ``;
		return {
			template: `<lu-software-icon${tooltipArg}${sizeArg}${disabledArg}${generateInputs(args, argTypes)} />`,
		};
	},
} as Meta;

export const Basic: StoryObj<SoftwareIconComponent> = {
	args: {
		icon: 'absences',
		disabled: false,
		size: '',
		iconAlt: 'Absences',
		withTooltip: false,
	},
};
