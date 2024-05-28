import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { LuMultiSelectInputComponent } from '../../input';

@Component({
	selector: 'lu-multi-select-counter-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective, FormsModule, InputDirective],
	template: `
		<div class="multipleSelect-displayer mod-filter" [class.is-filled]="(selectedOptions$ | async)?.length > 0">
			<input
				class="multipleSelect-displayer-search"
				type="text"
				[attr.aria-expanded]="select.isPanelOpen"
				[attr.aria-activedescendant]="select.activeDescendant$ | async"
				[attr.aria-controls]="ariaControls"
				[disabled]="select.disabled$ | async"
				[readonly]="!select.searchable"
				#inputElement
				ngModel
				(ngModelChange)="select.clueChanged($event)"
				[placeholder]="placeholder$ | async"
				role="combobox"
				aria-haspopup="listbox"
				luInput
			/>
			<div class="multipleSelect-displayer-filter" *ngIf="selectedOptions$ | async as selectedOptions">
				<div class="multipleSelect-displayer-chip chip mod-unkillable" *ngIf="selectedOptions?.length === 1">
					<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: selectedOptions[0]"></ng-container>
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

	get ariaControls() {
		return this.select.ariaControls;
	}

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	selectedOptions$ = new BehaviorSubject<T[]>([]);

	@Input()
	set selected(options: T[]) {
		this.selectedOptions$.next(options);
	}

	placeholder$ = this.context.option$.pipe(
		switchMap((options) => {
			if ((options || []).length > 0) {
				return of('');
			}
			return this.select.placeholder$;
		}),
	);

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
