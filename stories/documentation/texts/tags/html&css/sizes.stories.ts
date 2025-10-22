import { Meta, StoryFn } from '@storybook/angular';

interface TagsSizesStory {}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(args: TagsSizesStory): string {
	return `<span class="tag mod-L">Text</span>
<span class="tag mod-M">Text</span>
<!-- 20.3 --><span class="tag mod-S">Text</span>`;
}

const Template: StoryFn<TagsSizesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-50);
			align-items: center;
		}`,
	],
});

export const Sizes = Template.bind({});
Sizes.args = {};
