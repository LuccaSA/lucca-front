import { Meta, StoryFn } from '@storybook/angular';

interface BorderStory {}

export default {
	title: 'Documentation/Integration/Utilities/Border',
} as Meta;

function getTemplate(args: BorderStory): string {
	return `
		<div class="u-border0"><code class="code">u-border0</code></div>
		<div class="u-borderBottom0"><code class="code">u-borderBottom0</code></div>
		<div class="u-borderTop0"><code class="code">u-borderTop0</code></div>
		<div class="u-borderRight0"><code class="code">u-borderRight0</code></div>
		<div class="u-borderLeft0"><code class="code">u-borderLeft0</code></div>
	`;
}

const Template: StoryFn<BorderStory> = (args: BorderStory) => ({
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
