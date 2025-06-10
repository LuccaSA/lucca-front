import { Meta, StoryFn } from '@storybook/angular';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="u-bodyM demo-utility"><code class="code">u-bodyM</code> Lorem ipsum</div>
	<div class="u-bodyS demo-utility"><code class="code">u-bodyS</code> Lorem ipsum</div>
	<div class="u-bodyXS demo-utility"><code class="code">u-bodyXS</code> Lorem ipsum</div>
</div>`;
}

const Template: StoryFn<TextSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const TextSize = Template.bind({});
TextSize.args = {};
