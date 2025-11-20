import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/AI',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return '<span class="tag mod-AI">Text</span>';
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const AI = Template.bind({});
