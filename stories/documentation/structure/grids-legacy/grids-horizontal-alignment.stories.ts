import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyHorizontalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsLegacyHorizontalAlignmentStory): string {
	return `
	<div class="grid rwd-autoContainer mod-start@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
	</div>
	<div class="grid rwd-autoContainer mod-center@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
	</div>
	<div class="grid rwd-autoContainer mod-end@mediaMinXS">
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
			background-color: var(--palettes-neutral-200);
			margin-bottom: var(--pr-t-spacings-200);
			padding: var(--pr-t-spacings-200);
			border-radius: var(--commons-borderRadius-full);
		}`,
	],
});

export const HorizontalAlignment = Template.bind({});
HorizontalAlignment.args = {};
