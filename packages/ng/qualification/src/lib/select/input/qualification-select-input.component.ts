import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ILuOptionPickerPanel, LuOptionComparer } from '@lucca-front/ng/option';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ILuQualification } from '../../qualification.model';
import { LuQualificationSelectInputIntl } from './qualification-select-input.intl';
import { ILuQualificationSelectInputLabel } from './qualification-select-input.translate';

@Component({
	selector: 'lu-qualification-select',
	templateUrl: './qualification-select-input.component.html',
	styleUrls: ['./qualification-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuQualificationSelectInputComponent),
			multi: true,
		}
	],
})
export class LuQualificationSelectInputComponent<D extends import('../../qualification.model').ILuQualification = import('../../qualification.model').ILuQualification, P extends ILuOptionPickerPanel<D> = ILuOptionPickerPanel<D>>
	extends ALuSelectInputComponent<D, P>
	implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit {

	byId: LuOptionComparer<D> = (option1: D, option2: D) => option1 && option2 && option1.id === option2.id;

	@Input() filters: string[];
	public get allFilters(): string[] {
		return this.filters == null ? ['sort=job.name,level.position'] :
			[...this.filters, 'sort=job.name,level.position'];
	}

	isSearching = false;

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
		@Inject(LuQualificationSelectInputIntl) public intl: ILuQualificationSelectInputLabel
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
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
