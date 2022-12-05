import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LuSkipLinksIntl } from './skip-links.intl';
import { ILuSkipLinksLabel } from './skip-links.translate';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [LuSkipLinksIntl],
})
export class LuSkipLinksComponent {
	constructor(@Inject(DOCUMENT) protected document: Document, @Inject(LuSkipLinksIntl) protected intl: ILuSkipLinksLabel) {}

	anchor(hash: string, e: Event) {
		e.preventDefault();
		this.document.location.hash = hash;
	}
}
