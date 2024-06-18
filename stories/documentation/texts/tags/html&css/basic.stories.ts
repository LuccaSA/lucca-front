import { Meta, StoryFn } from '@storybook/angular';

interface TagsBasicStory {
}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Basic',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TagsBasicStory): string {
	return '<span class="tag">Text</span>';
}

const Template: StoryFn<TagsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { };
