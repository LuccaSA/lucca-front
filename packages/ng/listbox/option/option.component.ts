import { booleanAttribute, Component, computed, contentChild, Directive, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
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
	standalone: true,
	templateUrl: './option.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'option',
		'[attr.role]': 'group() ? "group" : tree() ? "treeitem" : "option"',
		'[attr.aria-labelledby]': 'group() ? groupId : null',
		'[attr.aria-checked]': 'checked()',
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

	multiple = computed(() => this.#listboxRef.multiple());
	tree = computed(() => this.#listboxRef.tree());
	empty = computed(() => this.#listboxRef.state() === 'empty');
	id = computed(() => this.#listboxRef.listboxId);

	checked = input(false, { transform: booleanAttribute });
	disabled = input(false, { transform: booleanAttribute });
	hovered = input(false, { transform: booleanAttribute });
	add = input(false, { transform: booleanAttribute });
	group = input(false, { transform: booleanAttribute });
	select = input(false, { transform: booleanAttribute });
	selectAll = input<'string' | null>();

	groupId = `group${nextId++}`;

	treeitemContent = contentChild(Treeitem);

	level: number = (this.#parentOptionRef?.level || 0) + 1;
}
