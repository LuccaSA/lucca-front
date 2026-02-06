import { Directive } from '@angular/core';
import { provideLuRichTextHTMLFormatter } from './html-formatter';

@Directive({
	selector: 'lu-rich-text-input[luWithHtmlFormatter]',
	providers: [provideLuRichTextHTMLFormatter()],
})
export class HtmlFormatterDirective {}
