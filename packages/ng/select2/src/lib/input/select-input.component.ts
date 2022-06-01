/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Injector, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { LuSelectPanelComponent, LuSelectPanelRef } from '../panel/index';

class SelectPanelRef<T> extends LuSelectPanelRef<T> {
	instance: LuSelectPanelComponent<T>;
	private panelRef: ComponentRef<LuSelectPanelComponent<T>>;
	private overlayRef: OverlayRef;
	private subscription: Subscription;

	constructor(overlayConfig: OverlayConfig, overlay: Overlay, parentInjector: Injector) {
		super();

		this.overlayRef = overlay.create(overlayConfig);

		const injector = Injector.create({
			providers: [{ provide: LuSelectPanelRef, useValue: this }],
			parent: parentInjector,
		});

		const portal = new ComponentPortal<LuSelectPanelComponent<T>>(LuSelectPanelComponent, undefined, injector);
		this.panelRef = this.overlayRef.attach(portal);
		this.instance = this.panelRef.instance;

		this.subscription = this.overlayRef.backdropClick().subscribe(() => this.close());
	}

	emitValue(value: T): void {
		this.valueChanged.emit(value);
		this.close();
	}

	close(): void {
		this.panelRef.destroy();
		this.overlayRef.detach();
		this.subscription.unsubscribe();
		this.closed.emit();
	}
}

@Component({
	selector: 'lu-select2',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelectInput2Component),
			multi: true,
		},
	],
})
export class LuSelectInput2Component<T> implements ControlValueAccessor, OnDestroy {
	@HostBinding('tabindex') tabindex = 0;

	@Input() placeholder = '';

	@Input()
	@HostBinding('class.mod-multiple')
	multiple = false;

	@Input()
	@HostBinding('class.is-clearable')
	clearable = false;

	@Input()
	searchable = false;

	@Input()
	@HostBinding('class.is-disabled')
	disabled = false;

	@HostBinding('class.is-filled')
	get isFilled(): boolean {
		return this.value !== null && this.value !== undefined;
	}

	@HostBinding('class.is-focused')
	public isPanelOpen = false;

	@Input()
	overlayConfig?: OverlayConfig = {
		hasBackdrop: true,
		backdropClass: 'cdk-overlay-transparent-backdrop',
	};

	@Input() set options(options: T[]) {
		this.options$.next(options);
	}

	@Input() optionComparer: (option1: T, option2: T) => boolean = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);
	@Input() optionTpl?: TemplateRef<{ $implicit: T }>;
	@Input() valueTpl?: TemplateRef<{ $implicit: T }>;

	@Output() clueChange = new EventEmitter<string>();

	value?: T;
	options$ = new ReplaySubject<T[]>(1);

	protected onChange?: (value: T | null) => void;
	protected onTouched?: () => void;

	protected panelRef?: SelectPanelRef<T>;
	protected destroyed$ = new Subject<void>();

	@HostListener('keydown.space', ['$event'])
	@HostListener('keydown.enter', ['$event'])
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
	) {}

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

	clearValue(event: MouseEvent): void {
		event.stopPropagation();
		this.onChange?.(null);
		this.value = null;
	}

	openPanel(): void {
		if (this.isPanelOpen || this.disabled) {
			return;
		}

		this.isPanelOpen = true;
		const overlayConfig: OverlayConfig = this.overlayConfig || {};
		overlayConfig.positionStrategy = this.positionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
			{
				originX: 'center',
				originY: 'bottom',
				overlayX: 'center',
				overlayY: 'top',
			},
		]);
		overlayConfig.scrollStrategy = this.scrollStrategies.reposition();
		overlayConfig.width = this.elementRef.nativeElement.clientWidth;

		this.panelRef = new SelectPanelRef(overlayConfig, this.overlay, this.injector);
		this.panelRef.instance.options$ = this.options$;
		this.panelRef.instance.selected = this.options?.find((o) => this.optionComparer(o, this.value));
		this.panelRef.instance.optionTpl = this.optionTpl;

		this.panelRef.instance.searchable = this.searchable;
		this.panelRef.valueChanged.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
			this.onChange?.(value);
			this.value = value;
		});
		this.panelRef.clueChanged.pipe(takeUntil(this.destroyed$)).subscribe(this.clueChange);
		this.panelRef.closed.pipe(takeUntil(this.destroyed$)).subscribe(() => this.closePanel());
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
