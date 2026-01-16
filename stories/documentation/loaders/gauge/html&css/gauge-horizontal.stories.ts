import { Meta, StoryObj } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	vertical: boolean;
	animated: boolean;
	value: number;
}

export default {
	title: 'Documentation/Loaders/Gauge/HTML&CSS/Horizontal',
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
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valeur en pourcentage.',
		},
	},
} as Meta;

function getTemplate(args: GaugeBasicStory): string {
	const thin = args.thin ? ` mod-thin` : ``;
	const vertical = args.vertical ? ` mod-vertical` : ``;
	const animated = args.animated ? ` is-animated` : ``;
	const palette = args.palette ? ` palette-${args.palette}` : ``;
	const value = args.value !== 0 ? ` [attr.style]="'--components-gauge-value: ${args.value}%'"` : ``;
	return `<div class="gauge${thin}${vertical}${palette}${animated}"${value}></div>`;
}

const Template = (args: GaugeBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
			block-size: 4rem;
		}`,
	],
});

export const Basic: StoryObj<GaugeBasicStory> = {
	args: { palette: '', thin: false, vertical: false, animated: false, value: 33 },
	render: Template,
};
