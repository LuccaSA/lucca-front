import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuSelectPanelRef, provideLuSelectLabelsAndIds, provideLuSelectOverlayContainer, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_SIMPLE_SELECT_TRANSLATIONS } from '../select.translate';
import { LuSimpleSelectPanelRefFactory } from './panel-ref.factory';

@Component({
	selector: 'lu-simple-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, ɵLuOptionOutletDirective, NgIf, OverlayModule, IconComponent, FormsModule, InputDirective],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSimpleSelectInputComponent),
			multi: true,
		},
		{
			provide: ALuSelectInputComponent,
			useExisting: forwardRef(() => LuSimpleSelectInputComponent),
		},
		LuSimpleSelectPanelRefFactory,
		provideLuSelectOverlayContainer(),
		provideLuSelectLabelsAndIds(),
	],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'simpleSelect',
	},
})
export class LuSimpleSelectInputComponent<T> extends ALuSelectInputComponent<T, T> implements ControlValueAccessor {
	intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

	protected panelRefFactory = inject(LuSimpleSelectPanelRefFactory);

	protected buildPanelRef(): LuSelectPanelRef<T, T> {
		return this.panelRefFactory.buildPanelRef(this, this.overlayConfig);
	}

	protected hasValue(): boolean {
		return this.value !== null && this.value !== undefined;
	}
}
