import { Meta, StoryFn } from '@storybook/angular';

interface TagsOutlinedStory {
}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Outlined',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TagsOutlinedStory): string {
	return '<span class="tag mod-outlined">Text</span>';
}

const Template: StoryFn<TagsOutlinedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Outlined = Template.bind({});
Outlined.args = { };
