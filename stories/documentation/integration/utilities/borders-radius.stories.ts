import { Meta, Story } from '@storybook/angular';

interface BorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
} as Meta;

function getTemplate(args: BorderRadiusStory): string {
	return `
	<div class="u-borderTopLeftRadius"><code class="code">.u-borderTopLeftRadius</code></div>
	<div class="u-borderTopRightRadius"><code class="code">.u-borderTopRightRadius</code></div>
	<div class="u-borderBottomLeftRadius"><code class="code">.u-borderBottomLeftRadius</code></div>
	<div class="u-borderBottomRightRadius"><code class="code">.u-borderBottomRightRadius</code></div>
	<div class="u-borderTopLeftRadiusL"><code class="code">.u-borderTopLeftRadiusL</code></div>
	<div class="u-borderTopRightRadiusL"><code class="code">.u-borderTopRightRadiusL</code></div>
	<div class="u-borderBottomLeftRadiusL"><code class="code">.u-borderBottomLeftRadiusL</code></div>
	<div class="u-borderBottomRightRadiusL"><code class="code">.u-borderBottomRightRadiusL</code></div>
	`;
}

const Template: Story<BorderRadiusStory> = (args: BorderRadiusStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		div {
			float: left;
      text-align: center;
      padding: var(--spacings-S);
      border: 1px solid #D6D6D6;
      margin: 0 var(--spacings-S) var(--spacings-S) 0;
		}`,
	],
});

export const BorderRadius = Template.bind({});
BorderRadius.args = {};
