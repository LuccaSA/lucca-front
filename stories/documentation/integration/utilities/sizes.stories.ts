import { Meta, StoryFn } from '@storybook/angular';

interface SizesStory {}

export default {
	title: 'Documentation/Integration/Utilities/Sizes',
} as Meta;

function getTemplate(args: SizesStory): string {
	return `<div>
	<div class="u-widthFitContent demo-utility"><code class="code">u-widthFitContent</code></div>
	<div class="u-width100\% demo-utility"><code class="code">u-width100\\%</code></div>
	<div class="u-minWidth0 demo-utility"><code class="code">u-minWidth0</code></div>
</div>
<div>
	<div class="u-heightFitContent demo-utility"><code class="code">u-heightFitContent</code></div>
	<div class="u-height100\% demo-utility"><code class="code">u-height100\\%</code></div>
	<div class="u-minHeight0 demo-utility"><code class="code">u-minHeight0</code></div>
</div>`;
}

const Template: StoryFn<SizesStory> = (args) => ({
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
					height: 10rem;
				}
			}
		}
		`,
	],
});

export const Sizes = Template.bind({});
Sizes.args = {};
