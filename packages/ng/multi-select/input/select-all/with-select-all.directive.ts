import { computed, Directive, forwardRef, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
	readonly #select = inject<LuMultiSelectInputComponent<TValue>>(LuMultiSelectInputComponent);

	readonly displayerLabel = input.required<string>({ alias: 'withSelectAllDisplayerLabel' });

	readonly #mode = signal<LuMultiSelectionMode>('none');
	readonly #values = signal<TValue[]>([]);

	readonly mode = this.#mode.asReadonly();
	readonly values = this.#values.asReadonly();
	readonly options = toSignal(this.#select.options$);
	readonly totalCount = toSignal(inject(CORE_SELECT_API_TOTAL_COUNT_PROVIDER).totalCount$);
	readonly optionsCount = computed(() => this.options().length);

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
		const hasAllValues = this.#valuesCount() === this.optionsCount();
		const hasDiff = this.values().every((value) => this.options().some((option) => this.#select.optionComparer(value, option)));
		if (mode === 'all' && !hasAllValues) {
			return { mode: 'include', values: this.options() as TValue[] };
		} else if (mode === 'none' && !hasDiff && !hasAllValues) {
			return { mode: 'exclude', values: this.options() as TValue[] };
		} else {
			return mode === 'all' || mode === 'none' ? { mode } : { mode, values: this.#values() };
		}
	});

	// Keep the original registerOnChange / writeValue / clearValye methods
	readonly #selectRegisterOnChange = this.#select.registerOnChange.bind(this.#select) as LuMultiSelectInputComponent<TValue>['registerOnChange'];
	readonly #selectWriteValue = this.#select.writeValue.bind(this.#select) as LuMultiSelectInputComponent<TValue>['writeValue'];
	readonly #selectClearValue = this.#select.clearValue.bind(this.#select) as LuMultiSelectInputComponent<TValue>['clearValue'];

	#onChange?: (values: LuMultiSelection<TValue>) => void;

	constructor() {
		super();

		this.#select.registerOnChange = (fn) => this.registerOnChange(fn);
		this.#select.writeValue = (value) => this.writeValue(value);
		this.#select.clearValue = ($event) => this.clearValue($event);

		this.#select.panelHeaderTpl.set(LuMultiSelectAllHeaderComponent);
		this.#select.valuesTpl.set(LuMultiSelectAllDisplayerComponent);
		this.#select.hasValue = () => this.#hasValue();
		this.#select.isFilterPillEmpty = computed(() => !this.#hasValue());
		this.#select.useSingleOptionDisplayer = computed(() => this.#mode() === 'include');
		this.#select.valueLength = this.displayerCount;
	}

	setSelectAll(selectAll: boolean): void {
		this.#selectWriteValue([]);

		if (this.#values().length) {
			this.#values.set([]);
		}
		this.#mode.set(selectAll ? 'all' : 'none');
		this.#onChange?.(this.#selectAllValue());
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

	registerOnChange(fn: (value: TValue[] | LuMultiSelection<TValue>) => void): void {
		this.#onChange = fn;

		this.#selectRegisterOnChange((values: TValue[]) => {
			this.#values.set(values);
			const oldMode = this.#mode();
			this.#mode.set(this.#getNextMode(oldMode, values));
			this.#onChange?.(this.#selectAllValue());

			// When all values are selected/unselected one by one, we should reset internal select value to avoid weird behavior when selecting/unselecting after that
			if (values.length && (this.#mode() === 'all' || this.#mode() === 'none')) {
				this.#selectWriteValue([]);
			}
		});
	}

	writeValue(value: TValue[] | LuMultiSelection<TValue>): void {
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

		this.#selectWriteValue(values);
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
