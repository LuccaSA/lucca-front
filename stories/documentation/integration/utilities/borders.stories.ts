import { Meta, Story } from '@storybook/angular';

interface BorderStory {}

export default {
	title: 'Documentation/Integration/Utilities/Border',
} as Meta;

function getTemplate(args: BorderStory): string {
	return `
		<div class="u-border0"><code class="code">u-border0</code></div>
		<div class="u-borderBottomReset"><code class="code">u-borderBottomReset</code></div>
		<div class="u-borderTopReset"><code class="code">u-borderTopReset</code></div>
		<div class="u-borderRightReset"><code class="code">u-borderRightReset</code></div>
		<div class="u-borderLeftReset"><code class="code">u-borderLeftReset</code></div>
	`;
}

const Template: Story<BorderStory> = (args: BorderStory) => ({
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

export const Border = Template.bind({});
Border.args = {};
