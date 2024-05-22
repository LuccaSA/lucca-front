import { Meta, StoryFn } from '@storybook/angular';

interface GridsPositionStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/ResponsiveAuto',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsPositionStory): string {
	return `
<div class="grid mod-autoAtMediaMinS">
	<div class="grid-column"><div class="demo">1</div></div>
	<div class="grid-column"><div class="demo">2</div></div>
	<div class="grid-column"><div class="demo">3</div></div>
	<div class="grid-column"><div class="demo">4</div></div>
	<div class="grid-column"><div class="demo">5</div></div>
	<div class="grid-column"><div class="demo">6</div></div>
</div>`;
}

const Template: StoryFn<GridsPositionStory> = (args: GridsPositionStory) => ({
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
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
