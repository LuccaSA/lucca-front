import { ChangeDetectionStrategy, Component, computed, input, model, output, signal, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions } from '@lucca-front/ng/core';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_FILTER_PILLS_TRANSLATIONS } from '../filter-pills.translate';

// Same convention as `lu-select` (see @lucca-front/ng/core-select). Duplicated locally because core-select
// depends on filter-pills, so importing it here would introduce a circular dependency between entry points.
export type LuOptionComparer<T> = (a: T, b: T) => boolean;
export const filterViewDefaultOptionComparer: LuOptionComparer<unknown> = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const filterViewDefaultOptionKey: (option: unknown) => unknown = (option) => option;

@Component({
	selector: 'lu-filter-view-selector',
	imports: [ButtonComponent, IconComponent, LuDropdownTriggerDirective, DropdownMenuComponent, DropdownItemComponent, DropdownActionComponent],
	templateUrl: './filter-view-selector.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'filterBar-viewSelector',
	},
})
export class FilterViewSelectorComponent<T> {
	readonly intl = input(...intlInputOptions(LU_FILTER_PILLS_TRANSLATIONS));

	/** The list of saved views to pick from. */
	readonly views = input.required<T[]>();

	/** The currently selected view (two-way bindable). */
	readonly selectedView = model<T | null>(null);

	/** How to display a view. Defaults to reading its `name` property. */
	readonly viewLabel = input<(view: T) => string>((view) => (view as { name: string }).name);

	/** How to compare two views for selection. Same convention as `lu-select` — defaults to a structural comparison. */
	readonly optionComparer = input<LuOptionComparer<T>>(filterViewDefaultOptionComparer);

	/** Stable identity used for `@for` tracking. Same convention as `lu-select` — defaults to identity. */
	readonly optionKey = input<(view: T) => unknown>(filterViewDefaultOptionKey);

	/** Emitted when the user asks to rename a view. */
	readonly renameView = output<T>();

	/** Emitted when the user asks to delete a view. */
	readonly deleteView = output<T>();

	protected readonly opened = signal(false);

	protected readonly selectedLabel = computed(() => {
		const selected = this.selectedView();
		return selected != null ? this.viewLabel()(selected) : null;
	});

	protected isSelected(view: T): boolean {
		const selected = this.selectedView();
		if (selected == null) {
			return false;
		}
		return this.optionComparer()(selected, view);
	}

	protected selectView(view: T): void {
		this.selectedView.set(view);
	}
}
