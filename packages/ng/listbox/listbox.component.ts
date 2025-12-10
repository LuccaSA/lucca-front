import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';

import { LoadingComponent } from '@lucca-front/ng/loading';
import { OptionComponent } from './option/option.component';
import { LISTBOX_INSTANCE } from './tokens';

let nextId = 0;

@Component({
	selector: 'lu-listbox',
	templateUrl: './listbox.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'listboxOptionWrapper',
		'[attr.role]': 'tree() ? "tree" : "listbox"',
		'[class.mod-multiple]': 'multiple()',
		'[attr.aria-busy]': 'state() === "loading"',
		'[attr.aria-describedby]': 'state() === "empty" ? listboxId : null',
	},
	imports: [OptionComponent, LoadingComponent],
	providers: [{ provide: LISTBOX_INSTANCE, useExisting: forwardRef(() => ListboxComponent) }],
})
export class ListboxComponent {
	readonly multiple = input(false, { transform: booleanAttribute });
	readonly tree = input(false, { transform: booleanAttribute });
	readonly state = input<'loading' | 'empty' | null>(null);
	readonly statusMsg = input<string | null>(null);

	readonly listboxId = `listbox${nextId++}`;
}
