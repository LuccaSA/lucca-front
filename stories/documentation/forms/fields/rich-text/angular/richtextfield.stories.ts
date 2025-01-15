import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import {
	ClearFormatComponent,
	HeadingsComponent,
	LinkComponent,
	ListFormatComponent,
	ListStyleToolbarComponent,
	RichTextInputComponent,
	TagComponent,
	TextStyleComponent,
	TextStyleToolbarComponent,
} from '@lucca-front/ng/forms/rich-text-input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RichTextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				RichTextInputComponent,
				HeadingsComponent,
				LinkComponent,
				ClearFormatComponent,
				TextStyleToolbarComponent,
				ListStyleToolbarComponent,
				ListFormatComponent,
				TagComponent,
				TextStyleComponent,
				FormFieldComponent,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				StoryModelDisplayComponent,
			],
		}),
	],
	argTypes: {
		example: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<RichTextInputComponent & { disabled: boolean; example: string } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { example, ...inputArgs } = args;
		return {
			props: { example },
			template: cleanupTemplate(`<lu-form-field label="toto">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
			<lu-rich-text-toolbar-text-style/>
			<lu-rich-text-plugin-tag [tags]="['Prenom',
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
				<lu-rich-text-toolbar-list-style/>
				<lu-rich-text-plugin-headings/>
				<lu-rich-text-plugin-link/>
				<lu-rich-text-plugin-clear-format/>
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{example}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		example: '*italic* **bold**',
	},
};
