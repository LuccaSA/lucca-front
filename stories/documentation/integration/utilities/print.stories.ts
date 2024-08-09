import { Meta, StoryFn } from '@storybook/angular';

interface PrintStory {}

export default {
	title: 'Documentation/Integration/Utilities/Print',
} as Meta;

function getTemplate(args: PrintStory): string {
	return `
<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayNone</code> <span class="u-onlyPrintDisplayNone">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayBlock</code> <span class="u-onlyPrintDisplayBlock">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayFlex</code> <span class="u-onlyPrintDisplayFlex">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayInline</code> <span class="u-onlyPrintDisplayInline">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayInlineBlock</code> <span class="u-onlyPrintDisplayInlineBlock">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayInlineFlex</code> <span class="u-onlyPrintDisplayInlineFlex">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">u-onlyPrintDisplayContents</code> <span class="u-onlyPrintDisplayContents">Lorem ipsum</span></div>
</div>
`;
}

const Template: StoryFn<PrintStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Print = Template.bind({});
Print.args = {};
