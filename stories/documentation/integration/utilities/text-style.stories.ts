import { Meta, StoryFn } from '@storybook/angular';

interface TextStyleStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextStyle',
} as Meta;

function getTemplate(args: TextStyleStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">u-fontStyleNormal</code> <span class="u-fontStyleNormal">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-fontStyleItalic</code> <span class="u-fontStyleItalic">Lorem ipsum</span></div>
</div>
<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">u-fontWeight400</code> <span class="u-fontWeight400">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-fontWeight600</code> <span class="u-fontWeight600">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-fontWeight700</code> <span class="u-fontWeight700">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-fontWeight900</code> <span class="u-fontWeight900">Lorem ipsum</span></div>
</div>
<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">u-textDecorationNone</code> <span class="u-textDecorationNone">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-textDecorationUnderline</code> <span class="u-textDecorationUnderline">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-textDecorationLineThrough</code> <span class="u-textDecorationLineThrough">Lorem ipsum</span></div>
</div>`;
}

const Template: StoryFn<TextStyleStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-200);
			display: flex;
			flex-direction: column;
		}
		`,
	],
});

export const TextStyle = Template.bind({});
TextStyle.args = {};
