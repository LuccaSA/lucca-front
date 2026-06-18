import { Highlightable } from '@angular/cdk/a11y';
import { computed, Directive, ElementRef, inject, input, linkedSignal, model, OnDestroy, output, signal, untracked } from '@angular/core';
import { ALuSelectInputComponent } from '../input/select-input.component';
import { CoreSelectKeyManager } from './key-manager';
import { CoreSelectPanelInstance, SELECT_PANEL_INSTANCE } from './panel.instance';

@Directive({
	selector: '[luCoreSelectPanelElement]',
	exportAs: 'luCoreSelectPanelElement',
	host: {
		'[attr.id]': 'idAttribute()',
		'[attr.aria-selected]': 'isSelected()',
		'[class.is-highlighted]': 'isHighlighted()',
		'(mouseenter)': 'onMouseEnter()',
		role: 'option',
	},
})
export class CoreSelectPanelElement<T> implements Highlightable, OnDestroy {
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly #panelRef = inject<CoreSelectPanelInstance<T>>(SELECT_PANEL_INSTANCE);
	readonly #keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager, { optional: true });

	readonly #selectRef = inject<ALuSelectInputComponent<T, T>>(ALuSelectInputComponent);

	readonly id = signal<string>('');

	readonly elementId = input<string>('');

	readonly idAttribute = computed(() => this.id() || this.elementId());

	readonly isSelected = model(false);

	readonly option = input<T>();

	readonly disabledInput = input<boolean>(false, { alias: 'disabled' });

	readonly disabledRef = linkedSignal(() => this.disabledInput());

	readonly isHighlighted = signal(false);

	selected = output<void>();

	get disabled() {
		return this.disabledRef();
	}

	set disabled(disabled: boolean) {
		this.disabledRef.set(disabled);
	}

	constructor() {
		this.#panelRef.options.set([...this.#panelRef.options(), this]);
	}

	ngOnDestroy(): void {
		this.#panelRef.options.set(this.#panelRef.options().filter((opt) => opt !== this));
	}

	setActiveStyles(): void {
		this.isHighlighted.set(true);
		const option = this.option();
		if (option !== undefined) {
			this.#selectRef.highlightedOption.emit(option);
		}
	}

	setInactiveStyles(): void {
		this.isHighlighted.set(false);
	}

	onMouseEnter(): void {
		if (!this.#keyManager || this.disabled || !untracked(this.#panelRef.pointerNavigation)) {
			return;
		}

		this.#keyManager.setActiveItemByElement(this);
	}
}
