import { Meta, StoryFn } from '@storybook/angular';

interface DisplayStory {}

export default {
	title: 'Documentation/Integration/Utilities/Display',
} as Meta;

function getTemplate(args: DisplayStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="u-displayBlock demo-utility"><code class="code">u-displayBlock</code></div>
	<div class="u-displayFlex demo-utility"><code class="code">u-displayFlex</code></div>
	<div class="u-displayNone demo-utility"><code class="code">u-displayNone</code></div>
	<div class="u-displayInlineBlock demo-utility"><code class="code">u-displayInlineBlock</code></div>
	<div class="u-displayInlineFlex demo-utility"><code class="code">u-displayInlineFlex</code></div>
	<div class="u-displayInline demo-utility"><code class="code">u-displayInline</code></div>
	<div class="u-displayContents demo-utility"><code class="code">u-displayContents</code></div>
</div>`;
}

const Template: StoryFn<DisplayStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Display = Template.bind({});
Display.args = {};
