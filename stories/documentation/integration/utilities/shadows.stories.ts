import { Meta, StoryFn } from '@storybook/angular';

interface ShadowsStory {}

export default {
	title: 'Documentation/Integration/Utilities/Shadows',
} as Meta;

function getTemplate(args: ShadowsStory): string {
	return `<div>
	<div class="pr-u-elevate1"><code class="code">pr-u-elevate1</code></div>
	<div class="pr-u-elevate2"><code class="code">pr-u-elevate2</code></div>
	<div class="pr-u-elevate3"><code class="code">pr-u-elevate3</code></div>
	<div class="pr-u-elevate4"><code class="code">pr-u-elevate4</code></div>
	<div class="pr-u-elevate5"><code class="code">pr-u-elevate5</code></div>
	<div class="pr-u-elevate6"><code class="code">pr-u-elevate6</code></div>
</div>`;
}

const Template: StoryFn<ShadowsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-500);
			display: flex;
			flex-direction: column;

			> div {
				display: flex;
				gap: var(--pr-t-spacings-100);
				flex-wrap: wrap;
				align-items: flex-start;

				> div {
					padding: var(--pr-t-spacings-100);
				}
			}
		}
		`,
	],
});

export const Shadows = Template.bind({});
Shadows.args = {};
