import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacySortStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Sort',
} as Meta;

function getTemplate(args: GridsLegacySortStory): string {
	return `
	<div class="grid">
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
		<div class="grid-3@mediaMinXS u-first@mediaMinXS">
			<div class="grid-demo">3</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">4</div>
		</div>
	</div>
	<div class="grid">
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-3@mediaMinXS u-last@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">3</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">4</div>
		</div>
	</div>

	`;
}

const Template: StoryFn<GridsLegacySortStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.grid-demo {
			background-color: var(--palettes-neutral-200);
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: var(--commons-borderRadius-full);
		}`,
	],
});

export const Sort = Template.bind({});
Sort.args = {};
