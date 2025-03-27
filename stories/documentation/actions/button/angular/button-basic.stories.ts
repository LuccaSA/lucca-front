import { ButtonComponent } from '@lucca-front/ng/button';
import { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from '@storybook/test';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			template: `<!--<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}
>Button</button>-->

<table class="table mod-layoutFixed">
	<thead>
		<tr>
			<th></th>
			<th>old</th>
			<th>new</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>brand</th>
			<td><button luButton block palette="brand">brand</button></td>
			<td><button luButton block palette="brand">brand (deprecated)</button></td>
		</tr>
		<tr>
			<th>lucca</th>
			<td><button luButton block palette="lucca">lucca (deprecated)</button></td>
			<td><button luButton block palette="lucca">lucca</button></td>
		</tr>
		<tr>
			<th>other product A</th>
			<td><button luButton block palette="timmi">timmi</button></td>
			<td><button luButton block palette="timeAndActivities">timeAndActivities</button></td>
		</tr>
		<tr>
			<th>other product B</th>
			<td><button luButton block palette="cleemy">cleemy</button></td>
			<td><button luButton block palette="spendManagement">spendManagement</button></td>
		</tr>
		<tr>
			<th>other product C</th>
			<td><button luButton block palette="poplee">poplee</button></td>
			<td><button luButton block palette="talentManagement">talentManagement</button></td>
		</tr>
		<tr>
			<th>other product D</th>
			<td><button luButton block palette="pagga">pagga</button></td>
			<td><button luButton block palette="compensationAndBenefits">compensationAndBenefits</button></td>
		</tr>
		<tr>
			<th>other product E</th>
			<td><button luButton block palette="corehr">corehr</button></td>
			<td><button luButton block palette="employeeAdministration">employeeAdministration</button></td>
		</tr>
		<tr>
			<th>other product F</th>
			<td><button luButton block palette="cc">cc</button></td>
			<td><button luButton block palette="cloudControl">cloudControl</button></td>
		</tr>
		<tr>
			<th>current product</th>
			<td><button luButton block>default</button></td>
			<td><button luButton block>default</button></td>
		</tr>
		<tr>
			<th>state (critical)</th>
			<td><button luButton block palette="critical">critical</button></td>
			<td><button luButton block palette="critical">critical</button></td>
		</tr>
		<tr>
			<th>neutral (default)</th>
			<td><button luButton block palette="neutral">neutral</button></td>
			<td><button luButton block palette="neutral">neutral</button></td>
		</tr>
		<tr>
			<th>decorative (pineapple)</th>
			<td><button luButton block palette="pineapple">pineapple</button></td>
			<td><button luButton block palette="pineapple">pineapple</button></td>
		</tr>
		<tr>
			<th>deprecated (grey)</th>
			<td><button luButton block palette="grey">grey</button></td>
			<td><button luButton block palette="grey">grey</button></td>
		</tr>
	</tbody>
</table>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent> = {
	argTypes: {
		luButton: {
			options: ['', 'outlined', 'text', 'text-invert'],
			control: {
				type: 'select',
			},
		},
		delete: {
			description: '[v18.1] Couleur critical au hover / focus',
		},
		size: {
			control: {
				type: 'select',
			},
		},
	},
	play: async (context) => {
		const canvas = within(context.canvasElement);
		const button = await canvas.findByRole('button');
		await expect(button).toHaveClass('button is-default palette-none');
	},
	args: {
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		delete: false,
	},
};
