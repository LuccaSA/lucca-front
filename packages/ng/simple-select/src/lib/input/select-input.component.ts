/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Overlay, OverlayConfig, OverlayContainer, OverlayModule, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ComponentRef,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostBinding,
	HostListener,
	Inject,
	Injectable,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	Output,
	TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LuSelectPanelComponent, LuSelectPanelRef } from '../panel/index';
import { ILuSelectPanelData, LuOptionContext, SELECT_ID, SELECT_LABEL, SELECT_LABEL_ID, SELECT_PANEL_DATA } from '../select.model';

let selectId = 0;

function selectIdFactory(): number {
	return selectId++;
}

function selectLabelFactory(elementRef: ElementRef<HTMLElement>): HTMLLabelElement | undefined {
	function getLabel(node: HTMLElement): HTMLLabelElement | undefined {
		if (node instanceof HTMLLabelElement) {
			return node;
		}

		if (!node.parentElement) {
			return undefined;
		}

		return getLabel(node.parentElement);
	}

	return getLabel(elementRef.nativeElement);
}

function selectLabelIdFactory(label: HTMLLabelElement | undefined, selectId: number): string {
	return label?.id || `lu-select-label-${selectId}`;
}

@Injectable()
class LuSelectOverlayContainer extends OverlayContainer {
	constructor(@Inject(DOCUMENT) document: Document, platform: Platform, @Inject(SELECT_LABEL_ID) private selectLabelId: string, @Inject(SELECT_ID) private selectId: number) {
		super(document, platform);
	}
	protected override _createContainer(): void {
		super._createContainer();
		this._containerElement.setAttribute('aria-labelledby', this.selectLabelId);
		this._containerElement.setAttribute('role', 'listbox');
		this._containerElement.id = `lu-select-overlay-container-${this.selectId}`;
	}
}

class SelectPanelRef<T> extends LuSelectPanelRef<T> {
	instance: LuSelectPanelComponent<T>;
	private panelRef: ComponentRef<LuSelectPanelComponent<T>>;
	private portalRef: ComponentPortal<LuSelectPanelComponent<T>>;

	constructor(private overlayRef: OverlayRef, parentInjector: Injector, panelData: ILuSelectPanelData<T>) {
		super();

		const injector = Injector.create({
			providers: [
				{ provide: LuSelectPanelRef, useValue: this },
				{ provide: SELECT_PANEL_DATA, useValue: panelData },
			],
			parent: parentInjector,
		});

		this.portalRef = new ComponentPortal<LuSelectPanelComponent<T>>(LuSelectPanelComponent, undefined, injector);
		this.panelRef = overlayRef.attach(this.portalRef);
		this.instance = this.panelRef.instance;

		overlayRef
			.backdropClick()
			.pipe(takeUntil(this.closed))
			.subscribe(() => this.close());
	}

	emitValue(value: T): void {
		this.valueChanged.emit(value);
		this.close();
	}

	override close(): void {
		super.close();
		this.panelRef.destroy();
		this.overlayRef.detach();
	}
}

@Component({
	selector: 'lu-simple-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, OverlayModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSimpleSelectInputComponent),
			multi: true,
		},
		{
			provide: OverlayContainer,
			useClass: LuSelectOverlayContainer,
		},
		{ provide: SELECT_ID, useFactory: selectIdFactory },
		{ provide: SELECT_LABEL, useFactory: selectLabelFactory, deps: [ElementRef] },
		{ provide: SELECT_LABEL_ID, useFactory: selectLabelIdFactory, deps: [SELECT_LABEL, SELECT_ID] },
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
	@Input() optionTpl?: TemplateRef<LuOptionContext<T>>;
	@Input() valueTpl?: TemplateRef<LuOptionContext<T>>;

	@Output() clueChange = new EventEmitter<string>();
	@Output() nextPage = new EventEmitter<void>();
	@Output() previousPage = new EventEmitter<void>();

	value?: T;
	options$ = new ReplaySubject<T[]>(1);
	loading$ = new ReplaySubject<boolean>(1);
	clue: string | null = null;

	protected onChange?: (value: T | null) => void;
	protected onTouched?: () => void;

	protected panelRef?: SelectPanelRef<T>;
	protected overlayContainerRef: HTMLElement;
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

	public constructor(
		protected positionBuilder: OverlayPositionBuilder,
		protected scrollStrategies: ScrollStrategyOptions,
		protected elementRef: ElementRef<HTMLElement>,
		protected injector: Injector,
		protected overlay: Overlay,
		protected changeDetectorRef: ChangeDetectorRef,
		overlayContainer: OverlayContainer,
		@Inject(SELECT_LABEL) protected label: HTMLElement | undefined,
		@Inject(SELECT_LABEL_ID) protected labelId: string,
	) {
		this.overlayContainerRef = overlayContainer.getContainerElement();
	}

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
		this.value = null;
	}

	openPanel(): void {
		if (this.isPanelOpen || this.disabled) {
			return;
		}

		const overlayConfig: OverlayConfig = this.overlayConfig || {};
		overlayConfig.positionStrategy = this.positionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
			{
				originX: 'start',
				originY: 'bottom',
				overlayX: 'start',
				overlayY: 'top',
			},
			{
				originX: 'end',
				originY: 'bottom',
				overlayX: 'end',
				overlayY: 'top',
			},
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'start',
				overlayY: 'bottom',
			},
			{
				originX: 'end',
				originY: 'top',
				overlayX: 'end',
				overlayY: 'bottom',
			},
		]);
		overlayConfig.scrollStrategy = this.scrollStrategies.reposition();
		overlayConfig.minWidth = this.elementRef.nativeElement.clientWidth;
		overlayConfig.maxHeight = '100vh';
		overlayConfig.maxWidth = '100vw';

		const overlayRef = this.overlay.create(overlayConfig);

		this.isPanelOpen = true;
		this.panelRef = new SelectPanelRef(overlayRef, this.injector, {
			initialValue: this.value,
			optionComparer: this.optionComparer,
			options$: this.options$,
			loading$: this.loading$,
			searchable: this.searchable,
			optionTpl: this.optionTpl,
		});

		this.panelRef.valueChanged.subscribe((value) => {
			this.onChange?.(value);
			this.value = value;
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
		this.value = value;
	}
}
