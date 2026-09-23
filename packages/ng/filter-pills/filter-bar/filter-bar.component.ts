import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, forwardRef, input, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LuOptionComparer, LuOptionDirective, LuOptionGroupByContext, LuOptionGrouping } from '@lucca-front/ng/core-select';
import { DividerComponent } from '@lucca-front/ng/divider';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';
import { LU_FILTER_PILLS_TRANSLATIONS } from '../filter-pills.translate';
import { LU_FILTER_BAR_INSTANCE } from './filter-bar.token';

/** Case and accent insensitive, so searching `periode` matches a `Période` pill. */
function normalizeSearch(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();
}

@Component({
	selector: 'lu-filter-bar',
	imports: [DividerComponent, ScrollBoxComponent, FormsModule, NgTemplateOutlet, FilterPillComponent, LuMultiSelectInputComponent, LuOptionDirective],
	templateUrl: './filter-bar.component.html',
	styleUrl: './filter-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'filterBar',
	},
	providers: [
		{
			provide: LU_FILTER_BAR_INSTANCE,
			useExisting: forwardRef(() => FilterBarComponent),
		},
	],
})
export class FilterBarComponent {
	readonly intl = input(...intlInputOptions(LU_FILTER_PILLS_TRANSLATIONS));

	readonly addonBefore = signal<TemplateRef<unknown> | null>(null);
	readonly addonAfter = signal<TemplateRef<unknown> | null>(null);

	readonly pills = contentChildren(FilterPillComponent, { descendants: true });

	readonly optionalPills = computed(() => this.pills().filter((pill) => pill.optional()));

	protected readonly displayedOptionalPills = computed(() => this.optionalPills().filter((pill) => pill.displayed()));

	/** Mirrors the search clue of the optional filters select, which filters its options on its own. */
	protected readonly clue = signal('');

	/**
	 * The panel builds a group out of each run of consecutive options, so the pills of a same group
	 * have to be listed together. Groups keep the order of their first pill, ungrouped pills come first.
	 */
	protected readonly optionalPillOptions = computed(() => {
		const clue = normalizeSearch(this.clue());
		const pillsByGroup = new Map<string, FilterPillComponent[]>([['', []]]);
		this.optionalPills()
			.filter((pill) => normalizeSearch(pill.label()).includes(clue))
			.forEach((pill) => {
				const groupPills = pillsByGroup.get(pill.grouping());
				if (groupPills) {
					groupPills.push(pill);
				} else {
					pillsByGroup.set(pill.grouping(), [pill]);
				}
			});
		return [...pillsByGroup.values()].flat();
	});

	/** Optional pills are identified by their instance, they have no serializable value to compare. */
	protected readonly optionalPillComparer: LuOptionComparer<FilterPillComponent> = (pill1, pill2) => pill1 === pill2;

	// `viewChild` can't be declared on an ES private field
	private readonly optionalPillsSelect = viewChild(LuMultiSelectInputComponent);

	private readonly optionalPillsGroupTpl = viewChild<TemplateRef<LuOptionGroupByContext<unknown, unknown>>>('optionalPillsGroup');

	constructor() {
		effect(() => {
			// Grouping stays off until a pill declares one, so a bar without groups keeps a flat option list
			const grouped = this.optionalPills().some((pill) => pill.grouping().length > 0);
			const content = this.optionalPillsGroupTpl();
			const grouping: LuOptionGrouping<unknown, unknown> | undefined = grouped && content ? { selector: (pill: unknown) => (pill as FilterPillComponent).grouping(), content } : undefined;
			this.optionalPillsSelect()?.groupingSignal.set(grouping);
		});
	}

	protected displayOptionalPills(pills: FilterPillComponent[]): void {
		this.optionalPills().forEach((pill) => pill.displayed.set(pills.includes(pill)));
	}
}
