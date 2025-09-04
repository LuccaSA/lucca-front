import { Meta, StoryFn } from '@storybook/angular';

interface TagsIAStory {}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/IA',
	argTypes: {},
} as Meta;

function getTemplate(args: TagsIAStory): string {
	return '<span class="tag mod-IA">Text</span>';
}

const Template: StoryFn<TagsIAStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const IA = Template.bind({});
IA.args = {};
