import { Meta, StoryFn } from '@storybook/angular';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `
<div>
	<div class="u-textXS"><code class="code">u-textXS</code> Lorem ipsum</div>
	<div class="u-textS"><code class="code">u-textS</code> Lorem ipsum</div>
	<div class="u-textM"><code class="code">u-textM</code> Lorem ipsum</div>
	<div class="u-textL"><code class="code">u-textL</code> Lorem ipsum</div>
	<div class="u-textXL"><code class="code">u-textXL</code> Lorem ipsum</div>
	<div class="u-textXXL"><code class="code">u-textXXL</code> Lorem ipsum</div>
</div>
`;
}

const Template: StoryFn<TextSizeStory> = (args) => ({
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
				align-items: baseline;

				> div { 	
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const TextSize = Template.bind({});
TextSize.args = {};
