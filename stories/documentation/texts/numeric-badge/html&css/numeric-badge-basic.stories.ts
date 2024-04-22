import { Meta, StoryFn } from '@storybook/angular';

interface NumericBadgeBasicStory {
	palette: string;
	size: string;
}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-product'],
			control: {
				type: 'radio',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

function getTemplate(args: NumericBadgeBasicStory): string {
	const size = args.size ? ' ' + args.size : '';
	const palette = args.palette ? ' ' + args.palette : '';
	return `<span class="numericBadge${size}${palette}">7</span>`;
}

const Template: StoryFn<NumericBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', size: '' };
