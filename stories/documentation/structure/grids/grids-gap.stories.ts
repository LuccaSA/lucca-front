import { Meta, Story } from '@storybook/angular';

interface GridsGapsStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Gaps',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsGapsStory): string {
	return `<div class="grid" style="--grid-columns: 2; --grid-column-gap: 0">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
</div>

<div class="grid" style="--grid-columns: 2; --grid-row-gap: 0">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
</div>

<div class="grid" style="--grid-columns: 2; --grid-gap: 0">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
</div>

<div class="grid" style="--grid-columns: 2; --grid-gap: var(--spacings-XS)">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
</div>`;
}

const Template: Story<GridsGapsStory> = (args: GridsGapsStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			bbackground-color: var(--colors-white-color);
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
