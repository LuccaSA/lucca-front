import { Meta, Story } from '@storybook/angular';

interface GridsAutoWidthStory {
}

export default {
	title: 'SCSS/Grids/Auto Width',
} as Meta;

function getTemplate(args: GridsAutoWidthStory): string {
	return `
	<div class="grid">
		<div class="grid-m">
			<div class="grid-demo">grid-m</div>
		</div>
		<div class="grid-m">
			<div class="grid-demo">grid-m</div>
		</div>
		<div class="grid-m">
			<div class="grid-demo">grid-m</div>
		</div>
		<div class="grid-m">
			<div class="grid-demo">grid-m</div>
		</div>
		<div class="grid-m">
			<div class="grid-demo">grid-m</div>
		</div>
	</div>
	`
}

const Template: Story<GridsAutoWidthStory> = (args: GridsAutoWidthStory) => ({
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

export const AutoWidth = Template.bind({});
AutoWidth.args = {};
