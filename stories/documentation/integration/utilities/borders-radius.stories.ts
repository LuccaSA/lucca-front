import { Meta, StoryFn } from '@storybook/angular';

interface BorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
} as Meta;

function getTemplate(args: BorderRadiusStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-borderRadiusM demo-utility"><code class="code">.pr-u-borderRadiusM</code></div>
	<div class="pr-u-borderTopLeftRadiusM demo-utility"><code class="code">.pr-u-borderTopLeftRadiusM</code></div>
	<div class="pr-u-borderTopRightRadiusM demo-utility"><code class="code">.pr-u-borderTopRightRadiusM</code></div>
	<div class="pr-u-borderBottomLeftRadiusM demo-utility"><code class="code">.pr-u-borderBottomLeftRadiusM</code></div>
	<div class="pr-u-borderBottomRightRadiusM demo-utility"><code class="code">.pr-u-borderBottomRightRadiusM</code></div>
</div>
<div class="demo-utilityWrapper">
	<div class="pr-u-borderRadiusL demo-utility"><code class="code">.pr-u-borderRadiusL</code></div>
	<div class="pr-u-borderTopLeftRadiusL demo-utility"><code class="code">.pr-u-borderTopLeftRadiusL</code></div>
	<div class="pr-u-borderTopRightRadiusL demo-utility"><code class="code">.pr-u-borderTopRightRadiusL</code></div>
	<div class="pr-u-borderBottomLeftRadiusL demo-utility"><code class="code">.pr-u-borderBottomLeftRadiusL</code></div>
	<div class="pr-u-borderBottomRightRadiusL demo-utility"><code class="code">.pr-u-borderBottomRightRadiusL</code></div>
</div>
<div class="demo-utilityWrapper">
	<div class="pr-u-borderRadiusXL demo-utility"><code class="code">.pr-u-borderRadiusXL</code></div>
	<div class="pr-u-borderTopLeftRadiusXL demo-utility"><code class="code">.pr-u-borderTopLeftRadiusXL</code></div>
	<div class="pr-u-borderTopRightRadiusXL demo-utility"><code class="code">.pr-u-borderTopRightRadiusXL</code></div>
	<div class="pr-u-borderBottomLeftRadiusXL demo-utility"><code class="code">.pr-u-borderBottomLeftRadiusXL</code></div>
	<div class="pr-u-borderBottomRightRadiusXL demo-utility"><code class="code">.pr-u-borderBottomRightRadiusXL</code></div>
</div>
<div class="demo-utilityWrapper">
	<div class="pr-u-borderRadiusFull demo-utility"><code class="code">.pr-u-borderRadiusFull</code></div>
	<div class="pr-u-borderTopLeftRadiusFull demo-utility"><code class="code">.pr-u-borderTopLeftRadiusFull</code></div>
	<div class="pr-u-borderTopRightRadiusFull demo-utility"><code class="code">.pr-u-borderTopRightRadiusFull</code></div>
	<div class="pr-u-borderBottomLeftRadiusFull demo-utility"><code class="code">.pr-u-borderBottomLeftRadiusFull</code></div>
	<div class="pr-u-borderBottomRightRadiusFull demo-utility"><code class="code">.pr-u-borderBottomRightRadiusFull</code></div>
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
