import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-page-header',
	standalone: true,
	styleUrls: ['./page-header.component.scss'],
	templateUrl: './page-header.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, NgTemplateOutlet],
})
export class PageHeaderComponent {
	description = input<PortalContent | null>(null);
	label = input<PortalContent | null>(null);
	container = input<boolean, boolean>(false, { transform: booleanAttribute });

	descriptionIsString = computed(() => this.isStringPortalContent(this.description()));
	labelIsString = computed(() => this.isStringPortalContent(this.label()));

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
