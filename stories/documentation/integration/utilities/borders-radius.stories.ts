import { Meta, StoryFn } from '@storybook/angular';

interface BorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
} as Meta;

function getTemplate(args: BorderRadiusStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="u-borderRadiusM demo-utility"><code class="code">.u-borderRadiusM</code></div>
	<div class="u-borderTopLeftRadiusM demo-utility"><code class="code">.u-borderTopLeftRadiusM</code></div>
	<div class="u-borderTopRightRadiusM demo-utility"><code class="code">.u-borderTopRightRadiusM</code></div>
	<div class="u-borderBottomLeftRadiusM demo-utility"><code class="code">.u-borderBottomLeftRadiusM</code></div>
	<div class="u-borderBottomRightRadiusM demo-utility"><code class="code">.u-borderBottomRightRadiusM</code></div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-borderRadiusL demo-utility"><code class="code">.u-borderRadiusL</code></div>
	<div class="u-borderTopLeftRadiusL demo-utility"><code class="code">.u-borderTopLeftRadiusL</code></div>
	<div class="u-borderTopRightRadiusL demo-utility"><code class="code">.u-borderTopRightRadiusL</code></div>
	<div class="u-borderBottomLeftRadiusL demo-utility"><code class="code">.u-borderBottomLeftRadiusL</code></div>
	<div class="u-borderBottomRightRadiusL demo-utility"><code class="code">.u-borderBottomRightRadiusL</code></div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-borderRadiusXL demo-utility"><code class="code">.u-borderRadiusXL</code></div>
	<div class="u-borderTopLeftRadiusXL demo-utility"><code class="code">.u-borderTopLeftRadiusXL</code></div>
	<div class="u-borderTopRightRadiusXL demo-utility"><code class="code">.u-borderTopRightRadiusXL</code></div>
	<div class="u-borderBottomLeftRadiusXL demo-utility"><code class="code">.u-borderBottomLeftRadiusXL</code></div>
	<div class="u-borderBottomRightRadiusXL demo-utility"><code class="code">.u-borderBottomRightRadiusXL</code></div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-borderRadiusFull demo-utility"><code class="code">.u-borderRadiusFull</code></div>
	<div class="u-borderTopLeftRadiusFull demo-utility"><code class="code">.u-borderTopLeftRadiusFull</code></div>
	<div class="u-borderTopRightRadiusFull demo-utility"><code class="code">.u-borderTopRightRadiusFull</code></div>
	<div class="u-borderBottomLeftRadiusFull demo-utility"><code class="code">.u-borderBottomLeftRadiusFull</code></div>
	<div class="u-borderBottomRightRadiusFull demo-utility"><code class="code">.u-borderBottomRightRadiusFull</code></div>
</div>`;
}

const Template: StoryFn<BorderRadiusStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-400);
			display: flex;
			flex-direction: column;
		}
		`,
	],
});

export const BorderRadius = Template.bind({});
BorderRadius.args = {};
