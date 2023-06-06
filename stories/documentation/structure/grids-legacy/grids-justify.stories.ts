import { Meta, Story } from '@storybook/angular';

interface GridsLegacyJustifyStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Justify',
} as Meta;

function getTemplate(args: GridsLegacyJustifyStory): string {
	return `
	<div class="gridLegacy mod-between@mediaMinXS">
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
	</div>
	<div class="gridLegacy mod-around@mediaMinXS">
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsLegacyJustifyStory> = (args: GridsLegacyJustifyStory) => ({
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

export const Justify = Template.bind({});
Justify.args = {};
