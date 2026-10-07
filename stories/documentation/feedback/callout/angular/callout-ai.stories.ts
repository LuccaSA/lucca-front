import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent, luCalloutTranslations } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent, CalloutActionsComponent, IconComponent],
		}),
	],
	render: (args: CalloutComponent & { description: string }, context) => {
		const { description, ...inputs } = args;

		return {
			template: `<lu-callout AI${generateInputs(inputs, context.argTypes)}>
	<p>${description}</p>
</lu-callout>`,
		};
	},
	argTypes: {
		icon: {
			options: ['weatherStars', 'officePenStar', 'bubbleStars'],
			control: {
				type: 'select',
			},
			description: 'Modifie l’icône IA du callout.',
			table: { category: 'inputs' },
		},
		iconAlt: {
			description: 'Information restituée par le lecteur d’écran pour l’icône.',
			table: { category: 'inputs' },
		},
		description: {
			description: 'Contenu du callout.',
			table: { category: 'story' },
		},
		intl: intlArgType(luCalloutTranslations, 'LuCalloutLabel'),
	},
} as Meta;

export const Basic: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		icon: 'weatherStars',
		description: 'Des champs ont été pré-remplis après analyse.',
		iconAlt: 'Assistant IA',
	},
};
