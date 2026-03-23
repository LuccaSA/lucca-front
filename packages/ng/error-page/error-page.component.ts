import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LinkComponent } from '@lucca-front/ng/link';
import { ErrorPageIllustration } from './error-page.model';
import { LU_ERROR_PAGE_TRANSLATIONS } from './error-page.translate';

@Component({
	selector: 'lu-error-page',
	templateUrl: './error-page.component.html',
	styleUrl: './error-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LinkComponent],
	host: {
		class: 'errorPage',
	},
})
export class ErrorPageComponent {
	intl = input(...intlInputOptions(LU_ERROR_PAGE_TRANSLATIONS));

	readonly heading = input.required<string>();
	readonly illustration = input.required<ErrorPageIllustration>();

	readonly description = input<string>();
	readonly link = input<string>();
	readonly linkLabel = input<string>(this.intl().backPrevious);

	readonly illustrationSrc = computed(() => {
		return `https://cdn.lucca.fr/assets/lucca/errors/${this.illustration()}.svg`;
	});

	readonly #location = inject(Location);

	backToPreviousUrl(): void {
		this.#location.back();
	}
}
