import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ChipComponent } from '@lucca-front/ng/chip';
import { ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
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
						<div class="multipleSelect-displayer-chip chip mod-unkillable">
							<ng-container *luOptionOutlet="select.displayerTpl(); value: selectedOptions[0]" />
						</div>
					}
					@if (selectedOptions?.length > 1) {
						<lu-chip class="multipleSelect-displayer-chip" unkillable>{{ selectedOptions?.length }} {{ label }}</lu-chip>
					}
				</div>
			}
		</div>
	`,
	styleUrl: './counter-displayer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuMultiSelectCounterDisplayerComponent<T> implements OnInit {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);

	protected destroyRef = inject(DestroyRef);

	@ViewChild('inputElement')
	inputElementRef: ElementRef<HTMLInputElement>;

	get value(): T[] {
		return this.select.value || [];
	}

	selectedOptions$ = new BehaviorSubject<T[]>([]);

	@Input()
	set selected(options: T[]) {
		this.selectedOptions$.next(options);
	}

	@Input({ required: true })
	label: string;

	ngOnInit(): void {
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data?: { keepClue: true }) => {
			// Everytime we want to focus, we need to reset the input
			// This is done when a value is selected and when panel is opened.
			if (!data?.keepClue) {
				this.inputElementRef.nativeElement.value = '';
				this.select.clueChanged('');
			}
			this.inputElementRef.nativeElement.focus();
		});
		this.select.emptyClue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.inputElementRef.nativeElement.value = '';
		});
	}
}
