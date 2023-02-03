import { Meta, Story } from '@storybook/angular';

interface GridsVerticalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Vertical Alignment',
} as Meta;

function getTemplate(args: GridsVerticalAlignmentStory): string {
	return `
	<div class="grid mod-XSTop">
		<div class="grid-xs6">
			<div class="grid-demo" style="height:100px"></div>
		</div>
		<div class="grid-xs6">
			<div class="grid-demo">Top</div>
		</div>
	</div>
	<div class="grid mod-XSMiddle">
		<div class="grid-xs6">
			<div class="grid-demo" style="height:100px"></div>
		</div>
		<div class="grid-xs6">
			<div class="grid-demo">Middle</div>
		</div>
	</div>
	<div class="grid mod-XSBottom">
		<div class="grid-xs6">
			<div class="grid-demo" style="height:100px"></div>
		</div>
		<div class="grid-xs6">
			<div class="grid-demo">Bottom</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsVerticalAlignmentStory> = (args: GridsVerticalAlignmentStory) => ({
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
