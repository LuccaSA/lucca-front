import { Meta, StoryFn } from '@storybook/angular';

interface NumericBadgeBasicStory {}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: NumericBadgeBasicStory): string {
	return `<span class="numericBadge">7</span>`;
}

const Template: StoryFn<NumericBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
