import { Meta, StoryFn } from '@storybook/angular';

interface BorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
} as Meta;

function getTemplate(args: BorderRadiusStory): string {
	return `
<div>
	<div class="u-borderRadiusM"><code class="code">.u-borderRadiusM</code></div>
	<div class="u-borderTopLeftRadiusM"><code class="code">.u-borderTopLeftRadiusM</code></div>
	<div class="u-borderTopRightRadiusM"><code class="code">.u-borderTopRightRadiusM</code></div>
	<div class="u-borderBottomLeftRadiusM"><code class="code">.u-borderBottomLeftRadiusM</code></div>
	<div class="u-borderBottomRightRadiusM"><code class="code">.u-borderBottomRightRadiusM</code></div>
</div>
<div>
	<div class="u-borderRadiusL"><code class="code">.u-borderRadiusL</code></div>
	<div class="u-borderTopLeftRadiusL"><code class="code">.u-borderTopLeftRadiusL</code></div>
	<div class="u-borderTopRightRadiusL"><code class="code">.u-borderTopRightRadiusL</code></div>
	<div class="u-borderBottomLeftRadiusL"><code class="code">.u-borderBottomLeftRadiusL</code></div>
	<div class="u-borderBottomRightRadiusL"><code class="code">.u-borderBottomRightRadiusL</code></div>
</div>
<div>
	<div class="u-borderRadiusXL"><code class="code">.u-borderRadiusXL</code></div>
	<div class="u-borderTopLeftRadiusXL"><code class="code">.u-borderTopLeftRadiusXL</code></div>
	<div class="u-borderTopRightRadiusXL"><code class="code">.u-borderTopRightRadiusXL</code></div>
	<div class="u-borderBottomLeftRadiusXL"><code class="code">.u-borderBottomLeftRadiusXL</code></div>
	<div class="u-borderBottomRightRadiusXL"><code class="code">.u-borderBottomRightRadiusXL</code></div>
</div>
<div>
	<div class="u-borderRadiusFull"><code class="code">.u-borderRadiusFull</code></div>
	<div class="u-borderTopLeftRadiusFull"><code class="code">.u-borderTopLeftRadiusFull</code></div>
	<div class="u-borderTopRightRadiusFull"><code class="code">.u-borderTopRightRadiusFull</code></div>
	<div class="u-borderBottomLeftRadiusFull"><code class="code">.u-borderBottomLeftRadiusFull</code></div>
	<div class="u-borderBottomRightRadiusFull"><code class="code">.u-borderBottomRightRadiusFull</code></div>
</div>
`;
}

const Template: StoryFn<BorderRadiusStory> = (args) => ({
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

export const BorderRadius = Template.bind({});
BorderRadius.args = {};
