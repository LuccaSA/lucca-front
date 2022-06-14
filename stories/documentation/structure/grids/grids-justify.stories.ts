import { Meta, Story } from '@storybook/angular';

interface GridsJustifyStory {
}

export default {
	title: 'Documentation/Structure/Grids/Justify',
} as Meta;

function getTemplate(args: GridsJustifyStory): string {
	return `
	<div class="grid mod-xsBetween">
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
	</div>
	<div class="grid mod-xsAround">
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
	</div>
	`
}

const Template: Story<GridsJustifyStory> = (args: GridsJustifyStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.grid-demo {
			background: #F3F5FC;
			margin-bottom: 1rem;
			padding: 1rem;
			border-radius: 1rem;
		}`,
	],
});

export const Justify = Template.bind({});
Justify.args = {};
