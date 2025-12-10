import { Meta, StoryObj } from '@storybook/angular';

interface FloatStory {}

export default {
	title: 'Documentation/Integration/Utilities/Float',
} as Meta;

function getTemplate(args: FloatStory): string {
	return `<div>
	<div class="pr-u-floatInlineStart demo-utility"><code class="code">pr-u-floatInlineStart</code></div>
	<div class="pr-u-floatInlineEnd demo-utility"><code class="code">pr-u-floatInlineEnd</code></div>
	<div class="pr-u-clearBoth demo-utility"><code class="code">pr-u-clearBoth</code></div>
</div>
<div>
	<div class="pr-u-clearfix">
		<div class="pr-u-floatInlineStart demo-utility"><code class="code">pr-u-floatInlineStart</code></div>
		<div class="pr-u-floatInlineEnd demo-utility"><code class="code">pr-u-floatInlineEnd</code></div>
	</div>
	<div class="demo-utility"><code class="code">pr-u-clearfix</code></div>
</div>`;
}

const Template = (args: FloatStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-400);
			display: flex;
			flex-direction: column;
		}

		.demo-utility {
			margin-block-end: var(--pr-t-spacings-100);
		}
		`,
	],
});

export const Float: StoryObj<FloatStory> = {
	args: {},
	render: Template,
};
