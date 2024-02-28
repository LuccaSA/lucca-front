import { Meta, StoryFn } from '@storybook/angular';

interface TagsSizesStory {
}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Sizes',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TagsSizesStory): string {
	return '<span class="tag mod-L">Text</span>';
}

const Template: StoryFn<TagsSizesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sizes = Template.bind({});
Sizes.args = { };
