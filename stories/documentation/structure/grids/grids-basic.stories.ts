import { Meta, Story } from '@storybook/angular';

interface GridsBasicStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Basic',
	argTypes: {
		reverse: {
			control: {
				type: 'boolean',
			},
			description: "Inverse l'ordre des éléments.",
		},
	},
} as Meta;

function getTemplate(args: GridsBasicStory): string {
	const reverse = args.reverse ? `mod-reverse` : '';
	return `
	<div class="grid ${reverse}">
		<div class="grid-xs6">
			<div class="grid-demo">grid-xs6</div>
		</div>
		<div class="grid-xs6">
			<div class="grid-demo">grid-xs6</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-s4">
			<div class="grid-demo">grid-s4</div>
		</div>
		<div class="grid-s8">
			<div class="grid-demo">grid-s8</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-m7">
			<div class="grid-demo">grid-m7</div>
		</div>
		<div class="grid-m5">
			<div class="grid-demo">grid-m5</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-l3 grid-m6">
			<div class="grid-demo">grid-l3 grid-m6</div>
		</div>
		<div class="grid-l3 grid-m6">
			<div class="grid-demo">grid-l3 grid-m6</div>
		</div>
		<div class="grid-l3 grid-m6">
			<div class="grid-demo">grid-l3 grid-m6</div>
		</div>
		<div class="grid-l3 grid-m6">
			<div class="grid-demo">grid-l3 grid-m6</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsBasicStory> = (args: GridsBasicStory) => ({
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

export const Basic = Template.bind({});
Basic.args = { reverse: false };
