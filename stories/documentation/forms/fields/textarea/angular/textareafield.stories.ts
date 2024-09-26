import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/TextAreaField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextareaInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
		size: {
			options: ['M', 'S', 'XS'],
			control: {
				type: 'select',
			},
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		rows: {
			control: { type: 'number', min: 2 },
			description: '[v18.1]',
		},
		counter: {
			description: '[v17.4]',
		},
		autoResize: {
			type: 'boolean',
		},
		scrollIntoViewOnAutoResizing: {
			type: 'boolean',
			if: { arg: 'autoResize', truthy: true },
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
	},
} as Meta;

export const Basic: StoryObj<TextareaInputComponent & { disabled: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, counter, autoResize, scrollIntoViewOnAutoResizing, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
				},
				argTypes,
			)}>
	<lu-textarea-input scrollIntoViewOnAutoResizing="${scrollIntoViewOnAutoResizing}" autoResize="${autoResize}"
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-textarea-input>
</lu-form-field>
<footer class="demoFooter footer mod-sticky">footer</footer>
`),
			moduleMetadata: {
				imports: [TextareaInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
			styles: [
				`
				.form-field {
					flex-grow: 1;
					margin-bottom: 1rem;
				}
		
				.demoFooter {
					margin: 0 -1rem -1rem;
					bottom: -1rem;
				}
					
				:host {
					display: flex;
					flex-direction: column;
					height: 20rem;
					overflow: auto;
					padding: 1rem;
					margin: -1rem;
				}`,
			],
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		counter: 0,
		autoResize: false,
		scrollIntoViewOnAutoResizing: false,
		rows: 3,
	},
};
