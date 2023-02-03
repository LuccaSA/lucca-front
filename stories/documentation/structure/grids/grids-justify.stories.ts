import { Meta, Story } from '@storybook/angular';

interface GridsJustifyStory {}

export default {
	title: 'Documentation/Structure/Grids/Justify',
} as Meta;

function getTemplate(args: GridsJustifyStory): string {
	return `
	<div class="grid mod-between@mediaMinXS">
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
	</div>
	<div class="grid mod-around@mediaMinXS">
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsJustifyStory> = (args: GridsJustifyStory) => ({
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

export const Justify = Template.bind({});
Justify.args = {};
