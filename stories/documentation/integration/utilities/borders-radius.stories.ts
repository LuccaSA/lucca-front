import { Meta, StoryObj } from '@storybook/angular';

interface BorderRadiusStory {}

export default {
	title: 'Documentation/Integration/Utilities/BorderRadius',
} as Meta;

function getTemplate(args: BorderRadiusStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-borderRadiusStructure demo-utility"><code class="code">.pr-u-borderRadiusStructure</code></div>
	<div class="pr-u-borderRadiusDefault demo-utility"><code class="code">.pr-u-borderRadiusDefault</code></div>
	<div class="pr-u-borderRadiusSmall demo-utility"><code class="code">.pr-u-borderRadiusSmall</code></div>
	<div class="pr-u-borderRadiusInput demo-utility"><code class="code">.pr-u-borderRadiusInput</code></div>
	<div class="pr-u-borderRadiusFull demo-utility"><code class="code">.pr-u-borderRadiusFull</code></div>
</div>`;
}

const Template = (args: BorderRadiusStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-400);
			display: flex;
			flex-direction: column;
		}
		`,
	],
});

export const BorderRadius: StoryObj<BorderRadiusStory> = {
	args: {},
	render: Template,
};
