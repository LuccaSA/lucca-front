import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/StatusBadge/HTML&CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="statusBadge mod-L">Status</div>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Sizes: StoryObj = {
	args: {},
	render: Template,
};
