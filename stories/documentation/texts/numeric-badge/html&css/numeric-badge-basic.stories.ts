import { Meta, Story } from '@storybook/angular';

interface NumericBadgeBasicStory {
	palette: string;
	size: string;
}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: NumericBadgeBasicStory): string {
	return `
		<div class="numericBadge ${args.size} ${args.palette}">7</div>
	`;
}

const Template: Story<NumericBadgeBasicStory> = (args: NumericBadgeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', size: '' };
