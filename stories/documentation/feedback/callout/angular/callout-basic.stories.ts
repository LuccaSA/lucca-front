import { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { PaletteArgType } from "../../../../helpers/common-arg-types";

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	render: (args: CalloutComponent & { description: string }) => {
		const { description, heading, palette, size, removable, tiny, icon } = args;
		return {
			template: `<lu-callout heading="${heading}" palette="${palette}" size="${size}" [removable]="${removable}" [tiny]="${tiny}" icon="${icon}">
  ${description}
</lu-callout>`,
		};
	},
	argTypes: {
		palette: PaletteArgType,
		icon: {
			options: ['info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
		},
		title: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		heading: 'Feedback or informations',
		tiny: false,
		icon: 'info',
		palette: 'none',
		size: 'M',
		removable: false,
		description: `Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a>`,
	},
};
