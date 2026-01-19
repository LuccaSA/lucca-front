import { Meta, StoryObj } from '@storybook/angular';

interface NumericBadgeBasicStory {}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: NumericBadgeBasicStory): string {
	return `<span class="numericBadge">7</span>`;
}

const Template = (args: NumericBadgeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<NumericBadgeBasicStory> = {
	args: {},
	render: Template,
};
