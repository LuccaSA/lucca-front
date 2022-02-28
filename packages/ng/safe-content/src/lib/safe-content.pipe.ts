import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { LuSafeContentType } from './safe-content.model';

@Pipe({ name: 'luSafeContent' })
export class LuSafeContentPipe implements PipeTransform {
	constructor(protected sanitizer: DomSanitizer) {}

	public transform(value: string, type: LuSafeContentType = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'html':
				return this.sanitizer.bypassSecurityTrustHtml(value);
			case 'style':
				return this.sanitizer.bypassSecurityTrustStyle(value);
			case 'script':
				return this.sanitizer.bypassSecurityTrustScript(value);
			case 'url':
				return this.sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl':
				return this.sanitizer.bypassSecurityTrustResourceUrl(value);
		}
	}
}
