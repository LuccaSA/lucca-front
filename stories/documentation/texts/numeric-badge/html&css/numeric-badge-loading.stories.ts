import { Meta, StoryFn } from '@storybook/angular';

interface NumericBadgeLoadingStory {}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Loading',
	argTypes: {},
} as Meta;

function getTemplate(args: NumericBadgeLoadingStory): string {
	return `<span class="numericBadge is-loading" aria-hidden="true">7</span>`;
}

const Template: StoryFn<NumericBadgeLoadingStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Loading = Template.bind({});
Loading.args = {};
