import { Meta, StoryFn } from '@storybook/angular';

interface PrintStory {}

export default {
	title: 'Documentation/Integration/Utilities/Print',
} as Meta;

function getTemplate(args: PrintStory): string {
	return `
<div>
	<div><code class="code">u-onlyPrintDisplayNone</code> <span class="u-onlyPrintDisplayNone">Lorem ipsum</span></div>	
	<div><code class="code">u-onlyPrintDisplayBlock</code> <span class="u-onlyPrintDisplayBlock">Lorem ipsum</span></div>	
	<div><code class="code">u-onlyPrintDisplayFlex</code> <span class="u-onlyPrintDisplayFlex">Lorem ipsum</span></div>	
	<div><code class="code">u-onlyPrintDisplayInline</code> <span class="u-onlyPrintDisplayInline">Lorem ipsum</span></div>	
	<div><code class="code">u-onlyPrintDisplayInlineBlock</code> <span class="u-onlyPrintDisplayInlineBlock">Lorem ipsum</span></div>
	<div><code class="code">u-onlyPrintDisplayInlineFlex</code> <span class="u-onlyPrintDisplayInlineFlex">Lorem ipsum</span></div>
	<div><code class="code">u-onlyPrintDisplayContents</code> <span class="u-onlyPrintDisplayContents">Lorem ipsum</span></div>
</div>
`;
}

const Template: StoryFn<PrintStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-500);
			display: flex;
			flex-direction: column;

			> div {
				display: flex;
				gap: var(--pr-t-spacings-100);
				flex-wrap: wrap; 
				align-items: flex-start;

				> div { 	
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const Print = Template.bind({});
Print.args = {};
