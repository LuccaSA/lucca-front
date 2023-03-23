import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, inject, Input, TemplateRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuOptionContext, LuSelectPanelRef, provideLuSelectLabelsAndIds, provideLuSelectOverlayContainer, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuMultiSelectDefaultDisplayerComponent } from '../displayer/index';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuMultiSelectPanelRefFactory } from './panel-ref.factory';

@Component({
	selector: 'lu-multi-select',
	standalone: true,
	imports: [CommonModule, LuTooltipModule, ɵLuOptionOutletDirective],
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
		provideLuSelectOverlayContainer({
			'aria-multiselectable': 'true',
		}),
		provideLuSelectLabelsAndIds(),
		LuMultiSelectPanelRefFactory,
	],
})
export class LuMultiSelectInputComponent<T> extends ALuSelectInputComponent<T, T[]> implements ControlValueAccessor {
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);

	@HostBinding('class.mod-multiple') modMultipleClass = true;

	@Input() valuesTpl?: TemplateRef<LuOptionContext<T[]>> | Type<unknown> = LuMultiSelectDefaultDisplayerComponent;



	protected panelRefFactory = inject(LuMultiSelectPanelRefFactory);

	protected buildPanelRef(): LuSelectPanelRef<T, T[]> {
		return this.panelRefFactory.buildPanelRef(
			{
				initialValue: this.value,
				optionComparer: this.optionComparer,
				options$: this.options$,
				loading$: this.loading$,
				searchable: this.searchable,
				optionTpl: this.optionTpl,
			},
			this.overlayConfig,
		);
	}

	protected override get hasValue(): boolean {
		return this.value && this.value.length > 0;
	}

	override clearValue(event: MouseEvent): void {
		event.stopPropagation();
		this.onChange?.([]);
		this.value = [];
	}
}
