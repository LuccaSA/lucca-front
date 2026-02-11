import { GaugeComponent } from '@lucca-front/ng/gauge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Loaders/Gauge/Angular/Basic',
	argTypes: {
		palette: {
			options: ['', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs à la jauge.',
		},
		thin: {
			description: "Diminue l'épaisseur de la jauge.",
		},
		animated: {
			description: 'Ajoute une animation au chargement ou lorsque la valeur est modifiée.',
		},
		circular: {
			description: 'Affiche la jauge sous une forme circulaire.',
		},
		size: {
			control: { type: 'range', min: 32, max: 160, step: 8 },
			if: { arg: 'circular', truthy: true },
			description: 'Taille du composant pour sa forme circulaire.',
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valeur en pourcentage.',
		},
		alt: {
			description: "Information restituée par le lecteur d'écran.",
		},
		noAlt: {
			description: "Empêche la restitution par le lecteur d'écran. À n'utiliser que si l'information est déjà présente.",
		},
	},
	decorators: [
		moduleMetadata({
			imports: [GaugeComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const { alt, value, palette, ...inputs } = args;
		const alternative = alt ? ` alt="${alt}"` : ``;
		const val = value ? ` value="${value}"` : ``;
		const pal = palette ? ` palette="${palette}"` : ``;

		return {
			template: `<lu-gauge${generateInputs(inputs, argTypes)}${alternative}${val}${pal} />`,
		};
	},
} as Meta;

export const Basic: StoryObj<GaugeComponent> = {
	args: {
		value: 33,
		circular: false,
		size: 40,
		alt: '',
		noAlt: false,
		animated: false,
		thin: false,
	},
};
