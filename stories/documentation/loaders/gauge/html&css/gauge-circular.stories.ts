import { Meta, StoryObj } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	animated: boolean;
	value: number;
	size: number;
}

export default {
	title: 'Documentation/Loaders/Gauge/HTML&CSS/Circular',
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
		size: {
			control: { type: 'range', min: 32, max: 160, step: 8 },
			description: 'Taille du composant pour sa forme circulaire.',
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valeur en pourcentage.',
		},
	},
} as Meta;

function getTemplate(args: GaugeBasicStory): string {
	const thin = args.thin ? ` mod-thin` : ``;
	const thickness = args.thin ? 4 : 8;
	const palette = args.palette ? ` palette-${args.palette}` : ``;
	const animated = args.animated ? ` is-animated` : ``;
	const value = args.value !== 0 ? ` [attr.style]="'--components-gauge-value: ${args.value}; --components-gauge-circleR: ${(args.size - thickness) / 2}px'"` : ``;
	return `<svg class="gauge${palette}${thin}${animated}" width="${args.size}" height="${args.size}" viewBox="0 0 ${args.size} ${args.size}"${value}>
	<circle class="gauge-circleBackground" cx="${args.size / 2}" cy="${args.size / 2}" r="${(args.size - thickness) / 2}"></circle>
	<circle class="gauge-circleBar" cx="${args.size / 2}" cy="${args.size / 2}" r="${(args.size - thickness) / 2}"></circle>
</svg>
	`;
}

const Template = (args: GaugeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<GaugeBasicStory> = {
	args: { palette: '', thin: false, animated: false, value: 33, size: 40 },
	render: Template,
};
