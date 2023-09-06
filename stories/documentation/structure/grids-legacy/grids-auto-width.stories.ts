import { Meta, StoryFn } from '@storybook/angular';

interface GridsLegacyAutoWidthStory {}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Auto Width',
} as Meta;

function getTemplate(args: GridsLegacyAutoWidthStory): string {
	return `
	<div class="grid">
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid @mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid @mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid @mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid @mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid @mediaMinM</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsLegacyAutoWidthStory> = (args: GridsLegacyAutoWidthStory) => ({
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

export const AutoWidth = Template.bind({});
AutoWidth.args = {};
