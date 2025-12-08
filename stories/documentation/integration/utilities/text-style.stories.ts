import { Meta, StoryFn } from '@storybook/angular';

interface TextStyleStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextStyle',
} as Meta;

function getTemplate(args: TextStyleStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">pr-u-fontStyleNormal</code> <span class="pr-u-fontStyleNormal">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-fontStyleItalic</code> <span class="pr-u-fontStyleItalic">Lorem ipsum</span></div>
</div>
<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">pr-u-fontWeight400</code> <span class="pr-u-fontWeight400">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-fontWeight600</code> <span class="pr-u-fontWeight600">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-fontWeight700</code> <span class="pr-u-fontWeight700">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-fontWeight900</code> <span class="pr-u-fontWeight900">Lorem ipsum</span></div>
</div>
<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">pr-u-textDecorationNone</code> <span class="pr-u-textDecorationNone">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-textDecorationUnderline</code> <span class="pr-u-textDecorationUnderline">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-textDecorationLineThrough</code> <span class="pr-u-textDecorationLineThrough">Lorem ipsum</span></div>
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
