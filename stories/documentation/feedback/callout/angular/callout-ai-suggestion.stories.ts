import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [
				CalloutComponent,
				CalloutFeedbackItemComponent,
				CalloutFeedbackListComponent,
				ButtonComponent,
				CalloutActionsComponent,
				IconComponent,
				FormFieldComponent,
				TextInputComponent,
				FormsModule,
				ReactiveFormsModule,
			],
		}),
	],
	render: (args: CalloutComponent & { description: string }, context) => {
		const { description, iconAlt, ...inputs } = args;

		return {
			props: { example: 'Formulaires : utiliser le bon composant pour le bon besoin' },
			template: `<div class="suggestion">
	<lu-form-field label="Intitulé" class="suggestion-form-field">
		<lu-text-input required type="text" [(ngModel)]="example" />
	</lu-form-field>
	<lu-callout AI iconAlt="${iconAlt}"${generateInputs(inputs, context.argTypes)} class="suggestion-callout">
		<div class="suggestion-callout-text">${description}</div>
		<lu-callout-actions inline>
			<button luButton="outlined" class="suggestion-callout-accept"><lu-icon icon="signConfirm" alt="Accepter" /></button>
			<button luButton="outlined" class="suggestion-callout-reject"><lu-icon icon="signClose" alt="Refuser" /></button>
		</lu-callout-actions>
	</lu-callout>
</div>`,
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

export const Suggestion: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		icon: 'weatherStars',
		description: 'Optimiser l’utilisation des composants de formulaire selon les besoins',
		iconAlt: 'Assistant IA',
	},
};
