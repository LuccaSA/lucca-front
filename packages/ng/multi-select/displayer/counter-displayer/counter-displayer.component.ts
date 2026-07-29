import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ChipComponent } from '@lucca-front/ng/chip';
import { isNotNil, syncInputSignal } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BehaviorSubject } from 'rxjs';
import { LuMultiSelectInputComponent } from '../../input';
import { LuMultiSelectDisplayerInputDirective } from '../displayer-input.directive';

@Component({
	selector: 'lu-multi-select-counter-displayer',
	imports: [AsyncPipe, LuTooltipModule, ChipComponent, ɵLuOptionOutletDirective, FormsModule, LuMultiSelectDisplayerInputDirective],
	template: `
		<div class="multipleSelect-displayer mod-filter" [class.is-filled]="(selectedOptions$ | async)?.length > 0">
			<input type="text" autocomplete="off" #inputElement luMultiSelectDisplayerInput />
			@if (selectedOptions$ | async; as selectedOptions) {
				<div class="multipleSelect-displayer-filter">
					@if (selectedOptions?.length === 1) {
						<lu-chip class="multipleSelect-displayer-chip" unkillable withEllipsis>
							<ng-container *luOptionOutlet="select.displayerTpl(); value: selectedOptions[0]" />
						</lu-chip>
					}
					@if (selectedOptions?.length > 1) {
						<lu-chip class="multipleSelect-displayer-chip" unkillable>{{ selectedOptions?.length }} {{ label() }}</lu-chip>
					}
				</div>
			}
		</div>
	`,
	styleUrl: './counter-displayer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuMultiSelectCounterDisplayerComponent<T> implements OnInit {
	readonly select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	readonly context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	protected destroyRef = inject(DestroyRef);

	readonly inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	get value(): T[] {
		return this.select.value || [];
	}

	readonly selectedOptions$ = new BehaviorSubject<T[]>([]);

	readonly selected = input<T[]>([]);

	readonly label = input.required<string>();

	constructor() {
		syncInputSignal(this.selected, (options) => {
			this.selectedOptions$.next(options);
			this.context.option$.next(options);
		});
	}

	ngOnInit(): void {
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data?: { keepClue: true }) => {
			// Everytime we want to focus, we need to reset the input
			// This is done when a value is selected and when panel is opened.
			const inputElementRef = this.inputElementRef();
			if (isNotNil(inputElementRef)) {
				if (!data?.keepClue) {
					inputElementRef.nativeElement.value = '';
					this.select.clueChanged('');
				}
				inputElementRef.nativeElement.focus();
			}
		});
		this.select.emptyClue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			const inputElementRef = this.inputElementRef();
			if (isNotNil(inputElementRef)) {
				inputElementRef.nativeElement.value = '';
			}
		});
	}
}
