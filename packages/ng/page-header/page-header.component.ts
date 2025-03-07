import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-page-header',
	standalone: true,
	styleUrls: ['./page-header.component.scss'],
	templateUrl: './page-header.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective],
})
export class PageHeaderComponent {
	description = input<PortalContent | null>(null);

	descriptionIsString = computed(() => this.isStringPortalContent(this.description()));

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
