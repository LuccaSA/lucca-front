import { Meta, StoryFn } from '@storybook/angular';

interface GridsHorizontalAlignmentStory {}

export default {
	title: 'Documentation/Structure/Grids/Horizontal Alignment',
} as Meta;

function getTemplate(args: GridsHorizontalAlignmentStory): string {
	return `
	<div class="grid mod-start@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Start</div>
		</div>
	</div>
	<div class="grid mod-center@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">Center</div>
		</div>
	</div>
	<div class="grid mod-end@mediaMinXS">
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">End</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<GridsHorizontalAlignmentStory> = (args: GridsHorizontalAlignmentStory) => ({
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
