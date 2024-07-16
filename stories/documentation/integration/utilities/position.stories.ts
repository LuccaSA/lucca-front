import { Meta, StoryFn } from '@storybook/angular';

interface PositionStory {}

export default {
	title: 'Documentation/Integration/Utilities/Position',
} as Meta;

function getTemplate(args: PositionStory): string {
	return `
<div>
	<div>
		<div class="u-positionFixed"><code class="code">u-positionFixed</code></div>
	</div>
</div>
<div>
	<div>
		<div class="u-positionAbsolute"><code class="code">u-positionAbsolute</code></div>
	</div>
</div>
<div>
	<div>
		<div class="u-positionStatic"><code class="code">u-positionStatic</code></div>
	</div>
	<div>
		<div class="u-positionRelative"><code class="code">u-positionRelative</code></div>
	</div>
	<div>
		<div class="u-positionSticky"><code class="code">u-positionSticky</code></div>
	</div>
</div>
`;
}

const Template: StoryFn<PositionStory> = (args) => ({
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
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const Position = Template.bind({});
Position.args = {};
