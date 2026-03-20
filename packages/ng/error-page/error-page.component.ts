import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { LinkComponent } from '@lucca-front/ng/link';
import { PortalContent } from '../core/portal';
import { ErrorPageImage } from './error-page.model';

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
	readonly heading = input.required<PortalContent>();
	readonly img = input.required<ErrorPageImage>();

	readonly description = input<PortalContent>();
	readonly link = input<string>();
	// TODO: i18n
	readonly linkLabel = input<string>('Revenir à la page précédente');
	readonly imgAlt = input('');

	readonly #location = inject(Location);

	readonly imgSrc = computed(() => {
		return `https://cdn.lucca.fr/assets/lucca/errors/${this.img()}.svg`;
	});

	backToPreviousUrl(): void {
		this.#location.back();
	}
}
