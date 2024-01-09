import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Config, sanitize } from 'dompurify';

type SanitizerConfig = Config & { RETURN_DOM_FRAGMENT?: false | undefined; RETURN_DOM?: false | undefined };

@Pipe({ name: 'luSafeHtml', standalone: true })
export class LuSafeHtmlPipe implements PipeTransform {
	constructor(protected sanitizer: DomSanitizer) {}

	public transform(value: string, config?: SanitizerConfig): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(sanitize(value, config));
	}
}
