import { Highlightable } from '@angular/cdk/a11y';
import { computed, Directive, ElementRef, inject, input, linkedSignal, model, OnDestroy, output, signal, untracked } from '@angular/core';
import { LISTBOX_INSTANCE } from '@lucca-front/ng/listbox';
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
		'(mouseover)': 'onMouseOver($event)',
		'[attr.role]': 'role()',
	},
})
export class CoreSelectPanelElement<T> implements Highlightable, OnDestroy {
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly #panelRef = inject<CoreSelectPanelInstance<T>>(SELECT_PANEL_INSTANCE);
	readonly #keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager, { optional: true });
	// Optional: an option can live outside a lu-listbox (e.g. the sticky "add option" row).
	readonly #listboxRef = inject(LISTBOX_INSTANCE, { optional: true });

	readonly #selectRef = inject<ALuSelectInputComponent<T, T>>(ALuSelectInputComponent);

	// Inside a tree listbox the semantics are carried by this host, so it must expose treeitem.
	readonly role = computed(() => (this.#listboxRef?.tree() ? 'treeitem' : 'option'));

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

	onMouseOver(event: MouseEvent): void {
		if (!this.#keyManager || this.disabled || !untracked(this.#panelRef.pointerNavigation)) {
			return;
		}

		// Tree options nest their children inside their own host, so the event bubbles through every
		// ancestor option. mouseover (unlike mouseenter) re-fires as the pointer moves, so activate
		// only the option whose own row is directly under the pointer. Keying off the row — and not
		// the host — mirrors the native `.listboxOption-content:hover`: the gap between nested options
		// lives in the wrapper, not in any row, so hovering it must not highlight the parent.
		const row = (event.target as HTMLElement).closest('.listboxOption-content');
		if (!row || row.closest('[luCoreSelectPanelElement]') !== this.elementRef.nativeElement) {
			return;
		}

		this.#keyManager.setActiveItemByElement(this);
	}
}
