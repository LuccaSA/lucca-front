import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent, FilterPillAddonAfterDirective } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta, StoryObj } from '@storybook/angular';
import deprecationsJson from '../../../../packages/scss/css-api/deprecations.json';

type DeprecationKind = 'class' | 'css-variable' | 'selector' | 'sass-api';

interface DeprecationEntry {
	kind: DeprecationKind;
	name: string;
	replacement: string | null;
	note: string | null;
	since: string | null;
	scope: string;
}

const ALL_ENTRIES = (deprecationsJson as { version: number; entries: DeprecationEntry[] }).entries;

const KIND_LABELS: Record<DeprecationKind, string> = {
	'class': 'Utility classes',
	'css-variable': 'CSS variables',
	'selector': 'Component selectors',
	'sass-api': 'Sass API',
};

const KIND_ORDER: DeprecationKind[] = ['class', 'css-variable', 'selector', 'sass-api'];

@Component({
	selector: 'deprecations-stories',
	templateUrl: './deprecations.stories.html',
	imports: [FormsModule, FilterBarComponent, FilterPillAddonAfterDirective, FormFieldComponent, TextInputComponent, SegmentedControlComponent, SegmentedControlFilterComponent, NumericBadgeComponent],
	styles: [
		`
			.deprecations {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-300);
			}

			.deprecations-intro {
				font: var(--pr-t-font-body-M);
				color: var(--pr-t-color-text-subtle);
				max-inline-size: 60rem;
			}

			.deprecations-results {
				font: var(--pr-t-font-body-S);
				color: var(--pr-t-color-text-subtle);
				white-space: nowrap;
			}

			.deprecations-empty {
				padding: var(--pr-t-spacings-400);
				text-align: center;
				color: var(--pr-t-color-text-subtle);
				background-color: var(--pr-t-elevation-surface-sunken);
				border-radius: var(--pr-t-border-radius-structure);
			}

			.deprecations-group {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-100);
			}

			.deprecations-group-title {
				font: var(--pr-t-font-heading-4);
				color: var(--pr-t-color-text-heading);
				margin: 0;
				padding-block-end: var(--pr-t-spacings-50);
				border-block-end: 1px solid var(--palettes-neutral-100);
			}

			.deprecations-table {
				inline-size: 100%;
				border-collapse: collapse;
				font: var(--pr-t-font-body-S);
			}

			.deprecations-table th {
				text-align: start;
				font-weight: var(--pr-t-font-fontWeight-semibold);
				color: var(--pr-t-color-text-subtle);
				padding: var(--pr-t-spacings-100) var(--pr-t-spacings-150);
				border-block-end: 1px solid var(--palettes-neutral-200);
			}

			.deprecations-table td {
				padding: var(--pr-t-spacings-100) var(--pr-t-spacings-150);
				border-block-end: 1px solid var(--palettes-neutral-100);
				vertical-align: baseline;
			}

			.deprecations-name code,
			.deprecations-replacement code {
				font-family: var(--pr-t-font-family-code, monospace);
				font-size: var(--pr-t-font-fontSize-150);
				word-break: break-all;
			}

			.deprecations-name code {
				color: var(--pr-t-color-text);
			}

			.deprecations-replacement code {
				color: var(--palettes-success-700);
			}

			.deprecations-replacement-none {
				color: var(--pr-t-color-text-subtle);
			}

			.deprecations-note {
				color: var(--pr-t-color-text-subtle);
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DeprecationsStory {
	readonly search = signal('');
	readonly kind = signal<DeprecationKind | 'all'>('all');

	protected readonly kindOptions: Array<{ value: DeprecationKind | 'all'; label: string; count: number }> = [
		{ value: 'all', label: 'All', count: ALL_ENTRIES.length },
		...KIND_ORDER.map((k) => ({ value: k, label: KIND_LABELS[k], count: ALL_ENTRIES.filter((e) => e.kind === k).length })),
	];

	readonly filtered = computed(() => {
		const search = this.search().trim().toLowerCase();
		const kind = this.kind();
		return ALL_ENTRIES.filter((entry) => {
			if (kind !== 'all' && entry.kind !== kind) {
				return false;
			}
			if (!search) {
				return true;
			}
			return (
				entry.name.toLowerCase().includes(search) ||
				(entry.replacement ?? '').toLowerCase().includes(search) ||
				(entry.note ?? '').toLowerCase().includes(search) ||
				entry.scope.toLowerCase().includes(search)
			);
		});
	});

	readonly grouped = computed(() => {
		const entries = this.filtered();
		if (this.search().trim()) {
			return entries.length === 0 ? [] : [{ label: '', entries }];
		}
		const groups = new Map<string, DeprecationEntry[]>();
		for (const entry of entries) {
			const key = `${KIND_LABELS[entry.kind]} · ${entry.scope}`;
			if (!groups.has(key)) {
				groups.set(key, []);
			}
			groups.get(key)!.push(entry);
		}
		return Array.from(groups.entries())
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([label, entries]) => ({ label, entries }));
	});
}

export default {
	title: 'Documentation/Integration/Deprecations',
	component: DeprecationsStory,
} as Meta;

export const Deprecations: StoryObj<DeprecationsStory> = {
	render: () => ({}),
};
