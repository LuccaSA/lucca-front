import { Component, ElementRef, computed, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { getIntl } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { combineLatest, map, of, shareReplay, switchMap } from 'rxjs';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from '../../displayer/default-displayer.translate';
import { LuMultiSelectDisplayerInputDirective } from '../../displayer/displayer-input.directive';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

@Component({
	selector: 'lu-multi-select-all-displayer',
	standalone: true,
	imports: [NumericBadgeComponent, LuMultiSelectDisplayerInputDirective, InputDirective, ɵLuOptionOutletDirective],
	template: `
		<div class="multipleSelect-displayer mod-filter" [class.is-filled]="isFilled()">
			<input type="text" luMultiSelectDisplayerInput />

			@if (displayerCount() !== null) {
				<div class="multipleSelect-displayer-filter">
					@if (displayerCount() === 1) {
						<div class="multipleSelect-displayer-chip chip" [class.mod-unkillable]="disabled()">
							<span class="multipleSelect-displayer-chip-value" *luOptionOutlet="select.valueTpl || select.optionTpl; value: select.value[0]"></span>

							@if (!disabled()) {
								<button type="button" class="chip-kill" (click)="unselectOption(select.value[0], $event)">
									<span class="u-mask">{{ intl.removeOption }}</span>
								</button>
							}
						</div>
					} @else {
						<lu-numeric-badge [value]="displayerCount()" />
						<span class="multipleSelect-displayer-label"> {{ displayerLabel() }} </span>
					}
				</div>
			}
		</div>
	`,
	styles: `
		:host {
			display: block;
			width: 100%;
		}
	`,
})
export class LuMultiSelectAllDisplayerComponent<TValue> {
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT);
	readonly select = inject<LuMultiSelectInputComponent<TValue>>(LuMultiSelectInputComponent);

	readonly #totalCount$ = inject(CORE_SELECT_API_TOTAL_COUNT_PROVIDER).totalCount$.pipe(takeUntilDestroyed(), shareReplay(1));

	readonly #valuesCount$ = toObservable(computed(() => this.selectAllContext.values().length));

	readonly isFilled = computed(() => this.selectAllContext.mode() !== 'all' || this.selectAllContext.selectAll());
	readonly displayerLabel = this.selectAllContext.displayerLabel;

	readonly intl = getIntl(LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS);
	readonly disabled = toSignal(this.select.disabled$);

	inputElementRef = viewChild.required<LuMultiSelectDisplayerInputDirective<TValue>, ElementRef<HTMLInputElement>>(LuMultiSelectDisplayerInputDirective, { read: ElementRef });

	readonly #displayerCount$ = toObservable(
		computed(() => ({
			mode: this.selectAllContext.mode(),
			selectAll: this.selectAllContext.selectAll(),
		})),
	).pipe(
		switchMap(({ mode, selectAll }) => {
			switch (mode) {
				case 'all':
					return selectAll ? this.#totalCount$ : of(null);
				case 'include':
					return this.#valuesCount$;
				case 'exclude':
					return combineLatest([this.#totalCount$, this.#valuesCount$]).pipe(map(([totalCount, valuesCount]) => totalCount - valuesCount));
			}
		}),
	);

	readonly displayerCount = toSignal(this.#displayerCount$);

	unselectOption(option: TValue, $event: Event): void {
		$event.stopPropagation();
		$event.preventDefault();
		this.select.updateValue(
			this.select.value.filter((o) => o !== option),
			true,
		);
		setTimeout(() => {
			this.select.panelRef?.updatePosition();
			this.inputElementRef().nativeElement.focus();
		});
	}
}
