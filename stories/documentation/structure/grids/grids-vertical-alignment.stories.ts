import { Meta, StoryFn } from '@storybook/angular';

interface GridsVerticalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Vertical Alignment',
} as Meta;

function getTemplate(args: GridsVerticalAlignmentStory): string {
	return `
	<div class="grid mod-top@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo" style="height:100px"></div>
		</div>
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Top</div>
		</div>
	</div>
	<div class="grid mod-middle@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo" style="height:100px"></div>
		</div>
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Middle</div>
		</div>
	</div>
	<div class="grid mod-bottom@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo" style="height:100px"></div>
		</div>
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Bottom</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsVerticalAlignmentStory> = (args: GridsVerticalAlignmentStory) => ({
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

export const VerticalAlignment = Template.bind({});
VerticalAlignment.args = {};
