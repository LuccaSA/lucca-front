import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/StatusBadge/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="statusBadge">Status</div>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Basic = Template.bind({});
