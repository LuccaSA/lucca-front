import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyHorizontalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsLegacyHorizontalAlignmentStory): string {
	return `
	<div class="grid mod-start@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
	</div>
	<div class="grid mod-center@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
	</div>
	<div class="grid mod-end@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">3</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsLegacyHorizontalAlignmentStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.grid-demo {
			background-color: var(--palettes-grey-200);
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: var(--commons-borderRadius-full);
		}`,
	],
});

export const HorizontalAlignment = Template.bind({});
HorizontalAlignment.args = {};
