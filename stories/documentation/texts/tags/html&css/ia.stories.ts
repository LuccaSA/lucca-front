import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/AI',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return '<span class="tag mod-AI">Text</span>';
}

const Template = () => ({
	template: getTemplate(),
});

export const AI: StoryObj = {
	args: {},
	render: Template,
};
