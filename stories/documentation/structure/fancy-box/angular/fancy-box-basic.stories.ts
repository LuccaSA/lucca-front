import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FancyBoxBasicStory {
	backgroundLeft: string;
	backgroundRight: string;
	foreground: string;
	size: string;
}

export default {
	title: 'Documentation/Structure/FancyBox/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FancyBoxComponent],
		}),
	],
	argTypes: {
		backgroundLeft: {
			control: {
				type: 'text',
			},
			description: "URL de l'image en arrière plan à gauche (200x160).",
		},
		backgroundRight: {
			control: {
				type: 'text',
			},
			description: "URL de l'image en arrière plan à droite (200x160).",
		},
		foreground: {
			control: {
				type: 'text',
			},
			description: "URL de l'image au premier plan (200x160).",
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const bgLeft = args.backgroundLeft
		? `
		backgroundLeft="${args.backgroundLeft}"`
		: ``;
	const bgRight = args.backgroundRight
		? `
		backgroundRight="${args.backgroundRight}"`
		: ``;
	const fg = args.foreground
		? `
		foreground="${args.foreground}"`
		: ``;
	const sizeAttr = args.size === 'S' ? ` size="S"` : ``;

	return `
	<lu-fancy-box${sizeAttr}${bgLeft}${bgRight}${fg}>
		Content
	</lu-fancy-box>
	`;
}

const Template = (args: FancyBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: block;
				padding-block: var(--pr-t-spacings-400);
			}
		`,
	],
});

export const Basic: StoryObj<FancyBoxBasicStory> = {
	args: {
		backgroundLeft: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg',
		backgroundRight: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg',
		foreground: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg',
		size: null,
	},
	render: Template,
};
