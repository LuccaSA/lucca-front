import { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { default as BasicStory } from './callout-basic.stories';

export default {
	...BasicStory,
	title: 'Documentation/Feedback/Callout/Killable'
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		title: 'Feedback or informations',
		tiny: false,
		icon: 'info',
		palette: 'none',
		size: 'M',
		removable: true,
		description: `Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a>`,
	},
	argTypes: {
		description: {
			table: {
				disable: true
			}
		},
		tiny: {
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
