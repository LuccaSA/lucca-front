import { Meta, StoryFn } from '@storybook/angular';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-bodyM demo-utility"><code class="code">pr-u-bodyM</code> Lorem ipsum</div>
	<div class="pr-u-bodyS demo-utility"><code class="code">pr-u-bodyS</code> Lorem ipsum</div>
	<div class="pr-u-bodyXS demo-utility"><code class="code">pr-u-bodyXS</code> Lorem ipsum</div>
</div>`;
}

const Template: StoryFn<TextSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const TextSize = Template.bind({});
TextSize.args = {};
