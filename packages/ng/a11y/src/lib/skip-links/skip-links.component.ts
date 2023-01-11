import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_SKIP_LINKS_TRANSLATIONS } from './skip-links.translate';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LuSkipLinksComponent {
	protected intl = getIntl(LU_SKIP_LINKS_TRANSLATIONS);

	constructor(@Inject(DOCUMENT) protected document: Document) {}

	anchor(hash: string, e: Event) {
		e.preventDefault();
		this.document.location.hash = hash;
	}
}
