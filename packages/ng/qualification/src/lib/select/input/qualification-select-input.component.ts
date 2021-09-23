import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ILuOptionPickerPanel } from '@lucca-front/ng/option';
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
export class LuQualificationSelectInputComponent<D extends ILuQualification = ILuQualification, P extends ILuOptionPickerPanel<D> = ILuOptionPickerPanel<D>>
	extends ALuSelectInputComponent<D, P>
	implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit {

	@Input() filters: string[];

	isSearching = false;

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
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
