import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { OptionComponent } from './option/option.component';
import { LISTBOX_INSTANCE } from './tokens';

@Component({
	selector: 'lu-listbox',
	standalone: true,
	templateUrl: './listbox.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[role]': 'tree() ? "tree" : "listbox"',
		class: 'optionWrapper',
		'[class.mod-multiple]': 'multiple()',
		'[attr.aria-busy]': 'state() === "loading"',
	},
	imports: [OptionComponent, LoadingComponent],
	providers: [{ provide: LISTBOX_INSTANCE, useExisting: forwardRef(() => ListboxComponent) }],
})
export class ListboxComponent {
	multiple = input(false, { transform: booleanAttribute });
	tree = input(false, { transform: booleanAttribute });
	state = input<'loading' | 'empty' | null>(null);
	statusMsg = input<string | null>(null);
}
