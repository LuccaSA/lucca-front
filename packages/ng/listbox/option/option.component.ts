import { ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
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
		'[attr.aria-selected]': 'add() || group() || mixed() ? null : checked()',
		'[attr.aria-checked]': '!group() && mixed() ? "mixed" : null',
		'[attr.aria-disabled]': 'disabled()',
		'[attr.aria-hidden]': 'empty()',
		// The empty status option is the target of the listbox `aria-describedby`, so it must
		// carry the listbox id even though no consumer sets an elementId on it.
		'[attr.id]': 'empty() ? id() : elementId()',
		'[class.mod-collapsible]': 'collapsible()',
		'[class.is-expanded]': 'collapsible() && expanded()',
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

	/**
	 * Lets this option fold the `[treeitem]` children it holds: a chevron is rendered before the
	 * checkbox and the children are hidden while collapsed. Off by default, so a tree that shows
	 * every level at once keeps doing so.
	 *
	 * Whether a row can hold children is the consumer’s call, not this component’s: with children
	 * fetched on unfold, an empty row is not a leaf.
	 */
	readonly collapsible = input(false, { transform: luBooleanAttribute });

	/**
	 * Whether the folded children are shown. Two-way: the chevron toggles it, and a consumer can
	 * drive it — to expand the options a search matched, for instance. Only read when
	 * `collapsible` is set and the option actually holds children.
	 */
	readonly expanded = model(false);

	/**
	 * Accessible name of the chevron. The icon is decorative and the row name lives in projected
	 * content this component cannot read, so the consumer composes the whole label — “Unfold Lucca
	 * SAS” rather than a bare “Unfold”.
	 */
	readonly disclosureLabel = input<string | null>(null);

	readonly selectAll = input<'string' | null>();

	readonly multiple = computed(() => this.#listboxRef?.multiple() ?? false);
	readonly tree = computed(() => this.#listboxRef?.tree() ?? false);
	readonly empty = computed(() => this.#listboxRef?.state() === 'empty');
	readonly id = computed(() => this.#listboxRef?.listboxId ?? null);

	readonly groupLabelId = computed(() => this.groupId() ?? this.#defaultGroupId);

	readonly #defaultGroupId = `group${nextId++}`;

	readonly treeitemContent = contentChild(Treeitem);

	/**
	 * Depth of the nested `[treeitem]` wrapper, for consumers that hand their own projected
	 * content over to this option: a content query does not cross an `ng-content` boundary, so
	 * the option can then neither see those children nor derive the depth it sits at. Setting it
	 * renders the wrapper and pins its level; leave it null to let both be worked out here.
	 */
	readonly treeitemLevel = input<number | null>(null);

	readonly level: number = (this.#parentOptionRef?.level || 0) + 1;

	readonly hasTreeitems = computed(() => !!this.treeitemContent() || this.treeitemLevel() !== null);

	readonly wrapperLevel = computed(() => this.treeitemLevel() ?? this.level);

	toggleExpanded(event: Event): void {
		// The row itself toggles the selection, so the chevron must not reach it.
		event.stopPropagation();
		this.expanded.set(!this.expanded());
	}
}
