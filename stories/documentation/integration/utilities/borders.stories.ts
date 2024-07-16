import { Meta, StoryFn } from '@storybook/angular';

interface BorderStory {}

export default {
	title: 'Documentation/Integration/Utilities/Border',
} as Meta;

function getTemplate(args: BorderStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-border0 demo-utility"><code class="code">pr-u-border0</code></div>
	<div class="pr-u-borderBottom0 demo-utility"><code class="code">pr-u-borderBottom0</code></div>
	<div class="pr-u-borderTop0 demo-utility"><code class="code">pr-u-borderTop0</code></div>
	<div class="pr-u-borderRight0 demo-utility"><code class="code">pr-u-borderRight0</code></div>
	<div class="pr-u-borderLeft0 demo-utility"><code class="code">pr-u-borderLeft0</code></div>
	<div class="pr-u-borderInline0 demo-utility"><code class="code">pr-u-borderInline0</code></div>
	<div class="pr-u-borderBlock0 demo-utility"><code class="code">pr-u-borderBlock0</code></div>
</div>`;
}

const Template: StoryFn<BorderStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Border = Template.bind({});
Border.args = {};
