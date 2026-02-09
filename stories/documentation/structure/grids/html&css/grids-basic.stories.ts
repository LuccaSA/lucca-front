import { Meta, StoryObj } from '@storybook/angular';

interface GridsBasicStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsBasicStory): string {
	return `<div class="grid">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
	<div class="grid-column"><div class="demo">5</div></div>
	<div class="grid-column"><div class="demo">6</div></div>
	<div class="grid-column"><div class="demo">7</div></div>
	<div class="grid-column"><div class="demo">8</div></div>
	<div class="grid-column"><div class="demo">9</div></div>
	<div class="grid-column"><div class="demo">10</div></div>
	<div class="grid-column"><div class="demo">11</div></div>
	<div class="grid-column"><div class="demo">12</div></div>
</div>

<div class="grid" style="--grid-columns: 6">
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
	<div class="grid-column"><div class="demo">grid-columns 6</div></div>
</div>`;
}

const Template = (args: GridsBasicStory) => ({
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

export const Basic: StoryObj<GridsBasicStory> = {
	args: {},
	render: Template,
};
