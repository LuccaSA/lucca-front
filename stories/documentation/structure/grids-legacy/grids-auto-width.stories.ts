import { Meta, Story } from '@storybook/angular';

interface GridsLegacyAutoWidthStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Auto Width',
} as Meta;

function getTemplate(args: GridsLegacyAutoWidthStory): string {
	return `
	<div class="gridLegacy">
		<div class="gridLegacy@mediaMinM">
			<div class="gridLegacy-demo">gridLegacy @mediaMinM</div>
		</div>
		<div class="gridLegacy@mediaMinM">
			<div class="gridLegacy-demo">gridLegacy @mediaMinM</div>
		</div>
		<div class="gridLegacy@mediaMinM">
			<div class="gridLegacy-demo">gridLegacy @mediaMinM</div>
		</div>
		<div class="gridLegacy@mediaMinM">
			<div class="gridLegacy-demo">gridLegacy @mediaMinM</div>
		</div>
		<div class="gridLegacy@mediaMinM">
			<div class="gridLegacy-demo">gridLegacy @mediaMinM</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsLegacyAutoWidthStory> = (args: GridsLegacyAutoWidthStory) => ({
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

export const AutoWidth = Template.bind({});
AutoWidth.args = {};
