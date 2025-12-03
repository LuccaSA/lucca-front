import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChipComponent } from '@lucca-front/ng/chip';
import { getIntl } from '@lucca-front/ng/core';
import { ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from '../../displayer/default-displayer.translate';
import { LuMultiSelectDisplayerInputDirective } from '../../displayer/displayer-input.directive';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

@Component({
	selector: 'lu-multi-select-all-displayer',
	imports: [LuMultiSelectDisplayerInputDirective, ɵLuOptionOutletDirective, ChipComponent],
	template: `
		<div class="multipleSelect-displayer mod-filter" [class.is-filled]="isFilled()">
			<input type="text" luMultiSelectDisplayerInput />

			@if (displayerCount() !== null) {
				<div class="multipleSelect-displayer-filter">
					@if (displayerCount() === 1 && isIncludeMode()) {
						<lu-chip withEllipsis (kill)="unselectOption(select.value[0], $event)" class="multipleSelect-displayer-chip" [unkillable]="disabled()">
							<ng-template *luOptionOutlet="select.displayerTpl(); value: select.value[0]" />
						</lu-chip>
					} @else {
						<lu-chip class="multipleSelect-displayer-chip" unkillable>{{ displayerCount() }} {{ displayerLabel() }}</lu-chip>
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

	readonly isFilled = computed(() => this.selectAllContext.mode() !== 'none');
	readonly isIncludeMode = computed(() => this.selectAllContext.mode() === 'include');
	readonly displayerLabel = this.selectAllContext.displayerLabel;
	readonly displayerCount = this.selectAllContext.displayerCount;

	readonly intl = getIntl(LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS);
	readonly disabled = toSignal(this.select.disabled$);

	readonly inputElementRef = viewChild.required<LuMultiSelectDisplayerInputDirective<TValue>, ElementRef<HTMLInputElement>>(LuMultiSelectDisplayerInputDirective, { read: ElementRef });

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
