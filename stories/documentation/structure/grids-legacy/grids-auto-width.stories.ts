import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyAutoWidthStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Auto Width',
} as Meta;

function getTemplate(args: GridsLegacyAutoWidthStory): string {
	return `
	<div class="grid">
		<div class="grid@mediaMinM">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">2</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">3</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">4</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">5</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsLegacyAutoWidthStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.grid-demo {
			background-color: var(--palettes-neutral-200);
			margin-bottom: var(--pr-t-spacings-M);
			padding: var(--pr-t-spacings-M);
			border-radius: var(--commons-borderRadius-full);
		}`,
	],
});

export const AutoWidth = Template.bind({});
AutoWidth.args = {};
