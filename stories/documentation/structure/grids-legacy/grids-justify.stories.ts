import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyJustifyStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Justify',
} as Meta;

function getTemplate(args: GridsLegacyJustifyStory): string {
	return `
	<div class="grid mod-between@mediaMinXS">
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">3</div>
		</div>
	</div>
	<div class="grid mod-around@mediaMinXS">
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">3</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsLegacyJustifyStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.grid-demo {
			background-color: var(--palettes-neutral-200);
			margin-bottom: var(--pr-t-spacings-200);
			padding: var(--pr-t-spacings-200);
			border-radius: var(--commons-borderRadius-full);
		}`,
	],
});

export const Justify = Template.bind({});
Justify.args = {};
