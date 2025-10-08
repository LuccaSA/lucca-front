import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent, CalloutActionsComponent, IconComponent],
		}),
	],
	render: (args: CalloutComponent & { description: string; actions: boolean }, context) => {
		const { description, actions, iconAlt, ...inputs } = args;

		const actionsTemplate = actions
			? `<lu-callout-actions inline>
		<button luButton="outlined">Reformuler les objectifs</button>
	</lu-callout-actions>`
			: ``;

		return {
			template: `<lu-callout AI iconAlt="${iconAlt}"${generateInputs(inputs, context.argTypes)}>
	${description}
	${actionsTemplate}
</lu-callout>`,
		};
	},
	argTypes: {
		icon: {
			options: ['weatherStars', 'officePenStar', 'bubbleStars'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Event: StoryObj<CalloutComponent & { description: string; actions: boolean }> = {
	args: {
		icon: 'weatherStars',
		description: 'Fixer des objectifs SMART',
		iconAlt: 'Assistant IA',
		actions: true,
	},
};
