import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_DATA_PRESENTATION_LIST_INSTANCE } from '../data-presentation-list/data-presentation-list.token';

@Component({
	selector: 'lu-data-presentation, div[luDataPresentation]',
	imports: [NgTemplateOutlet, PortalDirective],
	templateUrl: './data-presentation.component.html',
	styleUrl: './data-presentation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.presentation]': 'groupHost',
		'[class.mod-S]': 'groupHost && resolvedSize() === "S"',
	},
})
export class DataPresentationComponent {
	#host = inject<ElementRef<HTMLElement>>(ElementRef);
	#listRef = inject(LU_DATA_PRESENTATION_LIST_INSTANCE, { optional: true });

	readonly label = input.required<PortalContent>();
	readonly noValue = input(false, { transform: luBooleanAttribute });
	readonly size = input<'S' | null>(null);

	protected readonly groupHost = this.#host.nativeElement.tagName !== 'LU-DATA-PRESENTATION';

	protected readonly resolvedSize = computed(() => this.size() ?? this.#listRef?.size() ?? null);

	constructor() {
		afterNextRender(() => this.#warnOnInvalidUsage());
	}

	#warnOnInvalidUsage(): void {
		if (!this.groupHost && this.#listRef) {
			console.warn('[Data Presentation] Inside `lu-data-presentation-list`, use `<div luDataPresentation>`: a custom element is not valid inside a `dl`.');
		}
		if (this.groupHost && !this.#listRef && this.#host.nativeElement.parentElement?.tagName !== 'DL') {
			console.warn('[Data Presentation] `<div luDataPresentation>` must live inside a description list, use `<lu-data-presentation>` for a standalone value.');
		}
	}
}
