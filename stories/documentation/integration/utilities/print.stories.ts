import { Meta, StoryObj } from '@storybook/angular';

interface PrintStory {}

export default {
	title: 'Documentation/Integration/Utilities/Print',
} as Meta;

function getTemplate(args: PrintStory): string {
	return `
<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayNone</code> <span class="pr-u-onlyPrintDisplayNone">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayBlock</code> <span class="pr-u-onlyPrintDisplayBlock">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayFlex</code> <span class="pr-u-onlyPrintDisplayFlex">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayGrid</code> <span class="pr-u-onlyPrintDisplayGrid">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayInline</code> <span class="pr-u-onlyPrintDisplayInline">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayInlineBlock</code> <span class="pr-u-onlyPrintDisplayInlineBlock">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayInlineFlex</code> <span class="pr-u-onlyPrintDisplayInlineFlex">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayInlineGrid</code> <span class="pr-u-onlyPrintDisplayInlineGrid">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-onlyPrintDisplayContents</code> <span class="pr-u-onlyPrintDisplayContents">Lorem ipsum</span></div>
</div>
`;
}

const Template = (args: PrintStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Print: StoryObj<PrintStory> = {
	args: {},
	render: Template,
};
