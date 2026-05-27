import { ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';

import { luBooleanAttribute } from '@lucca-front/ng/core';
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
	/**
	 * Applies multiple mod to the listbox
	 */
	readonly multiple = input(false, { transform: luBooleanAttribute });

	/**
	 * Defines listbox role tree or listbox by default
	 */
	readonly tree = input(false, { transform: luBooleanAttribute });

	/**
	 * Listbox state
	 */
	readonly state = input<'loading' | 'empty' | null>(null);

	/**
	 * Add message when listbox state loading or empty
	 */
	readonly statusMsg = input<string | null>(null);

	readonly listboxId = `listbox${nextId++}`;
}
