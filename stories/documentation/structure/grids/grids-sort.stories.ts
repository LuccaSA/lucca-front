import { Meta, Story } from '@storybook/angular';

interface GridsSortStory {}

export default {
	title: 'Documentation/Structure/Grids/Sort',
} as Meta;

function getTemplate(args: GridsSortStory): string {
	return `
	<div class="grid">
		<div class="grid-xs3">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">2</div>
		</div>
		<div class="grid-xs3 u-xsFirst">
			<div class="grid-demo">3 u-xsFirst</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">4</div>
		</div>
	</div>
	<div class="grid">
		<div class="grid-xs3">
			<div class="grid-demo">1</div>
		</div>
		<div class="grid-xs3 u-xsLast">
			<div class="grid-demo">2 u-xsLast</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">3</div>
		</div>
		<div class="grid-xs3">
			<div class="grid-demo">4</div>
		</div>
	</div>

	`;
}

const Template: Story<GridsSortStory> = (args: GridsSortStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.grid-demo {
			background: #F3F5FC;
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: 1rem;
		}`,
	],
});

export const Sort = Template.bind({});
Sort.args = {};
