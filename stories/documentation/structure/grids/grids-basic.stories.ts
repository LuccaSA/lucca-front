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
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">grid-6@mediaMinXS</div>
		</div>
		<div class="grid-6@mediaMinXS">
			<div class="grid-demo">grid-6@mediaMinXS</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-4@mediaMinS">
			<div class="grid-demo">grid-4@mediaMinS</div>
		</div>
		<div class="grid-8@mediaMinS">
			<div class="grid-demo">grid-8@mediaMinS</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-7@mediaMinM">
			<div class="grid-demo">grid-7@mediaMinM</div>
		</div>
		<div class="grid-5@mediaMinM">
			<div class="grid-demo">grid-5@mediaMinM</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="grid-demo">grid-3@mediaMinL grid-6@mediaMinM</div>
		</div>
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="grid-demo">grid-3@mediaMinL grid-6@mediaMinM</div>
		</div>
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="grid-demo">grid-3@mediaMinL grid-6@mediaMinM</div>
		</div>
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="grid-demo">grid-3@mediaMinL grid-6@mediaMinM</div>
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
