import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent } from '@lucca-front/ng/forms/rich-text-input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { TextStyleComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/text-style';
import { TagDirective } from '../../../../../../packages/ng/forms/rich-text-input/plugins/tag/tag.directive';
import { TextStyleDirective } from '../../../../../../packages/ng/forms/rich-text-input/plugins/text-style/tex-style.directive';

export default {
	title: 'Documentation/Forms/Fields/RichTextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [RichTextInputComponent, TagDirective, TextStyleComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, TextStyleDirective],
		}),
	],
	argTypes: {
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
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écrans',
		},
		tags: {
			control: {
				type: 'multi-select',
			},
			options: [
				'Prenom',
				'Nom',
				'Email',
				'Téléphone',
				'Adresse',
				'Ville',
				'Code postal',
				'Pays',
				'Entreprise',
				'Poste',
				'Service',
				'Manager',
				'Collaborateur',
				'Date de naissance',
				"Date d'embauche",
				'Date de départ',
			],
			description: 'Liste de tags',
		},
	},
} as Meta;

export const Basic: StoryObj<RichTextInputComponent & { disabled: boolean } & FormFieldComponent & TagDirective> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}> 
	<lu-rich-text-input
		luWithTagsPlugin
		luWithTextStylePlugin
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-rich-text-input>
</lu-form-field>
{{example}}`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		tooltip: 'Je suis un message d’aide',
	},
};
