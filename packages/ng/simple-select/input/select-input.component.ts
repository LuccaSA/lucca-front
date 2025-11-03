import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, inject, input, viewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuSelectPanelRef, provideLuSelectLabelsAndIds, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective } from '@lucca-front/ng/filter-pills';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_SIMPLE_SELECT_TRANSLATIONS } from '../select.translate';
import { LuSimpleSelectPanelRefFactory } from './panel-ref.factory';

@Component({
	selector: 'lu-simple-select',
	templateUrl: './select-input.component.html',
	styleUrl: './select-input.component.scss',
	host: { class: 'simpleSelect' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, ɵLuOptionOutletDirective, OverlayModule, FormsModule, InputDirective, FilterPillDisplayerDirective, NgTemplateOutlet, IconComponent],
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
})
export class LuSimpleSelectInputComponent<T> extends ALuSelectInputComponent<T, T> implements ControlValueAccessor {
	intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

	@HostBinding('class.mod-filterPill')
	public get filterPillClass() {
		return this.filterPillMode;
	}

	autocomplete = input<AutoFill>('off');

	filterPillPanelAnchorRef = viewChild('filterPillPanelAnchor', { read: ViewContainerRef });

	protected panelRefFactory = inject(LuSimpleSelectPanelRefFactory);

	protected buildPanelRef(): LuSelectPanelRef<T, T> {
		return this.panelRefFactory.buildPanelRef(this, this.overlayConfig);
	}

	inputSpace(event: Event): void {
		if (this.filterPillMode) {
			if (this.clue.length === 0) {
				event.preventDefault();
				this.panelRef?.selectCurrentlyHighlightedValue();
			}
		}
	}

	protected hasValue(): boolean {
		return this.value !== null && this.value !== undefined;
	}

	override enableFilterPillMode() {
		this._panelRef = this.panelRefFactory.buildAndAttachPanelRef(this, this.filterPillPanelAnchorRef());
		super.enableFilterPillMode();
	}
}
