import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { map } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input/select-input.component';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';

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
				[disabled]="select.disabled"
				#inputElement
				ngModel
				(ngModelChange)="select.clueChanged($event)"
				[placeholder]="placeholder$ | async"
				(keydown.backspace)="inputBackspace()"
				role="combobox"
				aria-haspopup="listbox"
				luInput
			/>
			<div *ngFor="let option of displayedOptions$ | async; let index = index" class="multipleSelect-displayer-chip chip" [class.mod-unkillable]="disabled">
				<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
				<button *ngIf="!disabled" type="button" class="chip-kill" (click)="unselectOption(option, $event)">
					<span class="u-mask">{{ intl.removeOption }}</span>
				</button>
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

	get value(): T[] {
		return this.select.value || [];
	}

	get ariaControls() {
		return this.select.ariaControls;
	}

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	placeholder$ = this.context.option$.pipe(
		map((options) => {
			if ((options || []).length > 0) {
				return '';
			}
			return this.select.placeholder;
		}),
	);

	displayedOptions$ = this.context.option$.pipe(
		map((options) => {
			if (this.select.maxValuesShown !== Infinity) {
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
			this.select.panelRef.updateSelectedOptions(this.value);
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
		this.select.emptyClue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.inputElementRef.nativeElement.value = '';
		});
	}
}
