import { Meta, StoryFn } from '@storybook/angular';

interface TagsAIStory {}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/AI',
	argTypes: {},
} as Meta;

function getTemplate(args: TagsAIStory): string {
	return '<span class="tag mod-AI">Text</span>';
}

const Template: StoryFn<TagsAIStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const AI = Template.bind({});
AI.args = {};
