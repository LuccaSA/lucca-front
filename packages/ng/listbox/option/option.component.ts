import { ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
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
		'[attr.role]': 'group() ? "group" : tree() ? "treeitem" : "option"',
		'[attr.aria-labelledby]': 'group() ? groupLabelId() : null',
		'[attr.aria-checked]': ' add() ? null : mixed() ? "mixed" : checked()',
		'[attr.aria-disabled]': 'disabled()',
		'[attr.aria-hidden]': 'empty()',
		// The empty status option is the target of the listbox `aria-describedby`, so it must
		// carry the listbox id even though no consumer sets an elementId on it.
		'[attr.id]': 'empty() ? id() : elementId()',
		'[class.is-selected]': 'checked()',
		'[class.is-disabled]': 'disabled()',
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

	readonly elementId = input<string | null>(null);

	readonly checked = input(false, { transform: luBooleanAttribute });

	readonly mixed = input(false, { transform: luBooleanAttribute });

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly hovered = input(false, { transform: luBooleanAttribute });

	readonly add = input(false, { transform: luBooleanAttribute });

	readonly group = input(false, { transform: luBooleanAttribute });

	/**
	 * Overrides the generated id used to label the group, so consumers can provide
	 * a deterministic id (e.g. derived from a select id and a group key).
	 */
	readonly groupId = input<string | null>(null);

	readonly select = input(false, { transform: luBooleanAttribute });

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
