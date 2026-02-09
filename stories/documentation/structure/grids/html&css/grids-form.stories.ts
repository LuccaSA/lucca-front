import { Meta, StoryObj } from '@storybook/angular';

interface GridsFormStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/HTML&CSS/Form',
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

const Template = (args: GridsFormStory) => ({
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
		`,
	],
});

export const Basic: StoryObj<GridsFormStory> = {
	args: {},
	render: Template,
};
