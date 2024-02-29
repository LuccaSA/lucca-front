import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LuApiPagedSearcherComponent } from '@lucca-front/ng/api';
import { getIntl } from '@lucca-front/ng/core';
import { LuInputClearerComponent, LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { ILuOptionPickerPanel, LuForGroupsDirective, LuOptionComparer, LuOptionItemComponent, LuOptionPickerAdvancedComponent } from '@lucca-front/ng/option';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ILuQualification } from '../../qualification.model';
import { LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS } from './qualification-select-input.translate';

@Component({
	selector: 'lu-qualification-select',
	templateUrl: './qualification-select-input.component.html',
	styleUrls: ['./qualification-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, OverlayModule, LuInputClearerComponent, LuOptionPickerAdvancedComponent, LuApiPagedSearcherComponent, LuOptionItemComponent, LuForGroupsDirective, LuInputDisplayerDirective],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuQualificationSelectInputComponent),
			multi: true,
		},
	],
})
/**
 * @deprecated prefer SimpleSelect or MultipleSelect with jobQualifications directive
 */
export class LuQualificationSelectInputComponent<
		D extends import('../../qualification.model').ILuQualification = import('../../qualification.model').ILuQualification,
		P extends ILuOptionPickerPanel<D> = ILuOptionPickerPanel<D>,
	>
	extends ALuSelectInputComponent<D, P>
	implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit
{
	byId: LuOptionComparer<D> = (option1: D, option2: D) => option1 && option2 && option1.id === option2.id;

	@Input() filters: string[];

	isSearching = false;

	public intl = getIntl(LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS);

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}

	onIsSearchingChanged(isSearching: boolean) {
		this.isSearching = isSearching;
		this._changeDetectorRef.detectChanges();
	}

	trackById(_: number, item: ILuQualification): number {
		return item.id;
	}

	groupByJobName(qualification: ILuQualification): string {
		return qualification.job.name;
	}
}
