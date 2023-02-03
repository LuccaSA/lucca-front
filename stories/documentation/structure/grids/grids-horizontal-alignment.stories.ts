import { Meta, Story } from '@storybook/angular';

interface GridsHorizontalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsHorizontalAlignmentStory): string {
	return `
	<div class="grid mod-XSStart">
		<div class="grid-xs6">
			<div class="grid-demo">Start</div>
		</div>
	</div>
	<div class="grid mod-XSCenter">
		<div class="grid-xs6">
			<div class="grid-demo">Center</div>
		</div>
	</div>
	<div class="grid mod-XSEnd">
		<div class="grid-xs6">
			<div class="grid-demo">End</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsHorizontalAlignmentStory> = (args: GridsHorizontalAlignmentStory) => ({
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

export const HorizontalAlignment = Template.bind({});
HorizontalAlignment.args = {};
