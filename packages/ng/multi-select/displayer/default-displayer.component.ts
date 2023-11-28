import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuMultiSelectInputComponent } from '../input';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective, FormsModule],
	template: `
		<div class="multipleSelect-value">
			<div *ngFor="let option of displayedOptions$ | async; let index = index" class="chip" [class.mod-unkillable]="disabled">
				<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
				<a href *ngIf="!disabled" type="button" class="chip-kill" (click)="unselectOption(option, $event)"></a>
			</div>
			<div class="chip" *ngIf="overflowOptions$ | async as overflow">+ {{ overflow }}</div>
			<input class="multipleSelect-value-search" type="text" #inputElement ngModel (ngModelChange)="select.clueChanged($event)" />
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

	get disabled() {
		return this.select.disabled;
	}

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	displayedOptions$ = this.context.option$.pipe(
		map((options) => {
			if (this.select.maxValuesShown !== Infinity) {
				return options.slice(0, this.select.maxValuesShown);
			}
			return options;
		}),
	);

	overflowOptions$ = this.context.option$.pipe(
		map((options) => {
			return Math.max(0, options.length - this.select.maxValuesShown);
		}),
	);

	unselectOption(option: T, $event: Event): void {
		$event.stopPropagation();
		$event.preventDefault();
		this.select.updateValue(this.select.value.filter((o) => o !== option));
	}

	ngOnInit(): void {
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.inputElementRef.nativeElement.focus();
		});
	}
}
