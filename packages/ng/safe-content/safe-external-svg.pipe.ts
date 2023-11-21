import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sanitize } from 'dompurify';
import { Subscription, map } from 'rxjs';

@Pipe({
	name: 'luSafeExternalSvg',
	standalone: true,
	pure: false,
})
export class LuSafeExternalSvgPipe implements PipeTransform {
	#httpClient = inject(HttpClient);
	#domSanitizer = inject(DomSanitizer);
	#cdr = inject(ChangeDetectorRef);
	#lastSvgUrl?: string;
	#lastSvgValue: SafeHtml = '';
	#subscription?: Subscription;

	transform(url: string): SafeHtml {
		if (url !== this.#lastSvgUrl) {
			this.#lastSvgUrl = url;
			this.#subscribeToSvg(url);
		}

		return this.#lastSvgValue;
	}

	#subscribeToSvg(url: string) {
		this.#subscription?.unsubscribe();
		this.#subscription = this.#httpClient
			.get(url, { responseType: 'text' })
			.pipe(
				map((svg) => sanitize(svg, { USE_PROFILES: { svg: true } })),
				map((svg) => this.#domSanitizer.bypassSecurityTrustHtml(svg)),
			)
			.subscribe((svg) => {
				this.#lastSvgValue = svg;
				this.#cdr.markForCheck();
			});
	}
}
