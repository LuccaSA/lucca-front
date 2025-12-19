import { Meta, StoryObj } from '@storybook/angular';

interface GridsPositionStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/HTML & CSS/ResponsiveAutoContainer',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsPositionStory): string {
	return `<div class="grid-containerWrapper">
	<div class="grid mod-autoAtContainerMinS">
		<div class="grid-column"><div class="demo">1</div></div>
		<div class="grid-column"><div class="demo">2</div></div>
		<div class="grid-column"><div class="demo">3</div></div>
		<div class="grid-column"><div class="demo">4</div></div>
		<div class="grid-column"><div class="demo">5</div></div>
		<div class="grid-column"><div class="demo">6</div></div>
	</div>
</div>`;
}

const Template = (args: GridsPositionStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--palettes-neutral-0);
			padding: var(--spacings-S);
			border-radius: 1rem;
			text-align: center;
			block-size: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		`,
	],
});

export const Basic: StoryObj<GridsPositionStory> = {
	args: {},
	render: Template,
};
