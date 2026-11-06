import { ITALIC_STAR, ITALIC_UNDERSCORE, LINK } from '@lexical/markdown';
import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LinkComponent, RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent, TextStyleComponent } from '@lucca-front/ng/forms/rich-text-input';
import { MarkdownFormatterWithTagsDirective, provideLuRichTextMarkdownFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';

// Default markdown transformers need list/heading nodes only the missing toolbar plugins register, which crashes the editor.
@Directive({
	selector: 'lu-rich-text-input[luWithReducedMarkdownFormatter]',
	providers: [provideLuRichTextMarkdownFormatter([ITALIC_STAR, ITALIC_UNDERSCORE, LINK])],
})
class ReducedMarkdownFormatterDirective {}

@Component({
	selector: 'rich-text-input-stories',
	templateUrl: './rich-text-input.stories.html',
	imports: [
		FormFieldComponent,
		RichTextInputComponent,
		RichTextInputToolbarComponent,
		RichTextPluginTagComponent,
		MarkdownFormatterWithTagsDirective,
		TextStyleComponent,
		LinkComponent,
		ReducedMarkdownFormatterDirective,
		FormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RichTextInputStory {
	value = 'Lorem **ipsum** [dolor](https://example.com) *sit amet*, with a wrogn word, {{tag1}} and {{tag2}}:\n- First item\n- Second item\n- Third item';
	tags = [
		{ key: 'tag1', description: 'Tag 1' },
		{ key: 'tag2', description: 'Tag 2' },
		{ key: 'tag3', description: 'Tag 3' },
	];
}

export default {
	title: 'QA/RichTextInput',
	component: RichTextInputStory,
	decorators: [
		moduleMetadata({
			providers: [provideLuRichTextMarkdownFormatter()],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
} as Meta;

export const Basic = {};
