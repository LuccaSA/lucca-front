import { Meta, Story } from '@storybook/angular';

interface GridsLegacyHorizontalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsLegacyHorizontalAlignmentStory): string {
	return `
	<div class="grid mod-start@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Start</div>
		</div>
	</div>
	<div class="grid mod-center@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Center</div>
		</div>
	</div>
	<div class="grid mod-end@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">End</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsLegacyHorizontalAlignmentStory> = (args: GridsLegacyHorizontalAlignmentStory) => ({
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

export const HorizontalAlignment = Template.bind({});
HorizontalAlignment.args = {};
