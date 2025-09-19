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
	render: (args: CalloutComponent & { description: string }, context) => {
		const { description, iconAlt, ...inputs } = args;

		return {
			template: `<lu-callout AI iconAlt="${iconAlt}"${generateInputs(inputs, context.argTypes)}>
	${description}
	<lu-callout-actions>
		<button luButton="outlined">Associer</button>
		<button luButton="outlined">Refuser</button>
	</lu-callout-actions>
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

export const Action: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		icon: 'weatherStars',
		description: '<strong>Achat détecté :</strong> la facture correspond à l’<a href="#">achat nº 832</a>',
		iconAlt: 'Assistant IA',
	},
};
