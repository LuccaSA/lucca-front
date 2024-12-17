import { Meta, StoryFn } from '@storybook/angular';

interface StatusBadgeBasicStory {}

export default {
	title: 'Documentation/Texts/StatusBadge/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: StatusBadgeBasicStory): string {
	return `<div class="statusBadge">Status</div>`;
}

const Template: StoryFn<StatusBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
