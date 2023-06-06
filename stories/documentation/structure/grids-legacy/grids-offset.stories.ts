import { Meta, Story } from '@storybook/angular';

interface GridsLegacyOffsetStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Offset',
} as Meta;

function getTemplate(args: GridsLegacyOffsetStory): string {
	return `
	<div class="gridLegacy">
		<div class="gridLegacy-8@mediaMinXS gridLegacy-offset4@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-8 @mediaMinXS gridLegacy-offset4 @mediaMinXS</div>
		</div>
	</div>
	<div class="gridLegacy">
		<div class="gridLegacy-6@mediaMinXS gridLegacy-offset3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-6 @mediaMinXS gridLegacy-offset3 @mediaMinXS</div>
		</div>
		<div class="gridLegacy-3@mediaMinXS">
			<div class="gridLegacy-demo">gridLegacy-3 @mediaMinXS</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsLegacyOffsetStory> = (args: GridsLegacyOffsetStory) => ({
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

export const Offset = Template.bind({});
Offset.args = {};
