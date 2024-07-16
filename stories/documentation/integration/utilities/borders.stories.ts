import { Meta, StoryFn } from '@storybook/angular';

interface BorderStory {}

export default {
	title: 'Documentation/Integration/Utilities/Border',
} as Meta;

function getTemplate(args: BorderStory): string {
	return `
<div>
	<div class="pr-u-border0"><code class="code">pr-u-border0</code></div>
	<div class="pr-u-borderBottom0"><code class="code">pr-u-borderBottom0</code></div>
	<div class="pr-u-borderTop0"><code class="code">pr-u-borderTop0</code></div>
	<div class="pr-u-borderRight0"><code class="code">pr-u-borderRight0</code></div>
	<div class="pr-u-borderLeft0"><code class="code">pr-u-borderLeft0</code></div>
	<div class="pr-u-borderInline0"><code class="code">pr-u-borderInline0</code></div>
	<div class="pr-u-borderBlock0"><code class="code">pr-u-borderBlock0</code></div>
</div>
	`;
}

const Template: StoryFn<BorderStory> = (args) => ({
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

export const Border = Template.bind({});
Border.args = {};
