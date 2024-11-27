import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent } from '@lucca-front/ng/forms/rich-text-input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { TextStyleComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/text-style';
import { TagComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/tag/tag.component';
import { ListFormatComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/list-format';
import { TextStyleToolbarComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/text-style/text-style-toolbar.component';
import { ListStyleToolbarComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/list-format/list-style-toolbar.component';
import { HeadingsComponent } from '../../../../../../packages/ng/forms/rich-text-input/plugins/headings';

export default {
	title: 'Documentation/Forms/Fields/RichTextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				RichTextInputComponent,
				HeadingsComponent,
				TextStyleToolbarComponent,
				ListStyleToolbarComponent,
				ListFormatComponent,
				TagComponent,
				TextStyleComponent,
				FormFieldComponent,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
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
			template: cleanupTemplate(`<lu-form-field ${generateInputs({}, argTypes)}> 
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
	</lu-rich-text-input>
</lu-form-field>
{{example}}`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		example: '*italic* **bold**',
	},
};
