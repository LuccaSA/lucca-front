import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/StatusBadge/HTML & CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="statusBadge mod-L">Status</div>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Sizes = Template.bind({});
