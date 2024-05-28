import { Meta, StoryFn } from '@storybook/angular';

interface TagsIconStory {
}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Icon',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TagsIconStory): string {
	return `<span class="tag">
	<span class="lucca-icon icon-heart" aria-hidden="true"></span> <span class="tag-content">Text</span>
</span>`;
}

const Template: StoryFn<TagsIconStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon = Template.bind({});
Icon.args = { };
