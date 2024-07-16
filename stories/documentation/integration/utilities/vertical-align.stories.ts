import { Meta, StoryFn } from '@storybook/angular';

interface VerticalAlignStory {}

export default {
	title: 'Documentation/Integration/Utilities/VerticalAlign',
} as Meta;

function getTemplate(args: VerticalAlignStory): string {
	return `
<div>
	<div>
		<div class="u-textAlignLeft"><code class="code">u-textAlignLeft</code></div>
	</div>
	<div>
		<div class="u-textAlignCenter"><code class="code">u-textAlignCenter</code></div>
	</div>
	<div>
		<div class="u-textAlignRight"><code class="code">u-textAlignRight</code></div>
	</div>
</div>`;
}

const Template: StoryFn<VerticalAlignStory> = (args) => ({
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
				flex-direction: column;

				> div { 	
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const VerticalAlign = Template.bind({});
VerticalAlign.args = {};
