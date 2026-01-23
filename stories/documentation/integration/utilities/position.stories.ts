import { Meta, StoryObj } from '@storybook/angular';

interface PositionStory {}

export default {
	title: 'Documentation/Integration/Utilities/Position',
} as Meta;

function getTemplate(args: PositionStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<div class="pr-u-positionFixed"><code class="code">pr-u-positionFixed</code></div>
	</div>
</div>
<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<div class="pr-u-positionAbsolute"><code class="code">pr-u-positionAbsolute</code></div>
	</div>
</div>
<div class="demo-utilityWrapper">
	<div>
		<div class="pr-u-positionStatic demo-utility"><code class="code">pr-u-positionStatic</code></div>
	</div>
	<div>
		<div class="pr-u-positionRelative demo-utility"><code class="code">pr-u-positionRelative</code></div>
	</div>
	<div>
		<div class="pr-u-positionSticky demo-utility"><code class="code">pr-u-positionSticky</code></div>
	</div>
</div>`;
}

const Template = (args: PositionStory) => ({
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

export const Position: StoryObj<PositionStory> = {
	args: {},
	render: Template,
};
