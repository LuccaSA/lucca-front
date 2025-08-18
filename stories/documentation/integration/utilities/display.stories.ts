import { Meta, StoryFn } from '@storybook/angular';

interface DisplayStory {}

export default {
	title: 'Documentation/Integration/Utilities/Display',
} as Meta;

function getTemplate(args: DisplayStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-displayBlock demo-utility"><code class="code">pr-u-displayBlock</code></div>
	<div class="pr-u-displayFlex demo-utility"><code class="code">pr-u-displayFlex</code></div>
	<div class="pr-u-displayGrid demo-utility"><code class="code">pr-u-displayGrid</code></div>
	<div class="pr-u-displayNone demo-utility"><code class="code">pr-u-displayNone</code></div>
	<div class="pr-u-displayInlineBlock demo-utility"><code class="code">pr-u-displayInlineBlock</code></div>
	<div class="pr-u-displayInlineFlex demo-utility"><code class="code">pr-u-displayInlineFlex</code></div>
	<div class="pr-u-displayInlineGrid demo-utility"><code class="code">pr-u-displayInlineGrid</code></div>
	<div class="pr-u-displayInline demo-utility"><code class="code">pr-u-displayInline</code></div>
	<div class="pr-u-displayContents demo-utility"><code class="code">pr-u-displayContents</code></div>
</div>`;
}

const Template: StoryFn<DisplayStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Display = Template.bind({});
Display.args = {};
