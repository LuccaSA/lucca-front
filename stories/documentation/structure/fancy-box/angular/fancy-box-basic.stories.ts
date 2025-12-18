import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FancyBoxBasicStory {
	content: string;
	backgroundLeft: string;
	backgroundRight: string;
	foreground: string;
}

export default {
	title: 'Documentation/Structure/FancyBox/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FancyBoxComponent],
		}),
	],
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
		backgroundLeft: {
			control: {
				type: 'text',
			},
			description: 'URL',
		},
		backgroundRight: {
			control: {
				type: 'text',
			},
			description: 'URL',
		},
		foreground: {
			control: {
				type: 'text',
			},
			description: 'URL',
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const bgLeft = args.backgroundLeft ? `backgroundLeft="${args.backgroundLeft}"` : ``;
	const bgRight = args.backgroundRight ? `backgroundRight="${args.backgroundRight}"` : ``;
	const fg = args.foreground ? `foreground="${args.foreground}"` : ``;

	return `
	<lu-fancy-box ${bgLeft} ${bgRight} ${fg}>
		${args.content}
	</lu-fancy-box>
	`;
}

const Template = (args: FancyBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FancyBoxBasicStory> = {
	args: {
		content: 'Fancy box content',
		backgroundLeft: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg',
		backgroundRight: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg',
		foreground: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg',
	},
	render: Template,
};
