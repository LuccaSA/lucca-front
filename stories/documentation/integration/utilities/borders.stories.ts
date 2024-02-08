import { Meta, StoryFn } from '@storybook/angular';

interface BorderStory {}

export default {
	title: 'Documentation/Integration/Utilities/Border',
} as Meta;

function getTemplate(args: BorderStory): string {
	return `
		<div class="pr-u-border0"><code class="code">pr-u-border0</code></div>
		<div class="pr-u-borderBottom0"><code class="code">pr-u-borderBottom0</code></div>
		<div class="pr-u-borderTop0"><code class="code">pr-u-borderTop0</code></div>
		<div class="pr-u-borderRight0"><code class="code">pr-u-borderRight0</code></div>
		<div class="pr-u-borderLeft0"><code class="code">pr-u-borderLeft0</code></div>
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
			padding: var(--pr-t-spacings-M);
			border: 1px solid #D6D6D6;
			margin: 0 var(--pr-t-spacings-M) var(--pr-t-spacings-M) 0;
		}`,
	],
});

export const Border = Template.bind({});
Border.args = {};
