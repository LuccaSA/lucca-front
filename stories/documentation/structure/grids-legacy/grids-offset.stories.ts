import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyOffsetStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Offset',
} as Meta;

function getTemplate(args: GridsLegacyOffsetStory): string {
	return `
	<div class="grid">
		<div class="grid-8@mediaMinXS grid-offset4@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
	</div>
	<div class="grid">
		<div class="grid-6@mediaMinXS grid-offset3@mediaMinXS">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">2</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsLegacyOffsetStory> = (args) => ({
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

export const Offset = Template.bind({});
Offset.args = {};
