import { booleanAttribute, Component, computed, contentChild, Directive, inject, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LISTBOX_INSTANCE } from '../tokens';

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
		'[attr.aria-checked]': 'checked()',
		'[attr.aria-disabled]': 'disabled()',
		'[class.mod-add]': 'add()',
		'[class.mod-select]': 'select()',
		'[attr.aria-labelledby]': 'groupId',
	},
	imports: [IconComponent],
})
export class OptionComponent {
	#listboxRef = inject(LISTBOX_INSTANCE);

	multiple = computed(() => this.#listboxRef.multiple());
	tree = computed(() => this.#listboxRef.tree());

	checked = input(false, { transform: booleanAttribute });
	disabled = input(false, { transform: booleanAttribute });
	hovered = input(false, { transform: booleanAttribute });
	add = input(false, { transform: booleanAttribute });
	group = input(false, { transform: booleanAttribute });
	select = input(false, { transform: booleanAttribute });
	selectAll = input<'string' | null>();

	groupId = `group${nextId++}`;

	treeitemContent = contentChild(Treeitem);

	level = input<number | null>(null);
}
