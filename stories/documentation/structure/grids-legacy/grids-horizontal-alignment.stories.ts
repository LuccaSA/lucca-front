import { Meta, Story } from '@storybook/angular';

interface GridsLegacyHorizontalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsLegacyHorizontalAlignmentStory): string {
	return `
	<div class="gridLegacy mod-start@mediaMinXS">
		<div class="gridLegacy-6@mediaMinXS">
			<div class="gridLegacy-demo">Start</div>
		</div>
	</div>
	<div class="gridLegacy mod-center@mediaMinXS">
		<div class="gridLegacy-6@mediaMinXS">
			<div class="gridLegacy-demo">Center</div>
		</div>
	</div>
	<div class="gridLegacy mod-end@mediaMinXS">
		<div class="gridLegacy-6@mediaMinXS">
			<div class="gridLegacy-demo">End</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsLegacyHorizontalAlignmentStory> = (args: GridsLegacyHorizontalAlignmentStory) => ({
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

export const HorizontalAlignment = Template.bind({});
HorizontalAlignment.args = {};
