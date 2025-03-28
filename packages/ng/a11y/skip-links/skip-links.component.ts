import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LU_SKIP_LINKS_TRANSLATIONS } from './skip-links.translate';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	styleUrls: ['./skip-links.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	encapsulation: ViewEncapsulation.None,
})
export class LuSkipLinksComponent {
	#document = inject(DOCUMENT);

	protected intl = input(...intlInputOptions(LU_SKIP_LINKS_TRANSLATIONS));

	anchor(hash: string, e: Event) {
		e.preventDefault();
		this.#document.location.hash = '';
		this.#document.location.hash = hash;
	}
}
