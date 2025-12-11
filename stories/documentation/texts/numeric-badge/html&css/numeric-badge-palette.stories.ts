import { Meta, StoryObj } from '@storybook/angular';

interface NumericBadgeLoadingStory {}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Palettes',
	argTypes: {},
} as Meta;

function getTemplate(args: NumericBadgeLoadingStory): string {
	return `<span class="numericBadge palette-product">7</span>`;
}

const Template = (args: NumericBadgeLoadingStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Loading: StoryObj<NumericBadgeLoadingStory> = {
	args: {},
	render: Template,
};
