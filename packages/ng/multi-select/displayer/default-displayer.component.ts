import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { map, switchMap } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input/select-input.component';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';
import { of } from 'rxjs';

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective, FormsModule, InputDirective],
	template: `
		<div class="multipleSelect-displayer">
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
				(keydown.backspace)="inputBackspace()"
				role="combobox"
				aria-haspopup="listbox"
				luInput
			/>
			<div *ngFor="let option of displayedOptions$ | async; let index = index" class="multipleSelect-displayer-chip chip" [class.mod-unkillable]="select.disabled$ | async">
				<span class="multipleSelect-displayer-chip-value"><ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container></span>
				<button *ngIf="!(select.disabled$ | async)" type="button" class="chip-kill" (click)="unselectOption(option, $event)">
					<span class="u-mask">{{ intl.removeOption }}</span>
				</button>
			</div>
			<div class="multipleSelect-displayer-chip chip" *ngIf="overflowOptions$ | async as overflow">+ {{ overflow }}</div>
		</div>
	`,
	styleUrls: ['./default-displayer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuMultiSelectDefaultDisplayerComponent<T> implements OnInit {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	intl = getIntl(LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS);

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

	placeholder$ = this.context.option$.pipe(
		switchMap((options) => {
			if ((options || []).length > 0) {
				return of('');
			}
			return this.select.placeholder$;
		}),
	);

	displayedOptions$ = this.context.option$.pipe(
		map((options) => {
			if (this.select.maxValuesShown) {
				return (options || []).slice(0, this.select.maxValuesShown);
			}
			return options;
		}),
	);

	overflowOptions$ = this.context.option$.pipe(
		map((options) => {
			return Math.max(0, (options || []).length - this.select.maxValuesShown);
		}),
	);

	unselectOption(option: T, $event?: Event): void {
		if ($event) {
			$event.stopPropagation();
			$event.preventDefault();
		}
		this.select.updateValue(
			this.value.filter((o) => o !== option),
			true,
		);
		setTimeout(() => {
			this.select.panelRef?.updatePosition();
			this.inputElementRef.nativeElement.focus();
		});
	}

	inputBackspace(): void {
		if (this.value.length > 0 && this.inputElementRef.nativeElement.value.length === 0) {
			this.unselectOption(this.value[this.value.length - 1]);
			this.select.panelRef?.updateSelectedOptions(this.value);
		}
	}

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
