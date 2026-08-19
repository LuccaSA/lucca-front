import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LISTBOX_INSTANCE, OPTION_INSTANCE } from '../tokens';

let nextId = 0;

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[treeitem]',
})
export class Treeitem {}

@Component({
	selector: 'lu-listbox-option',
	templateUrl: './option.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'listboxOption',
		'[attr.role]': 'presentation() ? null : group() ? "group" : tree() ? "treeitem" : "option"',
		'[attr.aria-labelledby]': 'group() ? groupLabelId() : null',
		'[attr.aria-checked]': 'presentation() || add() ? null : mixed() ? "mixed" : checked()',
		'[attr.aria-disabled]': 'presentation() ? null : disabled()',
		'[attr.aria-hidden]': 'empty()',
		'[attr.id]': 'empty() ? id() : null',
		'[class.is-selected]': 'presentation() && checked()',
		'[class.is-disabled]': 'presentation() && disabled()',
		'[class.mod-add]': 'add()',
		'[class.mod-select]': 'select()',
	},
	imports: [IconComponent],
	providers: [{ provide: OPTION_INSTANCE, useExisting: forwardRef(() => OptionComponent) }],
})
export class OptionComponent {
	// Optional so the option can live outside a lu-listbox, e.g. a sticky "add option" row
	// rendered next to the listbox but inside the same scroll container.
	#listboxRef = inject(LISTBOX_INSTANCE, { optional: true });
	#parentOptionRef = inject(OPTION_INSTANCE, { skipSelf: true, optional: true });

	/**
	 * When true, the option is a purely visual layer: it carries no role nor aria attributes.
	 * The semantics (role, aria-selected, id) must then be carried by an ancestor element,
	 * e.g. the host of a select panel element directive. Selection and disabled states are
	 * exposed through the `is-selected` and `is-disabled` classes instead of aria attributes.
	 */
	readonly presentation = input(false, { transform: booleanAttribute });

	readonly checked = input(false, { transform: booleanAttribute });

	readonly mixed = input(false, { transform: booleanAttribute });

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly hovered = input(false, { transform: booleanAttribute });

	readonly add = input(false, { transform: booleanAttribute });

	readonly group = input(false, { transform: booleanAttribute });

	/**
	 * Overrides the generated id used to label the group, so consumers can provide
	 * a deterministic id (e.g. derived from a select id and a group key).
	 */
	readonly groupId = input<string | null>(null);

	readonly select = input(false, { transform: booleanAttribute });

	readonly selectAll = input<'string' | null>();

	readonly multiple = computed(() => this.#listboxRef?.multiple() ?? false);
	readonly tree = computed(() => this.#listboxRef?.tree() ?? false);
	readonly empty = computed(() => this.#listboxRef?.state() === 'empty');
	readonly id = computed(() => this.#listboxRef?.listboxId ?? null);

	readonly groupLabelId = computed(() => this.groupId() ?? this.#defaultGroupId);

	readonly #defaultGroupId = `group${nextId++}`;

	readonly treeitemContent = contentChild(Treeitem);

	readonly level: number = (this.#parentOptionRef?.level || 0) + 1;
}
