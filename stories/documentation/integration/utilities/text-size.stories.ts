import { Meta, StoryFn } from '@storybook/angular';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="u-textXS demo-utility"><code class="code">u-textXS</code> Lorem ipsum</div>
	<div class="u-textS demo-utility"><code class="code">u-textS</code> Lorem ipsum</div>
	<div class="u-textM demo-utility"><code class="code">u-textM</code> Lorem ipsum</div>
	<div class="u-textL demo-utility"><code class="code">u-textL</code> Lorem ipsum</div>
	<div class="u-textXL demo-utility"><code class="code">u-textXL</code> Lorem ipsum</div>
	<div class="u-textXXL demo-utility"><code class="code">u-textXXL</code> Lorem ipsum</div>
</div>`;
}

const Template: StoryFn<TextSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const TextSize = Template.bind({});
TextSize.args = {};
