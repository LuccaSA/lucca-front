import { PositionStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, inject, Input, TemplateRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuOptionContext, provideLuSelectLabelsAndIds, provideLuSelectOverlayContainer, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { ReplaySubject } from 'rxjs';
import { LuMultiSelectDefaultDisplayerComponent } from '../displayer/index';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuMultiSelectPanelRefFactory } from './panel-ref.factory';
import { LuMultiSelectPanelRef } from './panel.model';

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
		provideLuSelectOverlayContainer(),
		provideLuSelectLabelsAndIds(),
		LuMultiSelectPanelRefFactory,
	],
})
export class LuMultiSelectInputComponent<T> extends ALuSelectInputComponent<T, T[]> implements ControlValueAccessor {
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);

	@HostBinding('class.mod-multiple') modMultipleClass = true;

	@Input() valuesTpl?: TemplateRef<LuOptionContext<T[]>> | Type<unknown> = LuMultiSelectDefaultDisplayerComponent;

	// TODO This is for select all
	// @Input() set areAllOptionsSelected(selected: boolean | undefined) {
	// 	this.areAllOptionsSelected$.next(selected);
	// }

	@Input()
	expandedPositionStrategy?: PositionStrategy;

	// TODO this is for select all
	// @Output() selectAll = new EventEmitter<void>();

	@Input()
	expanded = false;

	@Input()
	public override get panelRef(): LuMultiSelectPanelRef<T> | undefined {
		return this._panelRef;
	}

	protected areAllOptionsSelected$ = new ReplaySubject<boolean | undefined>(1);

	protected override _panelRef?: LuMultiSelectPanelRef<T>;

	protected panelRefFactory = inject(LuMultiSelectPanelRefFactory);

	public override writeValue(value: T[]): void {
		super.writeValue(value);
		this.panelRef?.updateSelectedOptions(value);
	}

	protected override buildPanelRef(): LuMultiSelectPanelRef<T> {
		return this.panelRefFactory.buildPanelRef(
			{
				initialValue: this.value,
				optionComparer: this.optionComparer,
				options$: this.options$,
				loading$: this.loading$,
				searchable: this.searchable,
				optionTpl: this.optionTpl,
				canSelectAll: false, // TODO Connect this to this.selectAll.observed when we'll be fixed on how to implement select all
				areAllOptionsSelected$: this.areAllOptionsSelected$,
				expanded: this.expanded,
			},
			this.overlayConfig,
			this.expandedPositionStrategy,
		);
	}

	protected override bindInputToPanelRefEvents(): void {
		if (!this.panelRef) {
			return;
		}

		super.bindInputToPanelRefEvents();
		// TODO This is for select all
		// this.panelRef.selectAll.subscribe(() => this.selectAll.emit());
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