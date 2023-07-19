import { Meta, Story } from '@storybook/angular';

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
	</div>
	`;
}

const Template: Story<GridsSpanStory> = (args: GridsSpanStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: #F3F5FC;
			padding: var(--spacings-S);
			border-radius: 1rem;
			text-align: center;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.grid + .grid {
			margin-top: var(--spacings-L);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
