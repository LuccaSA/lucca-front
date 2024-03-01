/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import {
	ChangeDetectorRef,
	Directive,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	Output,
	TemplateRef,
	Type,
	ViewChild,
	booleanAttribute,
	inject,
} from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { LuOptionGrouping, LuSimpleSelectDefaultOptionComponent } from '../option';
import { LuSelectPanelRef } from '../panel';
import { LuOptionContext, SELECT_LABEL, SELECT_LABEL_ID } from '../select.model';

@Directive()
export abstract class ALuSelectInputComponent<TOption, TValue> implements OnDestroy, OnInit {
	@ViewChild('inputElement')
	private inputElementRef: ElementRef<HTMLInputElement>;

	public placeholder$ = new BehaviorSubject('');

	@Input()
	set placeholder(value: string) {
		this.placeholder$.next(value);
	}

	@Input({ transform: booleanAttribute })
	@HostBinding('class.is-clearable')
	clearable = false;

	get searchable(): boolean {
		return this.clueChange.observed;
	}

	@Input({ transform: booleanAttribute })
	disabled = false;

	@HostBinding('class.is-selected')
	protected get isSelectedClass(): boolean {
		return this.hasValue;
	}

	@HostBinding('class.is-searchFilled')
	protected get isSearchFilledClass(): boolean {
		return this.clue?.length > 0;
	}

	protected abstract readonly hasValue: boolean;

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

	@Input() set options(options: TOption[]) {
		this.options$.next(options);
	}

	@Input() optionComparer: (option1: TOption, option2: TOption) => boolean = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);
	@Input() optionTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown> = LuSimpleSelectDefaultOptionComponent;
	@Input() valueTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown>;
	grouping?: LuOptionGrouping<TOption, unknown>;

	@Output() clueChange = new EventEmitter<string>();
	@Output() nextPage = new EventEmitter<void>();
	@Output() previousPage = new EventEmitter<void>();

	public get value(): TValue {
		return this._value;
	}

	protected set value(value: TValue) {
		this._value = value;
		this.changeDetectorRef.markForCheck();
	}

	public get inputPlaceholder(): string | null {
		return this.value ? null : this.placeholder$.value;
	}

	public clueChanged(clue: string): void {
		if (!this.isPanelOpen) {
			this.openPanel(clue);
		} else if (this.lastEmittedClue !== clue) {
			this.clueChange.emit(clue);
			this.lastEmittedClue = clue;
		}
	}

	protected _value?: TValue;

	options$ = new ReplaySubject<TOption[]>(1);
	loading$ = new BehaviorSubject(false);
	clue: string | null = null;
	// This is the clue stored after we selected an option to know if we should emit an empty clue on open or not
	lastEmittedClue: string = '';

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
			case 'Tab':
				this.panelRef?.close();
				break;
			case 'Enter':
				if (this.isPanelOpen) {
					this.panelRef.selectCurrentlyHighlightedValue();
				} else {
					this.panelRef?.handleKeyManagerEvent($event);
				}
				break;
			case 'Space':
			case 'ArrowDown':
			case 'ArrowUp':
				if (this.isPanelOpen) {
					this.panelRef?.handleKeyManagerEvent($event);
				} else {
					this.openPanel();
				}
				break;
			default:
				this.panelRef?.handleKeyManagerEvent($event);
				break;
		}
	}

	protected changeDetectorRef = inject(ChangeDetectorRef);
	protected overlayContainerRef: HTMLElement = inject(OverlayContainer).getContainerElement();

	protected labelElement: HTMLElement | undefined = inject(SELECT_LABEL);
	protected labelId: string = inject(SELECT_LABEL_ID);

	registerOnChange(onChange: (value: TValue) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
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

	clearValue(event: Event): void {
		event.stopPropagation();
		this.updateValue(null);
		this.inputElementRef.nativeElement.focus();
	}

	openPanel(clue: string = ''): void {
		if (this.isPanelOpen || this.disabled) {
			return;
		}

		this.isPanelOpen$.next(true);
		this.clueChanged(clue);
		this._panelRef = this.buildPanelRef();
		this.bindInputToPanelRefEvents();
		setTimeout(() => this.focusInput());
	}

	protected abstract buildPanelRef(): this['panelRef'];

	protected bindInputToPanelRefEvents(): void {
		if (!this.panelRef) {
			return;
		}

		this.panelRef.valueChanged.subscribe((value) => this.updateValue(value));
		this.panelRef.nextPage.subscribe(() => this.nextPage.emit());
		this.panelRef.previousPage.subscribe(() => this.previousPage.emit());
		this.panelRef.activeOptionIdChanged.subscribe((optionId) => {
			this.activeDescendant$.next(optionId);
			this.changeDetectorRef.markForCheck();
		});
		this.panelRef.closed.subscribe(() => this.closePanel());
	}

	protected focusInput(): void {
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
		this.isPanelOpen$.next(false);
		this.panelRef.close();
		this._panelRef = undefined;
	}

	public writeValue(value: TValue): void {
		this.value = value;
	}

	public updateValue(value: TValue): void {
		this.value = value;
		this.emptyClue();
		this.clueChanged('');
		this.onChange?.(value);
		this.onTouched?.();
	}
}
