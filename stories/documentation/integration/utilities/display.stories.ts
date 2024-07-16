import { Meta, StoryFn } from '@storybook/angular';

interface DisplayStory {}

export default {
	title: 'Documentation/Integration/Utilities/Display',
} as Meta;

function getTemplate(args: DisplayStory): string {
	return `
<div>
	<div class="u-displayBlock"><code class="code">u-displayBlock</code></div>	
	<div class="u-displayFlex"><code class="code">u-displayFlex</code></div>	
	<div class="u-displayNone"><code class="code">u-displayNone</code></div>
	<div class="u-displayInline"><code class="code">u-displayInline</code></div>
	<div class="u-displayInlineBlock"><code class="code">u-displayInlineBlock</code></div>	
	<div class="u-displayInlineFlex"><code class="code">u-displayInlineFlex</code></div>
	<div class="u-displayContents"><code class="code">u-displayContents</code></div>
</div>
`;
}

const Template: StoryFn<DisplayStory> = (args) => ({
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

export const Display = Template.bind({});
Display.args = {};
