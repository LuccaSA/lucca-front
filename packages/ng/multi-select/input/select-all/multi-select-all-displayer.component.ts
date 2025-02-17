import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { getIntl } from '@lucca-front/ng/core';
import { ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
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
					@if (displayerCount() === 1 && isIncludeMode()) {
						<div class="multipleSelect-displayer-chip chip" [class.mod-unkillable]="disabled()">
							<span class="multipleSelect-displayer-chip-value" *luOptionOutlet="select.displayerTpl(); value: select.value[0]"></span>

							@if (!disabled()) {
								<button type="button" class="chip-kill" (click)="unselectOption(select.value[0], $event)">
									<span class="u-mask">{{ intl.removeOption }}</span>
								</button>
							}
						</div>
					} @else {
						<lu-numeric-badge [disableTooltip]="true" class="multipleSelect-displayer-numericBadge" [value]="displayerCount()" />
						<span class="multipleSelect-displayer-label"> {{ displayerLabel() }} </span>
					}
				</div>
			}
		</div>
	`,
	styles: `
		:host {
			display: block;
			inline-size: 100%;
		}
	`,
})
export class LuMultiSelectAllDisplayerComponent<TValue> {
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT);
	readonly select = inject<LuMultiSelectInputComponent<TValue>>(LuMultiSelectInputComponent);

	readonly #valuesCount = computed(() => this.selectAllContext.values().length);

	readonly isFilled = computed(() => this.selectAllContext.mode() !== 'none');
	readonly isIncludeMode = computed(() => this.selectAllContext.mode() === 'include');
	readonly displayerLabel = this.selectAllContext.displayerLabel;

	readonly intl = getIntl(LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS);
	readonly disabled = toSignal(this.select.disabled$);

	inputElementRef = viewChild.required<LuMultiSelectDisplayerInputDirective<TValue>, ElementRef<HTMLInputElement>>(LuMultiSelectDisplayerInputDirective, { read: ElementRef });

	readonly displayerCount = computed(() => {
		switch (this.selectAllContext.mode()) {
			case 'all':
				return this.selectAllContext.totalCount();
			case 'include':
				return this.#valuesCount();
			case 'exclude':
				return this.selectAllContext.totalCount() - this.#valuesCount();
			case 'none':
				return null;
		}
	});

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
