import { Directive, computed, forwardRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { skip } from 'rxjs';
import { LuMultiSelection, LuMultiSelectionMode, ɵIsSelectedStrategy } from '../../select.model';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { LuMultiSelectAllDisplayerComponent } from './multi-select-all-displayer.component';
import { LuMultiSelectAllHeaderComponent } from './multi-select-all-header.component';
import { LuMultiSelectWithSelectAllContext, MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-multi-select[withSelectAll]',
	standalone: true,
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
	readonly totalCount = toSignal(inject(CORE_SELECT_API_TOTAL_COUNT_PROVIDER).totalCount$);

	readonly #hasValue = computed(() => this.mode() !== 'none');

	readonly #selectAllValue = computed<LuMultiSelection<TValue>>(() => {
		const mode = this.#mode();
		return mode === 'all' || mode === 'none' ? { mode } : { mode, values: this.#values() };
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

		toObservable(this.#selectAllValue)
			.pipe(skip(1), takeUntilDestroyed())
			.subscribe((value) => this.#onChange?.(value));
	}

	setSelectAll(selectAll: boolean): void {
		this.#selectWriteValue([]);

		if (this.#values().length) {
			this.#values.set([]);
		}
		this.#mode.set(selectAll ? 'all' : 'none');
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
		});
	}

	writeValue(value: TValue[] | LuMultiSelection<TValue>): void {
		if (Array.isArray(value)) {
			throw new Error('MultiSelectWithSelectAllDirective does not support array values. Pass a LuMultiSelectWithSelectAllValue<TValue>.');
		}

		let mode: LuMultiSelectionMode;
		let values: TValue[];

		if (!value) {
			values = [];
			mode = 'none';
		} else {
			values = value.mode === 'exclude' ? value.values : [];
			mode = value.mode;
		}

		this.#selectWriteValue(values);
		this.#mode.set(mode);
		this.#values.set(values);
	}

	clearValue($event: Event): void {
		this.#selectClearValue($event);
		this.#mode.set('none');
		this.#values.set([]);
	}

	#getNextMode(fromMode: LuMultiSelectionMode, values: TValue[]): LuMultiSelectionMode {
		const allSelected = values.length === this.totalCount();

		if (allSelected) {
			return 'all';
		}

		const someSelected = values.length > 0;

		// The first value selected will transition from "all" to "exclude"
		if (fromMode === 'all' && someSelected) {
			return 'exclude';
		}

		// The first value selected will transition from "none" to "include"
		if (fromMode === 'none' && someSelected) {
			return 'include';
		}

		// When none selected, "include" -> "none" and "exclude" -> "all"
		if (values.length === 0) {
			return fromMode === 'include' ? 'none' : 'all';
		}

		// No match, keep the same mode
		return fromMode;
	}
}
