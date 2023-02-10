import { Meta, Story } from '@storybook/angular';

interface GridsAutoWidthStory {}

export default {
	title: 'Documentation/Structure/Grids/Auto Width',
} as Meta;

function getTemplate(args: GridsAutoWidthStory): string {
	return `
	<div class="grid">
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid@mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid@mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid@mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid@mediaMinM</div>
		</div>
		<div class="grid@mediaMinM">
			<div class="grid-demo">grid@mediaMinM</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsAutoWidthStory> = (args: GridsAutoWidthStory) => ({
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
