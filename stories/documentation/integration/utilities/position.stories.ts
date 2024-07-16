import { Meta, StoryFn } from '@storybook/angular';

interface PositionStory {}

export default {
	title: 'Documentation/Integration/Utilities/Position',
} as Meta;

function getTemplate(args: PositionStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<div class="u-positionFixed"><code class="code">u-positionFixed</code></div>
	</div>
</div>
<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<div class="u-positionAbsolute"><code class="code">u-positionAbsolute</code></div>
	</div>
</div>
<div class="demo-utilityWrapper">
	<div>
		<div class="u-positionStatic demo-utility"><code class="code">u-positionStatic</code></div>
	</div>
	<div>
		<div class="u-positionRelative demo-utility"><code class="code">u-positionRelative</code></div>
	</div>
	<div>
		<div class="u-positionSticky demo-utility"><code class="code">u-positionSticky</code></div>
	</div>
</div>`;
}

const Template: StoryFn<PositionStory> = (args) => ({
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

export const Position = Template.bind({});
Position.args = {};
