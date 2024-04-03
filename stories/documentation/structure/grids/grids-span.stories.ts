import { Meta, StoryFn } from '@storybook/angular';

interface GridsSpanStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Span',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsSpanStory): string {
	return `
<div class="grid" style="--grid-columns: 6">
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column" style="--grid-colspan: 2"><div class="demo">grid-columns 6<br />colspan 2</div></div>
	<div class="grid-column" style="--grid-colspan: 2"><div class="demo">grid-columns 6<br />colspan 2</div></div>
</div>

<div class="grid" style="--grid-columns: 3">
	<div class="grid-column" style="--grid-rowspan: 2"><div class="demo">grid-columns 3<br />rowspan 2</div></div>
	<div class="grid-column"><div class="demo">grid-columns 3</div></div>
	<div class="grid-column"><div class="demo">grid-columns 3</div></div>
	<div class="grid-column"><div class="demo">grid-columns 3</div></div>
	<div class="grid-column"><div class="demo">grid-columns 3</div></div>
</div>`;
}

const Template: StoryFn<GridsSpanStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--colors-white-color);
			padding: var(--pr-t-spacings-200);
			border-radius: 1rem;
			text-align: center;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.grid + .grid {
			margin-top: var(--pr-t-spacings-400);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
