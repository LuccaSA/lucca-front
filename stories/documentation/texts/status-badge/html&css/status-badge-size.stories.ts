import { Meta, StoryFn } from '@storybook/angular';

interface StatusBadgeSizesStory {}

export default {
	title: 'Documentation/Texts/StatusBadge/HTML & CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(args: StatusBadgeSizesStory): string {
	return `<div class="statusBadge mod-L">Status</div>`;
}

const Template: StoryFn<StatusBadgeSizesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sizes = Template.bind({});
Sizes.args = {};
