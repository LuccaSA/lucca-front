import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { map } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input/select-input.component';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';
import { LuMultiSelectDisplayerInputDirective } from './displayer-input.directive';

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, ɵLuOptionOutletDirective, FormsModule, LuMultiSelectDisplayerInputDirective],
	template: `
		<div class="multipleSelect-displayer">
			<input autocomplete="off" #inputElement (keydown.backspace)="inputBackspace()" (keydown.space)="inputSpace($event)" luMultiSelectDisplayerInput />
			@for (option of displayedOptions$ | async; track option; let index = $index) {
				<div class="multipleSelect-displayer-chip chip" [class.mod-unkillable]="select.disabled$ | async">
					<span class="multipleSelect-displayer-chip-value"><ng-container *luOptionOutlet="select.displayerTpl(); value: option" /></span>
					@if ((select.disabled$ | async) === false) {
						<button type="button" class="chip-kill" (click)="unselectOption(option, $event)">
							<span class="pr-u-mask">{{ intl.removeOption }}</span>
						</button>
					}
				</div>
			}
			@if (overflowOptions$ | async; as overflow) {
				<div class="multipleSelect-displayer-chip chip">+ {{ overflow }}</div>
			}
		</div>
	`,
	styleUrl: './default-displayer.component.scss',
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

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

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
			this.select.updatePosition();
			this.inputElementRef.nativeElement.focus();
			this.select.panelRef?.updateSelectedOptions(this.value);
		});
	}

	inputBackspace(): void {
		if (this.value.length > 0 && this.inputElementRef.nativeElement.value.length === 0) {
			this.unselectOption(this.value[this.value.length - 1]);
			this.select.panelRef?.updateSelectedOptions(this.value);
		}
	}

	inputSpace(event: Event): void {
		if (this.inputElementRef.nativeElement.value?.length === 0) {
			event.preventDefault();
			this.select.panelRef?.selectCurrentlyHighlightedValue();
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
