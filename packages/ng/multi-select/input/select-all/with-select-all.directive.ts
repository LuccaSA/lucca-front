import { Directive, computed, forwardRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { skip } from 'rxjs';
import { LuMultiSelectWithSelectAllMode, LuMultiSelectWithSelectAllValue, ɵIsSelectedStrategy } from '../../select.model';
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

	readonly #selectAll = signal(false);
	readonly displayerLabel = input.required<string>({ alias: 'withSelectAllDisplayerLabel' });

	readonly #mode = signal<LuMultiSelectWithSelectAllMode>('all');
	readonly #values = signal<TValue[]>([]);

	readonly mode = this.#mode.asReadonly();
	readonly values = this.#values.asReadonly();
	readonly selectAll = this.#selectAll.asReadonly();
	readonly totalCount = toSignal(inject(CORE_SELECT_API_TOTAL_COUNT_PROVIDER).totalCount$);

	readonly #hasValue = computed(() => this.#values().length > 0 || this.#selectAll());

	readonly #selectAllValue = computed<LuMultiSelectWithSelectAllValue<TValue>>(() => {
		const mode = this.#mode();
		return mode === 'all' || mode === 'none' ? { mode } : { mode, values: this.#values() };
	});

	// Keep the original registerOnChange and writeValue methods
	readonly #selectRegisterOnChange = this.#select.registerOnChange.bind(this.#select) as LuMultiSelectInputComponent<TValue>['registerOnChange'];
	readonly #selectWriteValue = this.#select.writeValue.bind(this.#select) as LuMultiSelectInputComponent<TValue>['writeValue'];

	#onChange?: (values: LuMultiSelectWithSelectAllValue<TValue>) => void;

	constructor() {
		super();

		this.#select.registerOnChange = (fn) => this.registerOnChange(fn);
		this.#select.writeValue = (value) => this.writeValue(value);
		this.#select.panelHeaderTpl.set(LuMultiSelectAllHeaderComponent);
		this.#select.valuesTpl.set(LuMultiSelectAllDisplayerComponent);
		this.#select.hasValue = () => this.#hasValue();

		toObservable(this.#selectAllValue)
			.pipe(skip(1), takeUntilDestroyed())
			.subscribe((value) => this.#onChange?.(value));
	}

	setSelectAll(value: boolean): void {
		const wasSelected = this.#selectAll();
		this.#selectAll.set(value);
		this.#selectWriteValue([]);

		if (this.#values().length) {
			this.#values.set([]);
		}
		this.#mode.set(wasSelected ? 'none' : 'all');
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

	registerOnChange(fn: (value: TValue[] | LuMultiSelectWithSelectAllValue<TValue>) => void): void {
		this.#onChange = fn;

		this.#selectRegisterOnChange((values: TValue[]) => {
			this.#values.set(values);

			const oldMode = this.#mode();

			// The first value selected will "all" mode transitions to "exclude"
			if (oldMode === 'all' && values.length) {
				this.#mode.set('exclude');
			}

			// The first value selected will "none" mode transitions to "include"
			if (oldMode === 'none' && values.length) {
				this.#mode.set('include');
			}

			// When checking or unchecking all, we need to reset the values
			if (values.length === this.totalCount()) {
				this.#mode.set('all');
				this.#selectAll.set(oldMode === 'include');
				this.#selectWriteValue([]);
			}

			// When selecting an option, we need to reset the select all
			if (!values.length) {
				this.#mode.set('none');
				this.#selectAll.set(false);
				this.#selectWriteValue([]);
			}
		});
	}

	writeValue(value: TValue[] | LuMultiSelectWithSelectAllValue<TValue>): void {
		if (Array.isArray(value)) {
			throw new Error('MultiSelectWithSelectAllDirective does not support array values. Pass a LuMultiSelectWithSelectAllValue<TValue>.');
		}

		let mode: LuMultiSelectWithSelectAllMode;
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
}
