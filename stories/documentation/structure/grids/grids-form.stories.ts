import { Meta, StoryFn } from '@storybook/angular';

interface GridsFormStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Form',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsFormStory): string {
	return `<div class="grid mod-form">
	<div class="grid-column" style="--grid-colspan: 4"><div class="demo">mod-form<br />colspan 4</div></div>
	<div class="grid-column" style="--grid-colspan: 2"><div class="demo">mod-form<br />colspan 2</div></div>
	<div class="grid-column" style="--grid-colspan: 2"><div class="demo">mod-form<br />colspan 2</div></div>
	<div class="grid-column"><div class="demo">mod-form</div></div>
	<div class="grid-column"><div class="demo">mod-form</div></div>
	<div class="grid-column"><div class="demo">mod-form</div></div>
	<div class="grid-column"><div class="demo">mod-form</div></div>
</div>`;
}

const Template: StoryFn<GridsFormStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--colors-white-color);
			padding: var(--pr-t-spacings-M);
			border-radius: 1rem;
			text-align: center;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.grid + .grid {
			margin-top: var(--pr-t-spacings-XL);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
