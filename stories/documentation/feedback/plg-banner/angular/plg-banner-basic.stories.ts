import { PLGBannerComponent } from '@lucca-front/ng/plg-banner';
import { Meta, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/PLG Banner/Angular/Basic',
	component: PLGBannerComponent,
	render: (args: PLGBannerComponent & { description: string }, context) => {
		const { description, ...inputs } = args;
		return {
			template: `
			<lu-plg-banner ${generateInputs(inputs, context.argTypes)}>
				${description}
			</lu-plg-banner>`,
		};
	},
	argTypes: {
		bannerTitle: {
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

export const Template: StoryObj<PLGBannerComponent & { description: string }> = {
	args: {
		bannerTitle: `Title`,
		description: `Description`,
		linkLabel: `Link`,
		linkURL: `https://www.google.com/`,
	},
};
