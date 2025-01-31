import { Meta, StoryFn } from '@storybook/angular';

interface GridsPositionStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Position',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsPositionStory): string {
	return `<div class="grid" style="--grid-columns: 4">
	<div class="grid-column" style="--grid-column: 2"><div class="demo">column 2</div></div>
	<div class="grid-column" style="--grid-column: 4"><div class="demo">column 4</div></div>
</div>

<div class="grid" style="--grid-columns: 4">
	<div class="grid-column" style="--grid-column: 2"><div class="demo">column 2</div></div>
	<div class="grid-column" style="--grid-column: 1"><div class="demo">column 1</div></div>
</div>

<div class="grid" style="--grid-columns: 4">
	<div class="grid-column" style="--grid-column: 2; --grid-row: 1"><div class="demo">column 2<br />row 1</div></div>
	<div class="grid-column" style="--grid-column: 1; --grid-row: 1"><div class="demo">column 1<br />row 1</div></div>
</div>

<div class="grid mod-dense" style="--grid-columns: 4">
	<div class="grid-column" style="--grid-column: 2"><div class="demo">mod-dense<br />column 2</div></div>
	<div class="grid-column" style="--grid-column: 1"><div class="demo">mod-dense<br />column 1</div></div>
</div>`;
}

const Template: StoryFn<GridsPositionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--palettes-neutral-0);
			padding: var(--pr-t-spacings-200);
			border-radius: 1rem;
			text-align: center;
			block-size: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.grid + .grid {
			margin-block-start: var(--pr-t-spacings-400);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
