import { computed, Directive, effect, forwardRef, inject, input, ModelSignal, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isNil } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, ɵIsSelectedStrategy } from '@lucca-front/ng/core-select';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { LuMultiSelection, LuMultiSelectionMode } from '../../select.model';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { LuMultiSelectAllDisplayerComponent } from './multi-select-all-displayer.component';
import { LuMultiSelectAllHeaderComponent } from './multi-select-all-header.component';
import { LuMultiSelectWithSelectAllContext, MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-multi-select[withSelectAll]',
	providers: [
		{
			provide: ɵIsSelectedStrategy,
			useExisting: forwardRef(() => LuMultiSelectWithSelectAllDirective),
		},
		{
			provide: MULTI_SELECT_WITH_SELECT_ALL_CONTEXT,
			useExisting: forwardRef(() => LuMultiSelectWithSelectAllDirective),
		},
	],
})
export class LuMultiSelectWithSelectAllDirective<TValue> extends ɵIsSelectedStrategy<TValue> implements LuMultiSelectWithSelectAllContext {
	readonly select = inject<LuMultiSelectInputComponent<TValue>>(LuMultiSelectInputComponent);
	readonly intl = this.select.intl;

	readonly displayerLabel = input.required<string>({ alias: 'withSelectAllDisplayerLabel' });

	readonly #mode = signal<LuMultiSelectionMode>('none');
	readonly #values = signal<TValue[]>([]);

	readonly mode = this.#mode.asReadonly();
	readonly values = this.#values.asReadonly();
	readonly totalCount = toSignal(inject(CORE_SELECT_API_TOTAL_COUNT_PROVIDER).totalCount$);
	readonly clueChange = toSignal(this.select.clueChange$);

	// only show panel header when no clue && values not empty
	readonly #showPanelHeader = computed(() => isNil(this.clueChange()) || (this.clueChange()?.length === 0 && this.totalCount() !== 0));
	readonly #hasValue = computed(() => this.mode() !== 'none');

	readonly #valuesCount = computed(() => this.values().length);
	readonly displayerCount = computed(() => {
		switch (this.mode()) {
			case 'all':
				return this.totalCount();
			case 'include':
				return this.#valuesCount();
			case 'exclude':
				return this.totalCount() - this.#valuesCount();
			case 'none':
				return null;
		}
	});

	readonly #selectAllValue = computed<LuMultiSelection<TValue>>(() => {
		const mode = this.#mode();
		return mode === 'all' || mode === 'none' ? { mode } : { mode, values: this.#values() };
	});

	// Keep the original clearValue method
	readonly #selectClearValue = this.select.clearValue.bind(this.select) as LuMultiSelectInputComponent<TValue>['clearValue'];

	// Replaces the select's internal value, which holds the LuMultiSelection form value instead of the selected options
	readonly #selectValues = signal<TValue[]>([]);

	get #selectionModel(): ModelSignal<LuMultiSelection<TValue> | null> {
		return this.select.value as unknown as ModelSignal<LuMultiSelection<TValue> | null>;
	}

	constructor() {
		super();

		effect(() => {
			if (this.#showPanelHeader()) {
				this.select.panelHeaderTpl.set(LuMultiSelectAllHeaderComponent);
			} else {
				this.select.panelHeaderTpl.set(null);
			}
		});

		this.select.setValue = (values: TValue[] | null) => this.#setValue(values ?? []);
		this.select.clearValue = ($event) => this.clearValue($event);
		this.select.selectedOptions = this.#selectValues.asReadonly();

		effect(() => {
			const selection = this.#selectionModel();
			untracked(() => this.#applySelection(selection));
		});

		this.select.panelHeaderTpl.set(LuMultiSelectAllHeaderComponent);
		this.select.valuesTpl.set(LuMultiSelectAllDisplayerComponent);
		this.select.hasValue = () => this.#hasValue();
		this.select.isFilterPillEmpty = computed(() => !this.#hasValue());
		this.select.useSingleOptionDisplayer = computed(() => this.#mode() === 'include');
		this.select.valueLength = this.displayerCount;
	}

	setSelectAll(selectAll: boolean): void {
		this.#selectValues.set([]);

		if (this.#values().length) {
			this.#values.set([]);
		}

		if (selectAll) {
			this.select.focusInput$.next({ keepClue: true });
		}

		this.#mode.set(selectAll ? 'all' : 'none');
		this.#selectionModel.set(this.#selectAllValue());
	}

	override isSelected(option: TValue, selectedOptions: TValue[], optionComparer: LuOptionComparer<TValue>): boolean {
		switch (this.#mode()) {
			case 'all':
				return true;
			case 'include':
				return selectedOptions.some((o) => optionComparer(o, option));
			case 'exclude':
				return !selectedOptions.some((o) => optionComparer(o, option));
			case 'none':
				return false;
		}
	}

	override isGroupSelected(_options: TValue[], notSelectedOptions: TValue[]): boolean {
		switch (this.#mode()) {
			case 'all':
				return true;
			case 'include':
				return notSelectedOptions.length === 0;
			case 'exclude':
				return notSelectedOptions.length > 0;
			case 'none':
				return false;
		}
	}

	#setValue(values: TValue[]): void {
		this.#selectValues.set(values);
		this.#values.set(values);
		const oldMode = this.#mode();
		this.#mode.set(this.#getNextMode(oldMode, values));
		this.#selectionModel.set(this.#selectAllValue());

		// When all values are selected/unselected one by one, we should reset internal select value to avoid weird behavior when selecting/unselecting after that
		if (values.length && (this.#mode() === 'all' || this.#mode() === 'none')) {
			this.#selectValues.set([]);
		}
	}

	#applySelection(value: TValue[] | LuMultiSelection<TValue> | null): void {
		if (Array.isArray(value)) {
			throw new Error('MultiSelectWithSelectAllDirective does not support array values. The form value or ngModel must be a LuMultiSelection<TValue>.');
		}

		let mode: LuMultiSelectionMode;
		let values: TValue[];

		if (!value) {
			values = [];
			mode = 'none';
		} else {
			values = value.mode === 'exclude' || value.mode === 'include' ? value.values : [];
			mode = value.mode;
		}

		this.#selectValues.set(values);
		this.#mode.set(mode);
		this.#values.set(values);
	}

	clearValue($event: Event): void {
		this.#mode.set('none');
		this.#selectClearValue($event);
	}

	#getNextMode(fromMode: LuMultiSelectionMode, values: TValue[]): LuMultiSelectionMode {
		// When none selected, "include" -> "none" and "exclude" -> "all"
		if (values.length === 0) {
			return fromMode === 'include' || fromMode === 'none' ? 'none' : 'all';
		}

		const allSelected = values.length === this.totalCount();

		// When all selected, "include" -> "all" and "exclude" -> "none"
		if (allSelected) {
			return fromMode === 'include' || fromMode === 'none' ? 'all' : 'none';
		}

		// The first value selected will transition from "all" to "exclude"
		if (fromMode === 'all') {
			return 'exclude';
		}

		// The first value selected will transition from "none" to "include"
		if (fromMode === 'none') {
			return 'include';
		}

		// No match, keep the same mode
		return fromMode;
	}
}
