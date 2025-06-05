import { Highlightable } from '@angular/cdk/a11y';
import { computed, Directive, ElementRef, inject, input, model, output, signal } from '@angular/core';
import { CoreSelectPanelInstance, SELECT_PANEL_INSTANCE } from './panel.instance';

@Directive({
	standalone: true,
	selector: '[luCoreSelectPanelElement]',
	host: {
		'[attr.id]': 'idAttribute()',
		'[attr.aria-selected]': 'isSelected()',
		'[class.is-highlighted]': 'isHighlighted()',
		role: 'option',
	},
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class CoreSelectPanelElement<T> implements Highlightable {
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly #panelRef = inject<CoreSelectPanelInstance<T>>(SELECT_PANEL_INSTANCE);

	id = signal<string>('');

	elementId = input<string>('');

	idAttribute = computed(() => this.id() || this.elementId());

	isSelected = model(false);

	option = input<T>();

	isHighlighted = signal(false);

	selected = output<void>();

	constructor() {
		this.#panelRef.options.set([...this.#panelRef.options(), this]);
	}

	setActiveStyles(): void {
		this.isHighlighted.set(true);
	}

	setInactiveStyles(): void {
		this.isHighlighted.set(false);
	}
}
