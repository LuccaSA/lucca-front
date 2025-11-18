import { Highlightable } from '@angular/cdk/a11y';
import { computed, Directive, ElementRef, inject, Input, input, model, OnDestroy, output, signal } from '@angular/core';
import { CoreSelectPanelInstance, SELECT_PANEL_INSTANCE } from './panel.instance';

@Directive({
	standalone: true,
	selector: '[luCoreSelectPanelElement]',
	exportAs: 'luCoreSelectPanelElement',
	host: {
		'[attr.id]': 'idAttribute()',
		'[attr.aria-selected]': 'isSelected()',
		'[class.is-highlighted]': 'isHighlighted()',
		'[role]': 'optionRole()',
	},
})
export class CoreSelectPanelElement<T> implements Highlightable, OnDestroy {
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly #panelRef = inject<CoreSelectPanelInstance<T>>(SELECT_PANEL_INSTANCE);

	id = signal<string>('');

	elementId = input<string>('');

	idAttribute = computed(() => this.id() || this.elementId());

	isSelected = model(false);

	option = input<T>();

	optionRole = input<'option' | 'treeitem'>('option');

	isHighlighted = signal(false);

	selected = output<void>();

	// We have to use input here because this is consumed by ActiveKeyManager, which doesn't use a signal
	@Input()
	disabled: boolean;

	constructor() {
		this.#panelRef.options.set([...this.#panelRef.options(), this]);
	}

	ngOnDestroy(): void {
		this.#panelRef.options.set(this.#panelRef.options().filter((opt) => opt !== this));
	}

	setActiveStyles(): void {
		this.isHighlighted.set(true);
	}

	setInactiveStyles(): void {
		this.isHighlighted.set(false);
	}
}
