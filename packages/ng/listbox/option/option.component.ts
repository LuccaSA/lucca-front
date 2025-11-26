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
		'[attr.role]': 'group() ? "group" : tree() ? "treeitem" : "option"',
		'[attr.aria-labelledby]': 'group() ? groupId : null',
		'[attr.aria-checked]': 'mixed() ? "mixed" : checked()',
		'[attr.aria-disabled]': 'disabled()',
		'[attr.aria-hidden]': 'empty()',
		'[attr.id]': 'empty() ? id() : null',
		'[class.mod-add]': 'add()',
		'[class.mod-select]': 'select()',
	},
	imports: [IconComponent],
	providers: [{ provide: OPTION_INSTANCE, useExisting: forwardRef(() => OptionComponent) }],
})
export class OptionComponent {
	#listboxRef = inject(LISTBOX_INSTANCE);
	#parentOptionRef = inject(OPTION_INSTANCE, { skipSelf: true, optional: true });

	readonly multiple = computed(() => this.#listboxRef.multiple());
	readonly tree = computed(() => this.#listboxRef.tree());
	readonly empty = computed(() => this.#listboxRef.state() === 'empty');
	readonly id = computed(() => this.#listboxRef.listboxId);

	readonly checked = input(false, { transform: booleanAttribute });
	readonly mixed = input(false, { transform: booleanAttribute });
	readonly disabled = input(false, { transform: booleanAttribute });
	readonly hovered = input(false, { transform: booleanAttribute });
	readonly add = input(false, { transform: booleanAttribute });
	readonly group = input(false, { transform: booleanAttribute });
	readonly select = input(false, { transform: booleanAttribute });
	readonly selectAll = input<'string' | null>();

	readonly groupId = `group${nextId++}`;

	readonly treeitemContent = contentChild(Treeitem);

	readonly level: number = (this.#parentOptionRef?.level || 0) + 1;
}
