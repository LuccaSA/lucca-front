import { Meta, StoryFn } from '@storybook/angular';

interface ShadowsStory {}

export default {
	title: 'Documentation/Integration/Utilities/Shadows',
} as Meta;

function getTemplate(args: ShadowsStory): string {
	return `<div class="u-elevate1"><code class="code">u-elevate1</code></div>
<div class="u-elevate2"><code class="code">u-elevate2</code></div>
<div class="u-elevate3"><code class="code">u-elevate3</code></div>
<div class="u-elevate4"><code class="code">u-elevate4</code></div>
<div class="u-elevate5"><code class="code">u-elevate5</code></div>
<div class="u-elevate6"><code class="code">u-elevate6</code></div>`;
}

const Template: StoryFn<ShadowsStory> = (args: ShadowsStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		div {
			background-color: var(--colors-white-color);
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-XS);
			width: 20rem;
		}`,
	],
});

export const Shadows = Template.bind({});
Shadows.args = {};
