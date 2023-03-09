/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayConfig, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, inject, Input, OnDestroy, OnInit, Output, TemplateRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { LuSimpleSelectDefaultOptionComponent } from '../option';
import { ILuOptionContext, LU_OPTION_CONTEXT, optionContextFactory } from '../option/option.token';
import { LuSelectPanelRef } from '../panel';
import { LuOptionContext, SELECT_LABEL, SELECT_LABEL_ID } from '../select.model';
import { LuSimpleSelectPanelRefFactory } from './panel-ref.factory';
import { provideLuSelectLabelsAndIds, provideLuSelectOverlayContainer } from './select-input.models';

@Component({
	selector: 'lu-simple-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, NgComponentOutlet, NgIf, NgTemplateOutlet, OverlayModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSimpleSelectInputComponent),
			multi: true,
		},
		provideLuSelectOverlayContainer(),
		provideLuSelectLabelsAndIds(),
		LuSimpleSelectPanelRefFactory,
		{
			provide: LU_OPTION_CONTEXT,
			useFactory: optionContextFactory,
		},
	],
})
export class LuSimpleSelectInputComponent<T> implements ControlValueAccessor, OnDestroy, OnInit {
	@HostBinding('tabindex') tabindex = 0;

	@Input() placeholder = '';

	@Input()
	@HostBinding('class.mod-multiple')
	multiple = false;

	@Input()
	@HostBinding('class.is-clearable')
	clearable = false;

	get searchable(): boolean {
		return this.clueChange.observed;
	}

	@Input()
	@HostBinding('class.is-disabled')
	disabled = false;

	@HostBinding('class.is-filled')
	get isFilled(): boolean {
		return this.value !== null && this.value !== undefined;
	}

	@HostBinding('class.is-focused')
	@HostBinding('attr.aria-expanded')
	public isPanelOpen = false;

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

	@Input() set options(options: T[]) {
		this.options$.next(options);
	}

	@Input() optionComparer: (option1: T, option2: T) => boolean = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);
	@Input() optionTpl?: TemplateRef<LuOptionContext<T>> | Type<unknown> = LuSimpleSelectDefaultOptionComponent;
	@Input() valueTpl?: TemplateRef<LuOptionContext<T>> | Type<unknown>;

	@Output() clueChange = new EventEmitter<string>();
	@Output() nextPage = new EventEmitter<void>();
	@Output() previousPage = new EventEmitter<void>();

	public get value(): T {
		return this.displayerContext.option$.value;
	}
	options$ = new ReplaySubject<T[]>(1);
	loading$ = new ReplaySubject<boolean>(1);
	clue: string | null = null;
	displayerContext = inject<ILuOptionContext<T>>(LU_OPTION_CONTEXT);

	protected get displayerTplOrComponent(): TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined {
		return this.valueTpl || this.optionTpl;
	}

	protected get displayerTpl(): TemplateRef<LuOptionContext<T>> | undefined {
		return this.displayerTplOrComponent instanceof TemplateRef ? this.displayerTplOrComponent : undefined;
	}

	protected get displayerComponent(): Type<unknown> | undefined {
		return this.displayerTplOrComponent instanceof TemplateRef ? undefined : this.displayerTplOrComponent;
	}

	protected onChange?: (value: T | null) => void;
	protected onTouched?: () => void;

	protected panelRef?: LuSelectPanelRef<T>;
	protected destroyed$ = new Subject<void>();

	@HostListener('keydown.space', ['$event'])
	@HostListener('keydown.enter', ['$event'])
	@HostListener('keydown.arrowDown', ['$event'])
	@HostListener('click', ['$event'])
	onKeydown($event: KeyboardEvent) {
		if (!this.isPanelOpen) {
			this.openPanel();
			$event.stopPropagation();
			$event.preventDefault();
		}
	}

	protected changeDetectorRef = inject(ChangeDetectorRef);
	protected overlayContainerRef: HTMLElement = inject(OverlayContainer).getContainerElement();
	protected panelRefFactory = inject(LuSimpleSelectPanelRefFactory);

	protected label: HTMLElement | undefined = inject(SELECT_LABEL);
	protected labelId: string = inject(SELECT_LABEL_ID);

	registerOnChange(onChange: (value: T) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	ngOnDestroy(): void {
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
		this.onChange?.(null);
		this.displayerContext.option$.next(null);
	}

	openPanel(): void {
		if (this.isPanelOpen || this.disabled) {
			return;
		}

		this.isPanelOpen = true;
		this.panelRef = this.panelRefFactory.buildPanelRef(
			{
				initialValue: this.value,
				optionComparer: this.optionComparer,
				options$: this.options$,
				loading$: this.loading$,
				searchable: this.searchable,
				optionTplOrType: this.optionTpl,
			},
			this.overlayConfig,
		);

		this.panelRef.valueChanged.subscribe((value) => {
			this.onChange?.(value);
			this.displayerContext.option$.next(value);
		});
		this.panelRef.nextPage.subscribe(() => this.nextPage.emit());
		this.panelRef.previousPage.subscribe(() => this.previousPage.emit());
		this.panelRef.clueChanged.subscribe((clue) => {
			this.clueChange.emit(clue);
			this.clue = clue;
		});
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
		this.isPanelOpen = false;
		this.panelRef.close();
		this.panelRef = undefined;
	}

	public writeValue(value: T): void {
		this.displayerContext.option$.next(value);
	}
}
