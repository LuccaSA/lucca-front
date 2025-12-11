import { Meta, StoryObj } from '@storybook/angular';

interface SizesStory {}

export default {
	title: 'Documentation/Integration/Utilities/Sizes',
} as Meta;

function getTemplate(args: SizesStory): string {
	return `<div>
	<div class="pr-u-widthFitContent demo-utility"><code class="code">pr-u-widthFitContent</code></div>
	<div class="pr-u-width100% demo-utility"><code class="code">pr-u-width100%</code></div>
	<div class="pr-u-minWidth0 demo-utility"><code class="code">pr-u-minWidth0</code></div>
</div>
<div>
	<div class="pr-u-heightFitContent demo-utility"><code class="code">pr-u-heightFitContent</code></div>
	<div class="pr-u-height100% demo-utility"><code class="code">pr-u-height100%</code></div>
	<div class="pr-u-minHeight0 demo-utility"><code class="code">pr-u-minHeight0</code></div>
</div>`;
}

const Template = (args: SizesStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-400);
			display: flex;
			flex-direction: column;

			> div {
				gap: var(--pr-t-spacings-100);
				display: grid;

				&:first-child {
					grid-template-rows: 1fr 1fr 1fr;
				}

				&:last-child {
					grid-template-columns: 1fr 1fr 1fr;
					block-size: 10rem;
				}
			}
		}
		`,
	],
});

export const Sizes: StoryObj<SizesStory> = {
	args: {},
	render: Template,
};
