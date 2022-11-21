import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LuSkipLinksComponent {
	constructor(@Inject(DOCUMENT) protected document: Document) {}

	anchor(hash: string, e: Event) {
		e.preventDefault();
		this.document.location.hash = hash;
	}
}
