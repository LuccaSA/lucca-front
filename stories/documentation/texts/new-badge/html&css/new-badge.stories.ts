import { Meta, StoryObj } from '@storybook/angular';

interface NewBadgeBasicStory {}

export default {
	title: 'Documentation/Texts/NewBadge/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: NewBadgeBasicStory): string {
	return `<span class="newBadge">New</span>`;
}

const Template = (args: NewBadgeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<NewBadgeBasicStory> = {
	args: {},
	render: Template,
};
