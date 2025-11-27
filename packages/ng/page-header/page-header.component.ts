import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-page-header',
	styleUrl: './page-header.component.scss',
	templateUrl: './page-header.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [PortalDirective, NgTemplateOutlet],
})
export class PageHeaderComponent {
	readonly description = input<PortalContent | null>(null);
	readonly label = input<PortalContent | null>(null);
	readonly container = input(false, { transform: booleanAttribute });

	readonly descriptionIsString = computed(() => this.isStringPortalContent(this.description()));
	readonly labelIsString = computed(() => this.isStringPortalContent(this.label()));

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
