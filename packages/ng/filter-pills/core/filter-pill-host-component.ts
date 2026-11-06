import { TemplateRef, WritableSignal } from '@angular/core';
import { FilterPillInputComponent } from './filter-pill-input-component';

/**
 * Contract exposed by `lu-filter-pill` to the inputs and directives it hosts.
 * Declared here rather than typing the token with `FilterPillComponent` so this entry point
 * stays independent from the components one, which depends on inputs such as `lu-multi-select`.
 */
export interface FilterPillHostComponent {
	/** Template rendering the input's value inside the pill, set by `luFilterPillDisplayer`. */
	pillTpl: TemplateRef<unknown>;

	/** Template overriding the pill's label, set by `luFilterPillLabel`. */
	readonly customLabelTpl: WritableSignal<TemplateRef<unknown> | null>;

	/** Lets an input register itself when it's too deep to be picked up by content query. */
	registerInput(input: FilterPillInputComponent): void;
}
