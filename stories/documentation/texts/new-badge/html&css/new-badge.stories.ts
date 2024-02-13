import { Meta, StoryFn } from '@storybook/angular';

interface NewBadgeBasicStory {}

export default {
	title: 'Documentation/Texts/NewBadge/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: NewBadgeBasicStory): string {
	return `<span class="newBadge">New</span>`;
}

const Template: StoryFn<NewBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
