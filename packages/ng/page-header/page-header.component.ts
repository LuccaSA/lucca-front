import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-page-header',
	styleUrl: './page-header.component.scss',
	templateUrl: './page-header.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [PortalDirective, NgTemplateOutlet],
})
export class PageHeaderComponent {
	/**
	 * Changes the description text displayed in page header
	 */
	readonly description = input<PortalContent | null>(null);

	/**
	 * Changes the title text displayed in page header
	 */
	readonly label = input<PortalContent | null>(null);

	/**
	 * Apply a container around the content
	 */
	readonly container = input(false, { transform: luBooleanAttribute });

	readonly sticky = input(false, { transform: luBooleanAttribute });

	readonly descriptionIsString = computed(() => this.isStringPortalContent(this.description()));
	readonly labelIsString = computed(() => this.isStringPortalContent(this.label()));

	public isStringPortalContent(message: PortalContent | null): message is string {
		return typeof message === 'string';
	}
}
