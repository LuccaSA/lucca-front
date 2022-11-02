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
		this.document.location.hash = ''; // FIXME avoids a bug but kinda ugly
		this.document.location.hash = hash;
		e.preventDefault();
	}
}
