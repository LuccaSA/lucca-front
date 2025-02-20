import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import {
	ClearFormatComponent,
	HeadingsComponent,
	LinkComponent,
	ListStyleToolbarComponent,
	provideLuRichTextMarkdownFormater,
	RichTextInputComponent,
	TextStyleComponent,
	TextStyleToolbarComponent,
} from '@lucca-front/ng/forms/rich-text-input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DividerComponent } from '@lucca-front/ng/divider';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RichTextInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				RichTextInputComponent,
				HeadingsComponent,
				LinkComponent,
				ClearFormatComponent,
				TextStyleToolbarComponent,
				ListStyleToolbarComponent,
				TextStyleComponent,
				FormFieldComponent,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				StoryModelDisplayComponent,
				DividerComponent,
			],
			providers: [provideLuRichTextMarkdownFormater()],
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
				<div class="u-width100% u-displayFlex u-justifyContentSpaceBetween pr-u-gap100">
					<div class="u-displayFlex  pr-u-gap100">
						<lu-rich-text-toolbar-text-style/>
						<lu-divider [vertical]="true"/>
						<lu-rich-text-toolbar-list-style/>
						<lu-divider [vertical]="true"/>
						<lu-rich-text-plugin-headings/>
						<lu-divider [vertical]="true"/>
						<lu-rich-text-plugin-link/>
					</div>
					<lu-rich-text-plugin-clear-format/>
				</div>
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
		placeholder: 'Enter some text...',
	},
};
