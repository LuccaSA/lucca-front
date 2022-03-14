import { Meta, Story } from '@storybook/angular';

interface GridsOffsetStory {
}

export default {
	title: 'SCSS/Grids/Offset',
} as Meta;

function getTemplate(args: GridsOffsetStory): string {
	return `
	<div class="grid">
		<div class="grid-xs8 grid-xsOffset4">
			<div class="grid-demo">grid-xs8 grid-xsOffset4</div>
		</div>
	</div>
	<div class="grid">
		<div class="grid-xs6 grid-xsOffset3">
			<div class="grid-demo">grid-xs6 grid-xsOffset3</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">grid-xs3</div>
		</div>
	</div>
	`
}

const Template: Story<GridsOffsetStory> = (args: GridsOffsetStory) => ({
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

export const Offset = Template.bind({});
Offset.args = {};
