/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Input, OnDestroy, OnInit, Output, TemplateRef, Type, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { LuSimpleSelectDefaultOptionComponent } from '../option';
import { LuSelectPanelRef } from '../panel';
import { LuOptionContext, SELECT_LABEL, SELECT_LABEL_ID } from '../select.model';

@Directive()
export abstract class ALuSelectInputComponent<TOption, TValue> implements OnDestroy, OnInit {
	@ViewChild('inputElement')
	private inputElementRef: ElementRef<HTMLInputElement>;

	@HostBinding('tabindex') tabindex = 0;

	@Input() placeholder = '';

	@Input()
	@HostBinding('class.is-clearable')
	clearable = false;

	get searchable(): boolean {
		return this.clueChange.observed;
	}

	@Input()
	@HostBinding('class.is-disabled')
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

	@HostBinding('class.is-focused')
	@HostBinding('attr.aria-expanded')
	public get isPanelOpen(): boolean {
		return this.isPanelOpen$.value;
	}

	public isPanelOpen$ = new BehaviorSubject(false);

	@HostBinding('attr.role')
	public role = 'combobox';

	@HostBinding('attr.aria-activedescendant')
	public activeDescendant: string | undefined;

	@HostBinding('attr.aria-controls')
	get ariaControls(): string {
		return this.overlayContainerRef.id;
	}

	@Input()
	overlayConfig?: OverlayConfig = {
		hasBackdrop: true,
		backdropClass: 'cdk-overlay-transparent-backdrop',
	};

	@Input() set loading(value: boolean) {
		this.loading$.next(value);
	}

	@Input() set options(options: TOption[]) {
		this.options$.next(options);
	}

	@Input() optionComparer: (option1: TOption, option2: TOption) => boolean = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);
	@Input() optionTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown> = LuSimpleSelectDefaultOptionComponent;
	@Input() valueTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown>;

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

	protected _value?: TValue;

	options$ = new ReplaySubject<TOption[]>(1);
	loading$ = new ReplaySubject<boolean>(1);
	clue: string | null = null;

	protected onChange?: (value: TValue | null) => void;
	protected onTouched?: () => void;

	public get panelRef(): LuSelectPanelRef<TOption, TValue> | undefined {
		return this._panelRef;
	}

	protected _panelRef?: LuSelectPanelRef<TOption, TValue>;

	protected destroyed$ = new Subject<void>();

	@HostListener('keydown.space', ['$event'])
	@HostListener('keydown.enter', ['$event'])
	@HostListener('keydown.arrowDown', ['$event'])
	@HostListener('click', ['$event'])
	onKeydownOpenPanel($event: KeyboardEvent) {
		if (!this.isPanelOpen) {
			this.openPanel();
			if (this.inputElementRef) {
				setTimeout(() => this.inputElementRef.nativeElement.focus());
			}
			$event.stopPropagation();
			$event.preventDefault();
		}
	}

	@HostListener('keydown', ['$event'])
	onKeyDownNavigation($event: KeyboardEvent): void {
		switch ($event.key) {
			case 'Escape':
			case 'Tab':
				return this.panelRef.close();
			case 'Enter':
				return this.panelRef.selectCurrentlHiglightedValue();
			default:
				this.panelRef.handleKeyManagerEvent($event);
		}
	}

	protected changeDetectorRef = inject(ChangeDetectorRef);
	protected overlayContainerRef: HTMLElement = inject(OverlayContainer).getContainerElement();

	protected label: HTMLElement | undefined = inject(SELECT_LABEL);
	protected labelId: string = inject(SELECT_LABEL_ID);

	registerOnChange(onChange: (value: TValue) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	ngOnDestroy(): void {
		this.closePanel();
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	ngOnInit(): void {
		if (this.label) {
			this.label.id = this.labelId;
		}
	}

	clearValue(event: MouseEvent): void {
		event.stopPropagation();
		this.updateValue(null);
	}

	openPanel(): void {
		if (this.isPanelOpen || this.disabled) {
			return;
		}

		this.isPanelOpen$.next(true);
		this._panelRef = this.buildPanelRef();
		this.bindInputToPanelRefEvents();
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
			this.activeDescendant = optionId;
			this.changeDetectorRef.markForCheck();
		});
		this.panelRef.closed.subscribe(() => this.closePanel());
	}

	public closePanel(): void {
		if (!this.isPanelOpen) {
			return;
		}
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
		this.onChange?.(value);
		this.onTouched?.();
	}
}
