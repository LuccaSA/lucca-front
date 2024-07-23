import { PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/PLG Push/Angular/Basic',
	component: PLGPushComponent,
	render: (args: PLGPushComponent & { description: string }, context) => {
		const { description, ...inputs } = args;
		return {
			template: `
			<lu-plg-push ${generateInputs(inputs, context.argTypes)}>
				${description}
			</lu-plg-push>`,
		};
	},
	argTypes: {
		pushTitle: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		linkLabel: {
			type: 'string',
		},
		linkURL: {
			type: 'string',
		},
	},
} as Meta;

export const Template: StoryObj<PLGPushComponent & { description: string }> = {
	args: {
		pushTitle: `Title`,
		description: `Description`,
		linkLabel: `Link`,
		linkURL: `https://www.google.com/`,
	},
};
