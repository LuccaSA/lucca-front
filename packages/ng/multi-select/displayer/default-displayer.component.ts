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
		<div class="multipleSelect-displayer">
			<input
				class="multipleSelect-displayer-search"
				type="text"
				#inputElement
				ngModel
				(ngModelChange)="select.clueChanged($event)"
				[placeholder]="placeholder$ | async"
				(keydown.backspace)="inputBackspace()"
			/>
			<div *ngFor="let option of displayedOptions$ | async; let index = index" class="multipleSelect-displayer-chip chip" [class.mod-unkillable]="disabled">
				<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
				<a href *ngIf="!disabled" type="button" class="chip-kill" (click)="unselectOption(option, $event)"></a>
			</div>
			<div class="chip" *ngIf="overflowOptions$ | async as overflow">+ {{ overflow }}</div>
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

	placeholder$ = this.context.option$.pipe(
		map((options) => {
			if (options.length > 0) {
				return '';
			}
			return this.select.placeholder;
		}),
	);

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

	unselectOption(option: T, $event?: Event): void {
		if ($event) {
			$event.stopPropagation();
			$event.preventDefault();
		}
		this.select.updateValue(
			this.select.value.filter((o) => o !== option),
			true,
		);
		setTimeout(() => this.select.panelRef.updatePosition());
	}

	inputBackspace(): void {
		if (this.select.value.length > 0 && this.inputElementRef.nativeElement.value.length === 0) {
			this.unselectOption(this.select.value[this.select.value.length - 1]);
			this.select.panelRef.updateSelectedOptions(this.select.value);
		}
	}

	ngOnInit(): void {
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			// Everytime we want to focus, we need to reset the input
			// This is done when a value is selected and when panel is opened.
			this.inputElementRef.nativeElement.value = '';
			this.select.clueChanged('');
			this.inputElementRef.nativeElement.focus();
		});
	}
}
