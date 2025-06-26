import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BehaviorSubject } from 'rxjs';
import { LuMultiSelectInputComponent } from '../../input';
import { LuMultiSelectDisplayerInputDirective } from '../displayer-input.directive';

@Component({
	selector: 'lu-multi-select-counter-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective, FormsModule, LuMultiSelectDisplayerInputDirective],
	template: `
		<div class="multipleSelect-displayer mod-filter" [class.is-filled]="(selectedOptions$ | async)?.length > 0">
			<input type="text" autocomplete="off" #inputElement luMultiSelectDisplayerInput />
			<div class="multipleSelect-displayer-filter" *ngIf="selectedOptions$ | async as selectedOptions">
				<div class="multipleSelect-displayer-chip chip mod-unkillable" *ngIf="selectedOptions?.length === 1">
					<ng-container *luOptionOutlet="select.displayerTpl(); value: selectedOptions[0]"></ng-container>
				</div>
				<ng-container *ngIf="selectedOptions?.length > 1"
					><span class="multipleSelect-displayer-numericBadge numericBadge">{{ selectedOptions?.length }}</span
					><span class="multipleSelect-displayer-label">{{ label }}</span></ng-container
				>
			</div>
		</div>
	`,
	styleUrls: ['./counter-displayer.component.scss'],
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
