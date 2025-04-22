import { OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import {
	booleanAttribute,
	ChangeDetectorRef,
	computed,
	Directive,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	inject,
	input,
	Input,
	model,
	OnDestroy,
	OnInit,
	Output,
	signal,
	TemplateRef,
	Type,
	ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { getIntl, PortalContent } from '@lucca-front/ng/core';
import { FilterPillInputComponent } from '@lucca-front/ng/filter-pills';
import { BehaviorSubject, defer, map, Observable, of, ReplaySubject, startWith, Subject, switchMap, take } from 'rxjs';
import { LuOptionGrouping, LuSimpleSelectDefaultOptionComponent } from '../option';
import { LuSelectPanelRef } from '../panel';
import { CoreSelectAddOptionStrategy, LuOptionComparer, LuOptionContext, SELECT_LABEL, SELECT_LABEL_ID } from '../select.model';
import { LU_CORE_SELECT_TRANSLATIONS } from '../select.translate';
import { KeyManagerElement } from '../key-manager-element';

@Directive()
export abstract class ALuSelectInputComponent<TOption, TValue> implements OnDestroy, OnInit, ControlValueAccessor, FilterPillInputComponent {
	protected changeDetectorRef = inject(ChangeDetectorRef);
	protected overlayContainerRef: HTMLElement = inject(OverlayContainer).getContainerElement();

	protected labelElement: HTMLElement | undefined = inject(SELECT_LABEL);
	protected labelId: string = inject(SELECT_LABEL_ID);

	protected coreIntl = getIntl(LU_CORE_SELECT_TRANSLATIONS);

	protected afterCloseFn?: () => void;
	protected updatePositionFn?: () => void;
	protected filterPillMode = false;

	@ViewChild('inputElement')
	private inputElementRef: ElementRef<HTMLInputElement>;

	public placeholder$ = new BehaviorSubject('');

	public disabled$ = new BehaviorSubject(false);
	filterPillDisabled = toSignal(this.disabled$);

	@Input()
	set placeholder(value: string) {
		this.placeholder$.next(value);
	}

	@Input({ transform: booleanAttribute })
	@HostBinding('class.is-clearable')
	set clearable(value: boolean) {
		this.#inputClearable.set(value);
	}
	get clearable(): boolean {
		return this.#clearable();
	}
	#clearable = computed(() => this.#inputClearable() ?? this.#defaultFilterPillClearable() ?? this.#defaultClearable);
	#defaultFilterPillClearable = signal<boolean | null>(null);
	#inputClearable = signal<boolean | null>(null);
	#defaultClearable = false;

	get searchable(): boolean {
		return this.clueChange.observed;
	}

	@Input()
	addOptionLabel: PortalContent = this.coreIntl.addOption;

	@Input()
	set addOptionStrategy(strategy: CoreSelectAddOptionStrategy) {
		this.addOptionStrategy$.next(strategy);
	}

	@HostBinding('class.is-selected')
	protected get isSelectedClass(): boolean {
		return this.hasValue();
	}

	@HostBinding('class.is-searchFilled')
	protected get isSearchFilledClass(): boolean {
		return this.clue?.length > 0;
	}

	protected abstract hasValue(): boolean;

	public get isPanelOpen(): boolean {
		return this.isPanelOpen$.value;
	}

	public isPanelOpen$ = new BehaviorSubject(false);

	public activeDescendant$ = new BehaviorSubject('');

	get ariaControls(): string {
		return this.overlayContainerRef.id;
	}

	@Input()
	overlayConfig?: OverlayConfig = {
		hasBackdrop: true,
		backdropClass: 'cdk-overlay-transparent-backdrop',
	};

	@Input() set loading(value: boolean) {
		if (value !== this.loading) {
			this.loading$.next(value);
		}
	}

	@Input() set options(options: readonly TOption[]) {
		this.options$.next(options);
		if (this.panelRef) {
			// We have to put it in a setTimeout so it'll be triggered AFTER the DOM is updated and not right now,
			// which is before the panel size has been modified by the arrival of the new options
			setTimeout(() => {
				this.panelRef?.updatePosition();
				this.updatePositionFn?.();
			});
		}
	}

	@Input() optionComparer: LuOptionComparer<TOption> = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);
	@Input() optionKey: (option: TOption) => unknown = (option) => option;

	noClueIcon = input(false, { transform: booleanAttribute });
	inputTabindex = input<number>(0);

	@HostBinding('class.mod-noClueIcon')
	protected get isNoClueIconClass(): boolean {
		return this.noClueIcon();
	}

	optionTpl = model<TemplateRef<LuOptionContext<TOption>> | Type<unknown>>(LuSimpleSelectDefaultOptionComponent);
	valueTpl = model<TemplateRef<LuOptionContext<TOption>> | Type<unknown> | undefined>();
	panelHeaderTpl = model<TemplateRef<void> | Type<unknown> | undefined>();
	// For a11y on panel header and possibly footer
	additionalElementsBefore = signal<KeyManagerElement<TOption>[]>([]);
	additionalElementsAfter = signal<KeyManagerElement<TOption>[]>([]);

	displayerTpl = computed(() => this.valueTpl() || this.optionTpl());

	grouping?: LuOptionGrouping<TOption, unknown>;

	@Output() clueChange = new EventEmitter<string>();
	@Output() nextPage = new EventEmitter<void>();
	@Output() previousPage = new EventEmitter<void>();
	@Output() addOption = new EventEmitter<string>();

	public valueSignal = signal<TValue>(null);
	isFilterPillEmpty = computed(() => this.valueSignal() === null);
	isFilterPillClearable = computed(() => this.#clearable());

	public get value(): TValue {
		return this._value;
	}

	protected set value(value: TValue) {
		// TODO remove once migrated to signal, but there's an override
		this._value = value;
		this.valueSignal.set(value);
		this.changeDetectorRef.markForCheck();
	}

	public get inputPlaceholder(): string | null {
		return this.value ? null : this.placeholder$.value;
	}

	public clueChanged(clue: string, skipPanelOpen = false): void {
		this.clue = clue;

		if (!skipPanelOpen && !this.isPanelOpen) {
			this.openPanel(clue);
		} else if (this.lastEmittedClue !== clue) {
			this.clueChange.emit(clue);
			this.lastEmittedClue = clue;
		}
	}

	protected _value?: TValue;

	options$ = new ReplaySubject<readonly TOption[]>(1);
	loading$ = new BehaviorSubject(false);
	clue: string | null = null;
	// This is the clue stored after we selected an option to know if we should emit an empty clue on open or not
	lastEmittedClue: string = '';
	clue$ = defer(() => this.clueChange.pipe(startWith(this.clue)));

	addOptionStrategy$ = new BehaviorSubject<CoreSelectAddOptionStrategy>('never');
	shouldDisplayAddOption$ = this.addOptionStrategy$.pipe(
		switchMap((strategy) => {
			switch (strategy) {
				case 'always':
					return of(true);
				case 'never':
					return of(false);
				case 'if-empty-clue':
					return this.clue$.pipe(map((clue) => !clue));
				case 'if-not-empty-clue':
					return this.clue$.pipe(map((clue) => !!clue));
			}
		}),
	);

	protected onChange?: (value: TValue | null) => void;
	protected onTouched?: () => void;

	public get panelRef(): LuSelectPanelRef<TOption, TValue> | undefined {
		return this._panelRef;
	}

	protected _panelRef?: LuSelectPanelRef<TOption, TValue>;

	protected destroyed$ = new Subject<void>();

	@HostListener('click', ['$event'])
	onClickOpenPanel($event: KeyboardEvent) {
		if (!this.isPanelOpen) {
			this.openPanel();
			$event.stopPropagation();
			$event.preventDefault();
		}
	}

	@HostListener('keydown', ['$event'])
	onKeyDownNavigation($event: KeyboardEvent): void {
		switch ($event.key) {
			case 'Escape':
				if (this.isPanelOpen) {
					$event.stopPropagation();
				}
				this.panelRef?.close();
				break;
			case 'Tab':
				// If we are in a filterpill, this will close it on tab press, but we want it to not lose any
				// displayed stuff and properly close on focus exit
				this.panelRef?.close();
				break;
			case 'Enter':
				if (this.isPanelOpen) {
					// Prevent form submission when selecting a value with Enter
					$event.preventDefault();
					this.panelRef.selectCurrentlyHighlightedValue();
				} else {
					this.panelRef?.handleKeyManagerEvent($event);
				}
				break;
			case ' ':
			case 'ArrowDown':
			case 'ArrowUp':
				// Initial space should just open the panel, not trigger a clue change
				if (!this.clue && $event.key === ' ') {
					$event.preventDefault();
				}
				if (this.isPanelOpen) {
					this.panelRef?.handleKeyManagerEvent($event);
				} else {
					this.openPanel();
				}
				break;
			default:
				// For any other key, forward it to the panel if it's open
				if (this.isPanelOpen) {
					this.panelRef?.handleKeyManagerEvent($event);
				} else if ($event.key.length === 1) {
					this.openPanel($event.key);
				}
				break;
		}
	}

	registerOnChange(onChange: (value: TValue) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled$.next(isDisabled);
		this.changeDetectorRef.markForCheck();
	}

	ngOnDestroy(): void {
		this.closePanel();
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	ngOnInit(): void {
		if (this.labelElement) {
			this.labelElement.id = this.labelId;
		}
	}

	clearValue(event?: Event): void {
		if (event) {
			event.stopPropagation();
		}
		this.updateValue(null, true);
		this.inputElementRef.nativeElement.focus();
	}

	openPanel(clue: string = ''): void {
		if (this.filterPillMode || this.isPanelOpen || this.disabled$.value) {
			return;
		}

		this.focusInput();

		/**
		 * I know what you're thinking, but let me explain:
		 *
		 * When setting isPanelOpen$'s internal value to true and then calling clueChanged,
		 * it creates a race condition which calls this method again from inside clueChanged's code before
		 * the change is applied inside the Subject, meaning this is called twice and we get a double tap.
		 *
		 * The only easy solution is this (or store yet another boolean like "isOpeningPanel" which is, imo, equally ugly.
		 */
		setTimeout(() => {
			if (this.isPanelOpen) {
				return;
			}

			this.isPanelOpen$.next(true);

			if (this.searchable) {
				this.clueChanged(clue);
			}

			this._panelRef = this.buildPanelRef();
			this.bindInputToPanelRefEvents();
		});
	}

	emitAddOption(): void {
		this.addOption.emit(this.clue);
		this.panelRef?.close();
	}

	protected abstract buildPanelRef(): this['panelRef'];

	protected bindInputToPanelRefEvents(): void {
		if (!this.panelRef) {
			return;
		}

		this.panelRef.valueChanged.subscribe((value) => this.updateValue(value));

		this.#pageChanged(this.panelRef.nextPage).subscribe(() => this.nextPage.emit());
		this.#pageChanged(this.panelRef.previousPage).subscribe(() => this.previousPage.emit());

		this.panelRef.activeOptionIdChanged.subscribe((optionId) => {
			this.activeDescendant$.next(optionId);
			this.changeDetectorRef.markForCheck();
		});
		this.panelRef.closed.subscribe(() => this.closePanel());
	}

	focusInput(): void {
		if (this.inputElementRef) {
			this.inputElementRef.nativeElement.focus();
		}
	}

	protected emptyClue(): void {
		if (this.clue) {
			this.clue = null;
			this.changeDetectorRef.markForCheck();
		}
	}

	public closePanel(): void {
		if (!this.isPanelOpen) {
			return;
		}
		this.emptyClue();
		this.activeDescendant$.next('');
		this.changeDetectorRef.markForCheck();
		this.onTouched?.();
		if (!this.filterPillMode) {
			this.isPanelOpen$.next(false);
			this.panelRef.close();
			this._panelRef = undefined;
			this.focusInput();
		}
		this.afterCloseFn?.();
	}

	public writeValue(value: TValue): void {
		this.value = value;
	}

	public updateValue(value: TValue, skipPanelOpen = false, noClear = false): void {
		this.value = value;
		if (!noClear) {
			this.emptyClue();
			this.clueChanged('', skipPanelOpen);
		}
		this.onChange?.(value);
		this.onTouched?.();
	}

	// Ensure nextPage/previousPage does not emit too often
	#pageChanged(pageEmitter: EventEmitter<void>): Observable<void> {
		return this.options$.pipe(switchMap(() => pageEmitter.pipe(take(1))));
	}

	// Filter pill interface
	clearFilterPillValue(): void {
		this.clearValue();
	}

	registerFilterPillClosePopover(closeFn: () => void): void {
		this.afterCloseFn = closeFn;
	}

	registerFilterPillUpdatePosition(updatePositionFn: () => void): void {
		this.updatePositionFn = updatePositionFn;
	}

	enableFilterPillMode() {
		this.filterPillMode = true;
		this.#defaultFilterPillClearable.set(true);
		this._panelRef.closed.subscribe(this.afterCloseFn);
		this.bindInputToPanelRefEvents();
	}

	onFilterPillOpened(): void {
		this.isPanelOpen$.next(true);
	}

	onFilterPillClosed(): void {
		this.isPanelOpen$.next(false);
	}
}
