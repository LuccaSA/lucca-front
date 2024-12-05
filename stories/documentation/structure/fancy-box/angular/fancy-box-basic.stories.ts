import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
		},
		backgroundRight: {
			control: {
				type: 'text',
			},
		},
		foreground: {
			control: {
				type: 'text',
			},
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

const Template: StoryFn<FancyBoxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	content: 'Lorem ipsum dolor sit amet.<br />Lorem ipsum dolor sit amet.<br />Lorem ipsum dolor sit amet.<br />Lorem ipsum dolor sit amet.',
	backgroundLeft: '',
	backgroundRight: '',
	foreground: '',
};
