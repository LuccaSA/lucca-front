import { Meta, StoryFn } from '@storybook/angular';

interface GridsAutoStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Auto',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsAutoStory): string {
	return `<div class="grid mod-auto">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
</div>

<div class="grid mod-auto">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
	<div class="grid-column"><div class="demo">5</div></div>
	<div class="grid-column"><div class="demo">6</div></div>
</div>

<div class="grid mod-auto">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
	<div class="grid-column"><div class="demo">5</div></div>
	<div class="grid-column" style="--grid-colspan: 3"><div class="demo">colspan 3</div></div>
</div>

<div class="grid mod-auto">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
	<div class="grid-column"><div class="demo">5</div></div>
	<div class="grid-column"><div class="demo">6</div></div>
	<div class="grid-column"><div class="demo">7</div></div>
	<div class="grid-column"><div class="demo">8</div></div>
</div>`;
}

const Template: StoryFn<GridsAutoStory> = (args) => ({
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
