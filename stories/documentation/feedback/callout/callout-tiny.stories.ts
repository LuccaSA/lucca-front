import { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { default as BasicStory } from './callout-basic.stories';

export default {
	...BasicStory,
	title: 'Documentation/Feedback/Callout/Tiny'
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		title: '',
		tiny: true,
		icon: 'info',
		palette: 'none',
		size: 'm',
		removable: false,
		description: `Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a>`,
	},
	argTypes: {
		description: {
			table: {
				disable: true
			}
		},
		removable: {
			table: {
				disable: true
			}
		},
		title: {
			table: {
				disable: true
			}
		},
		size: {
			table: {
				disable: true
			}
		},
		icon: {
			table: {
				disable: true
			}
		},
		palette: {
			table: {
				disable: true
			}
		},
	}
};
