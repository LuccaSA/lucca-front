import { Meta, StoryFn } from '@storybook/angular';

interface TagsClickableStory {
}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Clickable',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TagsClickableStory): string {
	return '<a href="#" class="tag">Text</a>';
}

const Template: StoryFn<TagsClickableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Clickable = Template.bind({});
Clickable.args = { };
