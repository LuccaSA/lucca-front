import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, signal, viewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuSelectPanelRef, provideLuSelectLabelsAndIds, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LU_SIMPLE_SELECT_TRANSLATIONS } from '../select.translate';
import { LuSimpleSelectPanelRefFactory } from './panel-ref.factory';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillInputComponent } from '../../filter-pills/core';

@Component({
	selector: 'lu-simple-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, ɵLuOptionOutletDirective, NgIf, OverlayModule, FormsModule, InputDirective],
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
		provideLuSelectLabelsAndIds(),
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => LuSimpleSelectInputComponent),
		},
	],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'simpleSelect',
	},
})
export class LuSimpleSelectInputComponent<T> extends ALuSelectInputComponent<T, T> implements ControlValueAccessor, FilterPillInputComponent {
	//TODO Connect to hasValue somehow
	isFilterPillEmpty = signal(false);

	intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

	@Input()
	autocomplete?: string;

	filterPillPanelAnchorRef = viewChild('filterPillPanelAnchor', { read: ViewContainerRef });

	protected panelRefFactory = inject(LuSimpleSelectPanelRefFactory);

	protected buildPanelRef(): LuSelectPanelRef<T, T> {
		return this.panelRefFactory.buildPanelRef(this, this.overlayConfig);
	}

	protected hasValue(): boolean {
		return this.value !== null && this.value !== undefined;
	}

	clearFilterPillValue(): void {
		this.clearValue();
	}

	registerFilterPillClosePopover(closeFn: () => void): void {
		this.afterCloseFn = closeFn;
	}

	enableFilterPillMode() {
		this.panelRefFactory.buildAndAttachPanelRef(this, this.filterPillPanelAnchorRef());
	}
}
