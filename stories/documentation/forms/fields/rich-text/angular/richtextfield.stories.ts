import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent } from '@lucca-front/ng/forms/rich-text-input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { TagComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/tag/tag.component';
import { TextStyleComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/text-style';

export default {
	title: 'Documentation/Forms/Fields/RichTextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [RichTextInputComponent, TagComponent, TextStyleComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
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

export const Basic: StoryObj<RichTextInputComponent & { disabled: boolean } & FormFieldComponent & TagComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, tags, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					inlineMessage,
					inlineMessageState,
					size,
					tags,
				},
				argTypes,
			)}>
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
		<lu-rich-text-plugin-text-style format="bold" icon="formatTextBold"/>
		<lu-rich-text-plugin-text-style format="italic" icon="formatTextItalic"/>
		<lu-rich-text-plugin-text-style format="strikethrough" icon="formatTextStrikethrough"/>
		<lu-rich-text-plugin-text-style format="underline" icon="formatTextUnderline"/>
		<lu-rich-text-plugin-tag [tags]="[
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
'Date dembauche',
'Date de départ',
]"/>
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
