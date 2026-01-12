import { AsyncPipe } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	HostBinding,
	HostListener,
	inject,
	Input,
	model,
	numberAttribute,
	OnDestroy,
	OnInit,
	Signal,
	signal,
	TemplateRef,
	Type,
	viewChild,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { getIntl } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LuOptionContext, provideLuSelectLabelsAndIds, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective, FilterPillLabelDirective } from '@lucca-front/ng/filter-pills';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Subject } from 'rxjs';
import { LuMultiSelectDefaultDisplayerComponent } from '../displayer';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuMultiSelectPanelRefFactory } from './panel-ref.factory';
import { LuMultiSelectPanelRef } from './panel.model';
import { PresentationDisplayDirective } from '../../form-field/value-presentation/presentation-display.directive';

@Component({
	selector: 'lu-multi-select',
	templateUrl: './select-input.component.html',
	styleUrl: './select-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, LuTooltipModule, ɵLuOptionOutletDirective, FilterPillDisplayerDirective, FilterPillLabelDirective, ClearComponent, PresentationDisplayDirective],
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
		provideLuSelectLabelsAndIds(),
		LuMultiSelectPanelRefFactory,
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => LuMultiSelectInputComponent),
		},
	],
	host: {
		class: 'multiSelect',
	},
	encapsulation: ViewEncapsulation.None,
})
export class LuMultiSelectInputComponent<T> extends ALuSelectInputComponent<T, T[]> implements ControlValueAccessor, OnDestroy, OnInit {
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);

	showColon: false;

	valuesTpl = model<TemplateRef<LuOptionContext<T[]>> | Type<unknown>>(LuMultiSelectDefaultDisplayerComponent);

	@Input({ transform: numberAttribute })
	maxValuesShown = 500;

	@Input({ transform: booleanAttribute })
	keepSearchAfterSelection = false;

	@Input()
	filterPillLabelPlural: string;

	override selectParent$ = new Subject<void>();
	override selectChildren$ = new Subject<void>();

	@HostBinding('class.mod-filterPill')
	public get filterPillClass() {
		return this.filterPillMode;
	}

	hideCombobox = computed(() => this.valueSignal()?.length > 1);

	filterPillPanelAnchorRef = viewChild('filterPillPanelAnchor', { read: ViewContainerRef });

	override isFilterPillEmpty = computed(() => {
		const valueSignal = this.valueSignal();
		return !valueSignal || valueSignal.length === 0;
	});

	public valueLength = computed(() => this.valueSignal()?.length ?? 0);
	public useSingleOptionDisplayer: Signal<boolean> = signal(true);
	override _value: T[] = [];

	public override get panelRef(): LuMultiSelectPanelRef<T> | undefined {
		return this._panelRef;
	}

	protected override _panelRef?: LuMultiSelectPanelRef<T>;

	protected panelRefFactory = inject(LuMultiSelectPanelRefFactory);

	/**
	 * This is used to tell the displayer to focus on the input element
	 * keepClue is used to avoid triggering an update which would open the panel,
	 * mainly for when we want to focus without opening the panel
	 */
	public readonly focusInput$ = new Subject<void | { keepClue: boolean }>();

	public readonly emptyClue$ = new Subject<void>();

	@HostListener('keydown.control.enter')
	public selectParentOnly() {
		this.selectParent$.next();
	}

	@HostListener('keydown.shift.enter')
	public selectChildrenOnly() {
		this.selectChildren$.next();
	}

	public override focusInput(): void {
		this.focusInput$.next({ keepClue: true });
	}

	public override emptyClue(): void {
		this.emptyClue$.next();
	}

	public override writeValue(value: T[]): void {
		super.writeValue(value);
		this.panelRef?.updateSelectedOptions(value);
	}

	public override updateValue(value: T[], skipFocus = false): void {
		super.updateValue(value, skipFocus, this.keepSearchAfterSelection);
		if (!skipFocus) {
			this.focusInput();
		}
	}

	updatePosition() {
		this.updatePositionFn?.();
	}

	protected override buildPanelRef(): LuMultiSelectPanelRef<T> {
		return this.panelRefFactory.buildPanelRef(this, this.overlayConfig);
	}

	protected override bindInputToPanelRefEvents(): void {
		if (!this.panelRef) {
			return;
		}

		super.bindInputToPanelRefEvents();
	}

	override enableFilterPillMode() {
		this._panelRef = this.panelRefFactory.buildAndAttachPanelRef(this, this.filterPillPanelAnchorRef());
		super.enableFilterPillMode();
	}

	hasValue(): boolean {
		return !!this.value?.length;
	}

	override clearValue(event?: Event): void {
		event?.stopPropagation();
		this.onChange?.([]);
		this.value = [];
		this.focusInput$.next({ keepClue: true });
		this.panelRef?.updateSelectedOptions([]);
	}

	override ngOnDestroy() {
		super.ngOnDestroy();
		this.focusInput$.complete();
	}
}
