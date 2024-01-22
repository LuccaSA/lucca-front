import { Meta, StoryFn } from '@storybook/angular';

interface GridsBasicStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Basic',
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

const Template: StoryFn<GridsBasicStory> = (args: GridsBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: #FFFFFF;
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
