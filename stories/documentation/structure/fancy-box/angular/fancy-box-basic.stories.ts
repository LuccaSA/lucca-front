import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FancyBoxBasicStory {
	content: string;
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
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
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
		<div>${args.content}</div>
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
		size: null,
	},
	render: Template,
};
