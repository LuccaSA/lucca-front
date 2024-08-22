import { Directive, computed, effect, forwardRef, inject, input, model, signal, untracked } from '@angular/core';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { LuMultiSelectWithSelectAllMode, LuMultiSelectWithSelectAllValue, ɵIsSelectedStrategy } from '../../select.model';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { LuMultiSelectAllDisplayerComponent } from './multi-select-all-displayer.component';
import { LuMultiSelectAllHeaderComponent } from './multi-select-all-header.component';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

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
export class LuMultiSelectWithSelectAllDirective<TValue> extends ɵIsSelectedStrategy<TValue> {
	readonly #select = inject(LuMultiSelectInputComponent);

	readonly selectAll = model(false, { alias: 'withSelectAll' });
	readonly totalCount = input<number>(0, { alias: 'withSelectAllTotalCount' });
	readonly displayerLabel = input.required<string>({ alias: 'withSelectAllDisplayerLabel' });

	readonly #mode = signal<LuMultiSelectWithSelectAllMode>('include');
	readonly #values = signal<TValue[]>([]);

	readonly mode = computed(() => this.#mode());
	readonly values = computed(() => this.#values());

	readonly #selectAllValue = computed<LuMultiSelectWithSelectAllValue<TValue>>(() => {
		const mode = this.#mode();
		return mode === 'all' ? { mode } : { mode, values: this.#values() };
	});

	// Keep the original registerOnChange and writeValue methods
	readonly #selectRegisterOnChange = this.#select.registerOnChange.bind(this.#select) as LuMultiSelectInputComponent<TValue>['registerOnChange'];
	readonly #selectWriteValue = this.#select.writeValue.bind(this.#select) as LuMultiSelectInputComponent<TValue>['writeValue'];

	#onChange?: (values: LuMultiSelectWithSelectAllValue<TValue>) => void;

	constructor() {
		super();

		this.#select.registerOnChange = (fn) => this.registerOnChange(fn);
		this.#select.writeValue = (value) => this.writeValue(value);
		this.#select.panelHeaderTpl = LuMultiSelectAllHeaderComponent;
		this.#select.valuesTpl = LuMultiSelectAllDisplayerComponent;

		effect(() => this.#onChange?.(this.#selectAllValue()));

		effect(() => {
			const selectAll = this.selectAll();

			untracked(() => {
				this.#selectWriteValue([]);
				this.#values.set([]);
				this.#mode.set(selectAll ? 'all' : 'none');
			});
		});
	}

	override isSelected(option: TValue, selectedOptions: TValue[], optionComparer: LuOptionComparer<TValue>): boolean {
		switch (this.#mode()) {
			case 'all':
				return this.selectAll();
			case 'include':
				return selectedOptions.some((o) => optionComparer(o, option));
			case 'exclude':
				return !selectedOptions.some((o) => optionComparer(o, option));
			case 'none':
				return false;
		}
	}

	registerOnChange(fn: (value: TValue[] | LuMultiSelectWithSelectAllValue<TValue>) => void): void {
		this.#onChange = fn;

		this.#selectRegisterOnChange((values: TValue[]) => {
			this.#values.set(values);

			const oldMode = this.#mode();
			const selectAll = this.selectAll();

			if ((oldMode === 'all' || oldMode === 'none') && values.length) {
				this.#mode.set(selectAll ? 'exclude' : 'include');
			}

			if (!values.length) {
				this.#mode.set(this.selectAll() ? 'all' : 'none');
			}
		});
	}

	writeValue(value: TValue[] | LuMultiSelectWithSelectAllValue<TValue>): void {
		let mode: LuMultiSelectWithSelectAllMode;
		let values: TValue[];

		if (!value) {
			values = [];
			mode = 'all';
		} else if (Array.isArray(value)) {
			values = value;
			mode = value.length ? 'include' : 'all';
		} else {
			values = value.mode === 'exclude' ? value.values : [];
			mode = value.mode;
		}

		this.#selectWriteValue(values);
		this.#mode.set(mode);
		this.#values.set(values);
	}
}
