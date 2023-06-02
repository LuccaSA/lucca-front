import { Meta, StoryFn } from '@storybook/angular';

interface VerticalAlignStory {}

export default {
	title: 'Documentation/Integration/Utilities/VerticalAlign',
} as Meta;

function getTemplate(args: VerticalAlignStory): string {
	return `
		<div class="u-textLeft"><code class="code">u-textLeft</code></div>
		<div class="u-textCenter"><code class="code">u-textCenter</code></div>
		<div class="u-textRight"><code class="code">u-textRight</code></div>
	`;
}

const Template: StoryFn<VerticalAlignStory> = (args: VerticalAlignStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		}`,
	],
});

export const VerticalAlign = Template.bind({});
VerticalAlign.args = {};
