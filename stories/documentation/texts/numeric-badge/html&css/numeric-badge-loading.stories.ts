import { Meta, StoryObj } from '@storybook/angular';

interface NumericBadgeLoadingStory {}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Loading',
	argTypes: {},
} as Meta;

function getTemplate(args: NumericBadgeLoadingStory): string {
	return `<span class="numericBadge is-loading" aria-hidden="true">7</span>`;
}

const Template = (args: NumericBadgeLoadingStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Loading: StoryObj<NumericBadgeLoadingStory> = {
	args: {},
	render: Template,
};
