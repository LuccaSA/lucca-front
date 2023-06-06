import { Meta, Story } from '@storybook/angular';

interface GridsLegacySortStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Sort',
} as Meta;

function getTemplate(args: GridsLegacySortStory): string {
	return `
	<div class="gridLegacy">
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">1</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">2</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS u-first@mediaMinXS">
			<div class="gridLegacy-demo">3 u-first@mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">4</div>
		</div>
	</div>
	<div class="gridLegacy">
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">1</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS u-last@mediaMinXS">
			<div class="gridLegacy-demo">2 u-last@mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">3</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">4</div>
		</div>
	</div>

	`;
}

const Template: Story<GridsLegacySortStory> = (args: GridsLegacySortStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.gridLegacy-demo {
			background: #F3F5FC;
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: 1rem;
		}`,
	],
});

export const Sort = Template.bind({});
Sort.args = {};
