import { Meta, StoryObj } from '@storybook/angular-vite';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-h1 demo-utility"><code class="code">pr-u-h1</code> Lorem ipsum</div>
	<div class="pr-u-h2 demo-utility"><code class="code">pr-u-h2</code> Lorem ipsum</div>
	<div class="pr-u-h3 demo-utility"><code class="code">pr-u-h3</code> Lorem ipsum</div>
	<div class="pr-u-h4 demo-utility"><code class="code">pr-u-h4</code> Lorem ipsum</div>
	<div class="pr-u-bodyM demo-utility"><code class="code">pr-u-bodyM</code> Lorem ipsum</div>
	<div class="pr-u-bodyS demo-utility"><code class="code">pr-u-bodyS</code> Lorem ipsum</div>
	<div class="pr-u-bodyXS demo-utility"><code class="code">pr-u-bodyXS</code> Lorem ipsum</div>
</div>`;
}

const Template = (args: TextSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const TextSize: StoryObj<TextSizeStory> = {
	args: {},
	render: Template,
};
