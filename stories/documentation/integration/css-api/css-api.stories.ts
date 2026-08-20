import { CssApiList } from '@/stories/css-api-manifest';
import type { CssApiEntry, CssApiKind } from '@/stories/css-api-types';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryObj } from '@storybook/angular-vite';

type KindFilter = 'all' | CssApiKind;
type StatusFilter = 'all' | 'current' | 'deprecated';

const KIND_LABELS: Record<CssApiKind, string> = {
	variable: 'Variable',
	utility: 'Utility',
	mixin: 'Mixin',
};

interface StatusOption {
	value: StatusFilter;
	name: string;
}

const STATUS_OPTIONS: StatusOption[] = [
	{ value: 'all', name: 'All' },
	{ value: 'current', name: 'Current' },
	{ value: 'deprecated', name: 'Deprecated' },
];

/** How many rows the table renders at once. Search to reach the rest. */
const MAX_ROWS = 100;

function countOf(kind: KindFilter): number {
	return kind === 'all' ? CssApiList.length : CssApiList.filter((entry) => entry.kind === kind).length;
}

@Component({
	selector: 'css-api-stories',
	templateUrl: './css-api.stories.html',
	imports: [
		FormsModule,
		FilterBarComponent,
		FilterPillComponent,
		FilterPillAddonBeforeDirective,
		FilterPillAddonAfterDirective,
		FormFieldComponent,
		TextInputComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		NumericBadgeComponent,
		LuSimpleSelectInputComponent,
	],
	styles: [
		`
			.cssApi {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-300);
			}

			.cssApi-results {
				font: var(--pr-t-font-body-S);
				color: var(--pr-t-color-text-subtle);
				white-space: nowrap;
			}

			.cssApi-truncated {
				margin: 0;
				font: var(--pr-t-font-body-S);
				color: var(--pr-t-color-text-subtle);
			}

			.cssApi-empty {
				padding: var(--pr-t-spacings-400);
				text-align: center;
				color: var(--pr-t-color-text-subtle);
				background-color: var(--pr-t-elevation-surface-sunken);
				border-radius: var(--pr-t-border-radius-structure);
			}

			/* The dataset is long; keep the header visible while scrolling it. */
			.cssApi-scroll {
				max-block-size: 40rem;
				overflow: auto;
			}

			.cssApi-name {
				font-family: var(--pr-t-font-family-monospace, monospace);
				white-space: nowrap;
			}

			.cssApi-kind {
				white-space: nowrap;
			}

			.cssApi-value {
				font-family: var(--pr-t-font-family-monospace, monospace);
				font-size: var(--pr-t-font-body-S-fontSize);
				color: var(--pr-t-color-text-subtle);
				word-break: break-word;
			}

			.cssApi-meta {
				display: block;
				font: var(--pr-t-font-body-S);
				color: var(--pr-t-color-text-subtle);
				margin-block-start: var(--pr-t-spacings-25);
			}

			.cssApi-deprecated {
				text-decoration: line-through;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CssApiStory {
	readonly search = signal('');
	readonly kind = signal<KindFilter>('all');
	// The option object, not its value: lu-simple-select renders what it is bound to.
	readonly status = signal<StatusOption | null>(null);

	readonly statusOptions = STATUS_OPTIONS;

	protected readonly kindOptions: Array<{ value: KindFilter; label: string; count: number }> = [
		{ value: 'all', label: 'All', count: countOf('all') },
		{ value: 'variable', label: 'Variables', count: countOf('variable') },
		{ value: 'utility', label: 'Utilities', count: countOf('utility') },
		{ value: 'mixin', label: 'Mixins', count: countOf('mixin') },
	];

	readonly matches = computed<CssApiEntry[]>(() => {
		const search = this.search().trim().toLowerCase();
		const kind = this.kind();
		const status = this.status()?.value ?? 'all';

		return CssApiList.filter((entry) => {
			if (kind !== 'all' && entry.kind !== kind) {
				return false;
			}
			if (status === 'current' && entry.deprecated) {
				return false;
			}
			if (status === 'deprecated' && !entry.deprecated) {
				return false;
			}
			if (!search) {
				return true;
			}
			return (
				entry.name.toLowerCase().includes(search) ||
				entry.value.toLowerCase().includes(search) ||
				(entry.resolved?.toLowerCase().includes(search) ?? false) ||
				(entry.replacement?.toLowerCase().includes(search) ?? false)
			);
		});
	});

	/** Capped: rendering all 1755 rows takes ~35s and times out the Storybook test. */
	readonly visible = computed<CssApiEntry[]>(() => this.matches().slice(0, MAX_ROWS));
	readonly hidden = computed(() => Math.max(0, this.matches().length - MAX_ROWS));

	protected readonly maxRows = MAX_ROWS;

	protected label(kind: CssApiKind): string {
		return KIND_LABELS[kind];
	}
}

export default {
	title: 'Documentation/Integration/CSS API (beta)',
	component: CssApiStory,
} as Meta;

export const CssApi: StoryObj<CssApiStory> = {
	render: () => ({}),
	parameters: {
		// The page drives itself; the generated autodocs controls table is noise here.
		controls: { include: [] },
	},
};
