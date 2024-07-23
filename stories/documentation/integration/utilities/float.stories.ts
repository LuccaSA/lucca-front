import { Meta, StoryFn } from '@storybook/angular';

interface FloatStory {}

export default {
	title: 'Documentation/Integration/Utilities/Float',
} as Meta;

function getTemplate(args: FloatStory): string {
	return `<div>
	<div class="u-floatLeft demo-utility"><code class="code">u-floatLeft</code></div>
	<div class="u-floatRight demo-utility"><code class="code">u-floatRight</code></div>
	<div class="u-clearBoth demo-utility"><code class="code">u-clearBoth</code></div>
</div>
<div>
	<div class="u-clearfix">
		<div class="u-floatLeft demo-utility"><code class="code">u-floatLeft</code></div>
		<div class="u-floatRight demo-utility"><code class="code">u-floatRight</code></div>
	</div>
	<div class="demo-utility"><code class="code">u-clearfix</code></div>
</div>`;
}

const Template: StoryFn<FloatStory> = (args) => ({
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
			margin-bottom: var(--pr-t-spacings-100);
		}
		`,
	],
});

export const Float = Template.bind({});
Float.args = {};
