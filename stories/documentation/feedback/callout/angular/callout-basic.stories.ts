import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { HiddenArgType, PaletteArgType } from 'stories/helpers/common-arg-types';
import { ButtonComponent } from '@lucca-front/ng/button';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent],
		}),
	],
	render: (args: CalloutComponent & { description: string }, context) => {
		const { description, ...inputs } = args;
		return {
			template: `<lu-callout ${generateInputs(inputs, context.argTypes)}>
	${description}
</lu-callout>`,
		};
	},
	argTypes: {
		palette: PaletteArgType,
		removable: {
			description: 'Supports two-ways binding',
		},
		icon: {
			options: [null, 'info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
		},
		state: {
			options: [null, 'success', 'warning', 'error'],
			description: 'Shortcut to control both icon and palette',
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'radio',
			},
		},
		heading: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		removedChange: HiddenArgType,
	},
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		heading: 'Feedback or informations',
		size: 'M',
		state: null,
		icon: null,
		description: `Description with more details`,
		palette: 'none',
		removable: false,
		removed: false,
	},
};
