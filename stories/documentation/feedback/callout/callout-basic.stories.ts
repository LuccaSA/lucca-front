import { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from '@lucca-front/ng/callout';

export default {
	title: 'Documentation/Feedback/Callout/Basic',
	component: CalloutComponent,
	render: (args: CalloutComponent & { description: string }) => {
		const { description, title, palette, size, removable, tiny, icon } = args;
		return {
			template: `
        <lu-callout title="${title}" palette="${palette}" size="${size}" [removable]="${removable}" [tiny]="${tiny}" icon="${icon}">
          ${description}
        </lu-callout>
      `,
		};
	},
	argTypes: {
		palette: {
			options: ['none', 'primary', 'grey', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		icon: {
			options: ['info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['m', 's'],
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
		title: 'Feedback or informations',
		tiny: false,
		icon: 'info',
		palette: 'none',
		size: 'm',
		removable: false,
		description: `Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a>`,
	},
};
