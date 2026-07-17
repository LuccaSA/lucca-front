import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/StatusBadge/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="statusBadge">Status</div>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
