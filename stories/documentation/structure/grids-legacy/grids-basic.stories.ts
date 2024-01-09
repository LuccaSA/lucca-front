import { Meta, Story } from '@storybook/angular';

interface GridsLegacyBasicStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Legacy/Basic',
	argTypes: {
		reverse: {
			control: {
				type: 'boolean',
			},
			description: "Inverse l'ordre des éléments.",
		},
	},
} as Meta;

function getTemplate(args: GridsLegacyBasicStory): string {
	const reverse = args.reverse ? `mod-reverse` : '';
	return `
	<div class="grid ${reverse}">
		<div class="grid-6@mediaMinXS">
			<div class="demo">1</div>
		</div>
		<div class="grid-6@mediaMinXS">
			<div class="demo">2</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-4@mediaMinS">
			<div class="demo">1</div>
		</div>
		<div class="grid-8@mediaMinS">
			<div class="demo">2</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-7@mediaMinM">
			<div class="demo">1</div>
		</div>
		<div class="grid-5@mediaMinM">
			<div class="demo">2</div>
		</div>
	</div>

	<div class="grid ${reverse}">
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="demo">1</div>
		</div>
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="demo">2</div>
		</div>
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="demo">3</div>
		</div>
		<div class="grid-3@mediaMinL grid-6@mediaMinM">
			<div class="demo">4</div>
		</div>
	</div>
	`;
}

const Template: Story<GridsLegacyBasicStory> = (args: GridsLegacyBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--palettes-grey-200);
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: 9999px;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { reverse: false };
