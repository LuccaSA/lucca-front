import { ButtonComponent } from '@lucca-front/ng/button';
import { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from '@storybook/test';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}
>Button</button>
<br /><br />
<button luButton palette="timeAndActivities">Button</button>
<br /><br />
<button luButton palette="spendManagement">Button</button>
<br /><br />
<button luButton palette="talentManagement">Button</button>
<br /><br />
<button luButton palette="compensationAndBenefits">Button</button>
<br /><br />
<button luButton palette="employeeAdministration">Button</button>
<br /><br />
<button luButton palette="cloudControl">Button</button>`,
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
