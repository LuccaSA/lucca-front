import { Directive } from '@angular/core';
import { provideLuRichTextPlainTextFormatter } from './plain-text-formatter';

@Directive({
	selector: 'lu-rich-text-input[luWithPlainTextTagsFormatter]',
	providers: [provideLuRichTextPlainTextFormatter()],
})
export class PlainTextFormatterWithTagsDirective {}
