import { Meta, StoryFn } from '@storybook/angular';

interface CommaStory {}

export default {
	title: 'Documentation/Integration/Utilities/Comma',
} as Meta;

function getTemplate(args: CommaStory): string {
	return `<span class="u-comma">Élément</span><span class="u-comma">élément</span><span class="u-comma">élément</span><span class="u-comma">élément</span>`;
}

const Template: StoryFn<CommaStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Comma = Template.bind({});
Comma.args = {};
