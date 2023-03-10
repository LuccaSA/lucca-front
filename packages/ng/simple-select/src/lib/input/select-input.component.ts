import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuOptionOutletDirective, LuSelectPanelRef, provideLuSelectLabelsAndIds, provideLuSelectOverlayContainer } from '@lucca-front/ng/core-select';
import { LU_SIMPLE_SELECT_TRANSLATIONS } from '../select.translate';
import { LuSimpleSelectPanelRefFactory } from './panel-ref.factory';

@Component({
	selector: 'lu-simple-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, LuOptionOutletDirective, NgIf, OverlayModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSimpleSelectInputComponent),
			multi: true,
		},
		LuSimpleSelectPanelRefFactory,
		provideLuSelectOverlayContainer(),
		provideLuSelectLabelsAndIds(),
	],
})
export class LuSimpleSelectInputComponent<T> extends ALuSelectInputComponent<T, T> implements ControlValueAccessor {
	intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

	protected panelRefFactory = inject(LuSimpleSelectPanelRefFactory);

	protected buildPanelRef(): LuSelectPanelRef<T, T> {
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
}
