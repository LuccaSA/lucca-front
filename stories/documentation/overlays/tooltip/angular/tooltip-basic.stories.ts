import { TooltipDirective } from '@lucca-front/ng/tooltipv2';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Overlays/Tooltip/Angular/Basic',
	component: TooltipDirective,
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
	render: (args: TooltipDirective & { description: string }, context) => {
		const { description, ...inputs } = args;
		return {
			template: `<span luTooltip="Ipsum">Lorem</span>`,
		};
	},
	argTypes: {},
} as Meta;

export const Template: StoryObj<TooltipDirective & { description: string }> = {
	args: {},
};
