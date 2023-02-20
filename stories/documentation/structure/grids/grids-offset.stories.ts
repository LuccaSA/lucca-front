import { Meta, Story } from '@storybook/angular';

interface GridsOffsetStory {}

export default {
	title: 'Documentation/Structure/Grids/Offset',
} as Meta;

function getTemplate(args: GridsOffsetStory): string {
	return `
	<div class="grid">
		<div class="grid-8@mediaMinXS grid-offset4@mediaMinXS">
			<div class="grid-demo">grid-8@mediaMinXS grid-offset4@mediaMinXS</div>
		</div>
	</div>
	<div class="grid">
		<div class="grid-6@mediaMinXS grid-offset3@mediaMinXS">
			<div class="grid-demo">grid-6@mediaMinXS grid-offset3@mediaMinXS</div>
		</div>
		<div class="grid-3@mediaMinXS">
			<div class="grid-demo">grid-3@mediaMinXS</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsOffsetStory> = (args: GridsOffsetStory) => ({
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

export const Offset = Template.bind({});
Offset.args = {};
