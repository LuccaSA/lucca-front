import { Meta, StoryFn } from '@storybook/angular';

interface BorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
} as Meta;

function getTemplate(args: BorderRadiusStory): string {
	return `<div class="u-borderRadiusM"><code class="code">.u-borderRadiusM</code></div>
<div class="u-borderTopLeftRadiusM"><code class="code">.u-borderTopLeftRadiusM</code></div>
<div class="u-borderTopRightRadiusM"><code class="code">.u-borderTopRightRadiusM</code></div>
<div class="u-borderBottomLeftRadiusM"><code class="code">.u-borderBottomLeftRadiusM</code></div>
<div class="u-borderBottomRightRadiusM"><code class="code">.u-borderBottomRightRadiusM</code></div>
<div class="u-borderRadiusL"><code class="code">.u-borderRadiusL</code></div>
<div class="u-borderTopLeftRadiusL"><code class="code">.u-borderTopLeftRadiusL</code></div>
<div class="u-borderTopRightRadiusL"><code class="code">.u-borderTopRightRadiusL</code></div>
<div class="u-borderBottomLeftRadiusL"><code class="code">.u-borderBottomLeftRadiusL</code></div>
<div class="u-borderBottomRightRadiusL"><code class="code">.u-borderBottomRightRadiusL</code></div>`;
}

const Template: StoryFn<BorderRadiusStory> = (args: BorderRadiusStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		div {
			background-color: var(--colors-white-color);
			float: left;
      text-align: center;
      padding: var(--spacings-S);
      border: 1px solid var(--palettes-grey-200);
      margin: 0 var(--spacings-S) var(--spacings-S) 0;
		}`,
	],
});

export const BorderRadius = Template.bind({});
BorderRadius.args = {};
