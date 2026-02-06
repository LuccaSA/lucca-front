import { Directive } from '@angular/core';
import { DEFAULT_MARKDOWN_TRANSFORMERS, provideLuRichTextMarkdownFormatter } from './markdown-formatter';
import { TAGS } from './transformers';

@Directive({
	selector: 'lu-rich-text-input[luWithMarkdownFormatter]',
	providers: [provideLuRichTextMarkdownFormatter()],
})
export class MarkdownFormatterDirective {}

@Directive({
	selector: 'lu-rich-text-input[luWithMarkdownTagsFormatter]',
	providers: [provideLuRichTextMarkdownFormatter([...DEFAULT_MARKDOWN_TRANSFORMERS, TAGS])],
})
export class MarkdownFormatterWithTagsDirective {}
