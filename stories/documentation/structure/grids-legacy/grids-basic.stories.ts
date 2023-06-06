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
	<div class="gridLegacy ${reverse}">
		<div class="gridLegacy-6@mediaMinXS">
			<div class="demo">gridLegacy-6@mediaMinXS</div>
		</div>
		<div class="gridLegacy-6@mediaMinXS">
			<div class="demo">gridLegacy-6@mediaMinXS</div>
		</div>
	</div>

	<div class="gridLegacy ${reverse}">
		<div class="gridLegacy-4@mediaMinS">
			<div class="demo">gridLegacy-4@mediaMinS</div>
		</div>
		<div class="gridLegacy-8@mediaMinS">
			<div class="demo">gridLegacy-8@mediaMinS</div>
		</div>
	</div>

	<div class="gridLegacy ${reverse}">
		<div class="gridLegacy-7@mediaMinM">
			<div class="demo">gridLegacy-7@mediaMinM</div>
		</div>
		<div class="gridLegacy-5@mediaMinM">
			<div class="demo">gridLegacy-5@mediaMinM</div>
		</div>
	</div>

	<div class="gridLegacy ${reverse}">
		<div class="gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM">
			<div class="demo">gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM</div>
		</div>
		<div class="gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM">
			<div class="demo">gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM</div>
		</div>
		<div class="gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM">
			<div class="demo">gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM</div>
		</div>
		<div class="gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM">
			<div class="demo">gridLegacy-3@mediaMinL gridLegacy-6@mediaMinM</div>
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
			background: #F3F5FC;
			margin-bottom: var(--spacings-S);
			padding: var(--spacings-S);
			border-radius: 1rem;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { reverse: false };
