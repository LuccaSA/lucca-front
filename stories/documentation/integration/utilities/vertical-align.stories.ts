import { Meta, StoryFn } from '@storybook/angular';

interface VerticalAlignStory {}

export default {
	title: 'Documentation/Integration/Utilities/VerticalAlign',
} as Meta;

function getTemplate(args: VerticalAlignStory): string {
	return `<div class="demo-utility">
		<div class="u-textAlignLeft"><code class="code">u-textAlignLeft</code></div>
	</div>
	<div class="demo-utility">
		<div class="u-textAlignCenter"><code class="code">u-textAlignCenter</code></div>
	</div>
	<div class="demo-utility">
		<div class="u-textAlignRight"><code class="code">u-textAlignRight</code></div>
	</div>`;
}

const Template: StoryFn<VerticalAlignStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-100);
			display: flex;
			flex-direction: column;
		}

		.code {
			display: inline-flex;
		}
		`,
	],
});

export const VerticalAlign = Template.bind({});
VerticalAlign.args = {};
