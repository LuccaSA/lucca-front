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
	<div class="u-borderTopLeftRadiusBig"><code class="code">.u-borderTopLeftRadiusBig</code></div>
	<div class="u-borderTopRightRadiusBig"><code class="code">.u-borderTopRightRadiusBig</code></div>
	<div class="u-borderBottomLeftRadiusBig"><code class="code">.u-borderBottomLeftRadiusBig</code></div>
	<div class="u-borderBottomRightRadiusBig"><code class="code">.u-borderBottomRightRadiusBig</code></div>
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
      padding: var(--spacings-small);
      border: 1px solid #D6D6D6;
      margin: 0 var(--spacings-small) var(--spacings-small) 0;
		}`,
	],
});

export const BorderRadius = Template.bind({});
BorderRadius.args = {};
