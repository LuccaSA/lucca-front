import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_SKIP_LINKS_TRANSLATIONS } from './skip-links.translate';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	styleUrls: ['./skip-links.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LuSkipLinksComponent {
	#document = inject(DOCUMENT);

	protected intl = getIntl(LU_SKIP_LINKS_TRANSLATIONS);

	anchor(hash: string, e: Event) {
		e.preventDefault();
		this.#document.location.hash = '';
		this.#document.location.hash = hash;
	}
}
