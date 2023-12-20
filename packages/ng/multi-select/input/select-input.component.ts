import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, numberAttribute, OnDestroy, OnInit, TemplateRef, Type, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuOptionContext, provideLuSelectLabelsAndIds, provideLuSelectOverlayContainer, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Subject } from 'rxjs';
import { LuMultiSelectDefaultDisplayerComponent } from '../displayer/index';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuMultiSelectPanelRefFactory } from './panel-ref.factory';
import { LuMultiSelectPanelRef } from './panel.model';

@Component({
	selector: 'lu-multi-select',
	standalone: true,
	imports: [CommonModule, LuTooltipModule, ɵLuOptionOutletDirective, IconComponent],
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuMultiSelectInputComponent),
			multi: true,
		},
		{
			provide: ALuSelectInputComponent,
			useExisting: forwardRef(() => LuMultiSelectInputComponent),
		},
		provideLuSelectOverlayContainer(),
		provideLuSelectLabelsAndIds(),
		LuMultiSelectPanelRefFactory,
	],
	host: {
		class: 'multiSelect',
	},
	encapsulation: ViewEncapsulation.None,
})
export class LuMultiSelectInputComponent<T> extends ALuSelectInputComponent<T, T[]> implements ControlValueAccessor, OnDestroy, OnInit {
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);

	@Input()
	valuesTpl?: TemplateRef<LuOptionContext<T[]>> | Type<unknown> = LuMultiSelectDefaultDisplayerComponent;

	@Input({ transform: numberAttribute })
	maxValuesShown = 500;

	override _value: T[] = [];

	public override get panelRef(): LuMultiSelectPanelRef<T> | undefined {
		return this._panelRef;
	}

	protected override _panelRef?: LuMultiSelectPanelRef<T>;

	protected panelRefFactory = inject(LuMultiSelectPanelRefFactory);

	/**
	 * This is used to tell the displayer to focus on the input element
	 */
	public readonly focusInput$ = new Subject<void>();

	public readonly emptyClue$ = new Subject<void>();

	public override focusInput(): void {
		this.focusInput$.next();
	}

	public override emptyClue(): void {
		this.emptyClue$.next();
	}

	public override writeValue(value: T[]): void {
		super.writeValue(value);
		this.panelRef?.updateSelectedOptions(value);
	}

	public override updateValue(value: T[], skipFocus = false): void {
		super.updateValue(value);
		if (!skipFocus) {
			this.focusInput();
		}
	}

	protected override buildPanelRef(): LuMultiSelectPanelRef<T> {
		return this.panelRefFactory.buildPanelRef(
			{
				initialValue: this.value,
				optionComparer: this.optionComparer,
				options$: this.options$,
				loading$: this.loading$,
				optionTpl: this.optionTpl,
				grouping: this.grouping,
			},
			this.overlayConfig,
		);
	}

	protected override bindInputToPanelRefEvents(): void {
		if (!this.panelRef) {
			return;
		}

		super.bindInputToPanelRefEvents();
	}

	protected override get hasValue(): boolean {
		return this.value && this.value.length > 0;
	}

	override clearValue(event: MouseEvent): void {
		event.stopPropagation();
		this.onChange?.([]);
		this.value = [];
		this.focusInput$.next();
	}

	override ngOnDestroy() {
		super.ngOnDestroy();
		this.focusInput$.complete();
	}
}
