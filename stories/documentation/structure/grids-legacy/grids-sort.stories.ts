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
			<div class="grid-demo">3 u-first@mediaMinXS</div>
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
			<div class="grid-demo">2 u-last@mediaMinXS</div>
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

const Template: StoryFn<GridsLegacySortStory> = (args: GridsLegacySortStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.grid-demo {
			background: #F3F5FC;
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: 1rem;
		}`,
	],
});

export const Sort = Template.bind({});
Sort.args = {};
