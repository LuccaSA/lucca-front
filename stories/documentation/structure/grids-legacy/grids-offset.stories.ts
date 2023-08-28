import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyOffsetStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Offset',
} as Meta;

function getTemplate(args: GridsLegacyOffsetStory): string {
	return `
	<div class="grid">
		<div class="grid-8@mediaMinXS grid-offset4@mediaMinXS">
			<div class="grid-demo">grid-8 @mediaMinXS grid-offset4 @mediaMinXS</div>
		</div>
	</div>
	<div class="grid">
		<div class="grid-6@mediaMinXS grid-offset3@mediaMinXS">
			<div class="grid-demo">grid-6 @mediaMinXS grid-offset3 @mediaMinXS</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3 @mediaMinXS</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsLegacyOffsetStory> = (args: GridsLegacyOffsetStory) => ({
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

export const Offset = Template.bind({});
Offset.args = {};
