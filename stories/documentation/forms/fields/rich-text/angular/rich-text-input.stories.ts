import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { provideLuRichTextMarkdownFormatter, RichTextInputComponent, RichTextInputToolbarComponent } from '@lucca-front/ng/forms/rich-text-input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RichTextInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [RichTextInputToolbarComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent, DividerComponent],
			providers: [provideLuRichTextMarkdownFormatter()],
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
			template: cleanupTemplate(`<lu-form-field label="Label">
	<lu-rich-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
			<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{example}}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [RichTextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		example: 'Lorem **ipsum** dolor',
		placeholder: 'Placeholder…',
	},
};
