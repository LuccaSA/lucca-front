import { Meta, Story } from '@storybook/angular';

interface GridsHorizontalAlignmentStory {
}

export default {
	title: 'Documentation/Structure/Grids/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsHorizontalAlignmentStory): string {
	return `
	<div class="grid mod-xsStart">
		<div class="grid-xs6">
			<div class="grid-demo">Start</div>
		</div>
	</div>
	<div class="grid mod-xsCenter">
		<div class="grid-xs6">
			<div class="grid-demo">Center</div>
		</div>
	</div>
	<div class="grid mod-xsEnd">
		<div class="grid-xs6">
			<div class="grid-demo">End</div>
		</div>
	</div>
	`
}

const Template: Story<GridsHorizontalAlignmentStory> = (args: GridsHorizontalAlignmentStory) => ({
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

export const HorizontalAlignment = Template.bind({});
HorizontalAlignment.args = {};
