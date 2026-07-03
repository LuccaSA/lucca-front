import { CommonModule } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	forwardRef,
	HostBinding,
	HostListener,
	inject,
	input,
	Input,
	model,
	numberAttribute,
	OnDestroy,
	OnInit,
	Signal,
	signal,
	TemplateRef,
	Type,
	untracked,
	viewChild,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ALuSelectInputComponent, LU_CORE_SELECT_TRANSLATIONS, LuOptionContext, provideLuSelectLabelsAndIds, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective, FilterPillLabelDirective } from '@lucca-front/ng/filter-pills';
import { PresentationDisplayDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { IconComponent } from '@lucca/prisme/icon';
import { Subject } from 'rxjs';
import { LuMultiSelectDefaultDisplayerComponent } from '../displayer';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuMultiSelectPanelRefFactory } from './panel-ref.factory';
import { LuMultiSelectPanelRef } from './panel.model';

@Component({
	selector: 'lu-multi-select',
	templateUrl: './select-input.component.html',
	styleUrl: './select-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		LuTooltipModule,
		ɵLuOptionOutletDirective,
		FilterPillDisplayerDirective,
		FilterPillLabelDirective,
		ClearComponent,
		PresentationDisplayDirective,
		CommonModule,
		ɵPresentationDisplayDefaultDirective,
		IconComponent,
	],
	providers: [
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
export class LuMultiSelectInputComponent<T> extends ALuSelectInputComponent<T, T[]> implements OnDestroy, OnInit {
	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_TRANSLATIONS, LU_MULTI_SELECT_TRANSLATIONS));

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

	// eslint-disable-next-line @angular-eslint/prefer-signals
	public selectedOptions: Signal<T[]> = computed(() => this.value() ?? []);

	readonly hideCombobox = computed(() => this.selectedOptions().length > 1);

	filterPillPanelAnchorRef = viewChild('filterPillPanelAnchor', { read: ViewContainerRef });

	// eslint-disable-next-line @angular-eslint/prefer-signals
	override isFilterPillEmpty = computed(() => this.selectedOptions().length === 0);

	// eslint-disable-next-line @angular-eslint/prefer-signals
	public valueLength = computed(() => this.selectedOptions().length);
	// eslint-disable-next-line @angular-eslint/prefer-signals
	public useSingleOptionDisplayer: Signal<boolean> = signal(true);

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

	constructor() {
		super();

		effect(() => {
			const selectedOptions = this.selectedOptions();
			untracked(() => this.panelRef?.updateSelectedOptions(selectedOptions));
		});
	}

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
		return this.selectedOptions().length > 0;
	}

	override clearValue(event?: Event): void {
		event?.stopPropagation();
		this.setValue([]);
		this.focusInput$.next({ keepClue: true });
		this.panelRef?.updateSelectedOptions([]);
	}

	override ngOnDestroy() {
		super.ngOnDestroy();
		this.focusInput$.complete();
	}
}
