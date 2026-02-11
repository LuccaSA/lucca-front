import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Basic',
} as Meta;

function getTemplate(): string {
	return '<span class="tag">Text</span>';
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
