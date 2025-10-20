import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';

import { LoadingComponent } from '@lucca-front/ng/loading';
import { OptionComponent } from './option/option.component';
import { LISTBOX_INSTANCE } from './tokens';

let nextId = 0;

@Component({
	selector: 'lu-listbox',
	templateUrl: './listbox.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'listboxOptionWrapper',
		'[role]': 'tree() ? "tree" : "listbox"',
		'[class.mod-multiple]': 'multiple()',
		'[attr.aria-busy]': 'state() === "loading"',
		'[attr.aria-describedby]': 'state() === "empty" ? listboxId : null',
	},
	imports: [OptionComponent, LoadingComponent],
	providers: [{ provide: LISTBOX_INSTANCE, useExisting: forwardRef(() => ListboxComponent) }],
})
export class ListboxComponent {
	multiple = input(false, { transform: booleanAttribute });
	tree = input(false, { transform: booleanAttribute });
	state = input<'loading' | 'empty' | null>(null);
	statusMsg = input<string | null>(null);

	listboxId = `listbox${nextId++}`;
}
