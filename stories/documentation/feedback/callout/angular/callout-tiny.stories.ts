import { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { default as BasicStory } from './callout-basic.stories';
import { HiddenArgType } from '../../../../helpers/common-arg-types';

export default {
	...BasicStory,
	title: 'Documentation/Feedback/Callout/Angular/Tiny',
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		heading: '',
		tiny: true,
		icon: 'info',
		palette: 'none',
		size: 'M',
		removable: false,
		description: `Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a>`,
	},
	argTypes: {
		description: HiddenArgType,
		removable: HiddenArgType,
		heading: HiddenArgType,
		size: HiddenArgType,
		icon: HiddenArgType,
		palette: HiddenArgType,
	},
};