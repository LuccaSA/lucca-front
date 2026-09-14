import { ConnectedPosition, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, PositionStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, inject, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { getPushPanelViewportMargin } from '@lucca-front/ng/core';
import { addAttributesOnCdkContainer, SELECT_ID, SELECT_LABEL_ID, ɵopenSelectPanelSheet } from '@lucca-front/ng/core-select';
import { LuDialogRef, LuDialogService } from '@lucca-front/ng/dialog';
import { takeUntil } from 'rxjs';
import { LuMultiSelectPanelComponent } from '../panel';
import { MULTI_SELECT_INPUT } from '../select.model';
import { LuMultiSelectPanelRef } from './panel.model';
import { LuMultiSelectInputComponent } from './select-input.component';

abstract class BaseMultiSelectPanelRef<T> extends LuMultiSelectPanelRef<T> {
	/** Carries this ref and the select input down to the panel, however it ends up being rendered. */
	protected readonly panelInjector: Injector;

	instance: LuMultiSelectPanelComponent<T>;

	protected panelRef: ComponentRef<LuMultiSelectPanelComponent<T>>;

	protected constructor(parentInjector: Injector, selectInput: LuMultiSelectInputComponent<T>) {
		super();

		this.panelInjector = Injector.create({
			providers: [
				{ provide: LuMultiSelectPanelRef, useValue: this },
				{ provide: MULTI_SELECT_INPUT, useValue: selectInput },
			],
			parent: parentInjector,
		});
	}

	override handleKeyManagerEvent(event: KeyboardEvent) {
		this.instance.keyManager.onKeydown(event);
	}

	emitValue(value: T[]): void {
		this.valueChanged.emit(value);
	}

	selectCurrentlyHighlightedValue(): void {
		this.instance.keyManager.activeItem?.selected.emit();
	}

	updateSelectedOptions(selectedOptions: T[]): void {
		this.instance.selectedOptions = selectedOptions;
		// Run change detection on the panel component
		this.panelRef.injector.get(ChangeDetectorRef).markForCheck();
	}
}

class MultiSelectPanelRef<T> extends BaseMultiSelectPanelRef<T> {
	changeDetectorRef: ChangeDetectorRef;

	constructor(
		private overlayRef: OverlayRef,
		parentInjector: Injector,
		selectInput: LuMultiSelectInputComponent<T>,
		protected defaultPositionStrategy: PositionStrategy,
	) {
		super(parentInjector, selectInput);
		this.panelRef = overlayRef.attach(new ComponentPortal<LuMultiSelectPanelComponent<T>>(LuMultiSelectPanelComponent, undefined, this.panelInjector));
		this.instance = this.panelRef.instance;
		this.changeDetectorRef = this.panelRef.changeDetectorRef;

		overlayRef
			.backdropClick()
			.pipe(takeUntil(this.closed))
			.subscribe(() => this.close());
	}

	useDefaultPosition(): void {
		this.overlayRef.updatePositionStrategy(this.defaultPositionStrategy);
	}

	updatePosition(): void {
		this.overlayRef.updatePosition();
	}

	override close(): void {
		super.close();
		this.panelRef.destroy();
		this.overlayRef.detach();
	}
}

class MultiSelectPanelSheetRef<T> extends BaseMultiSelectPanelRef<T> {
	changeDetectorRef: ChangeDetectorRef;

	private readonly dialogRef: LuDialogRef<LuMultiSelectPanelComponent<T>, never>;

	// The sheet can be closed from either side (a selection here, the backdrop, Escape or the header's
	// close button there); this keeps the two from bouncing the close back at each other.
	private dialogClosed = false;

	constructor(dialogService: LuDialogService, parentInjector: Injector, selectInput: LuMultiSelectInputComponent<T>) {
		super(parentInjector, selectInput);

		const panelComponent: Type<LuMultiSelectPanelComponent<T>> = LuMultiSelectPanelComponent;

		this.dialogRef = ɵopenSelectPanelSheet(dialogService, panelComponent, this.panelInjector, selectInput.panelTitle());
		this.panelRef = this.dialogRef.cdkRef.componentRef!;
		this.instance = this.panelRef.instance;
		this.changeDetectorRef = this.panelRef.changeDetectorRef;

		this.dialogRef.closed$.pipe(takeUntil(this.closed)).subscribe(() => {
			this.dialogClosed = true;
			this.close();
		});
	}

	useDefaultPosition(): void {
		// The sheet is pinned to the viewport, it has no anchored position to fall back to.
	}

	updatePosition(): void {
		// The sheet is pinned to the viewport, it never follows the field.
	}

	override close(): void {
		super.close();

		if (!this.dialogClosed) {
			this.dialogClosed = true;
			this.dialogRef.dismiss();
		}
		// Focus goes back to the field through the dialog's own `restoreFocus`.
	}
}

class MultiSelectPanelDOMHostRef<T> extends BaseMultiSelectPanelRef<T> {
	override changeDetectorRef?: ChangeDetectorRef;

	constructor(host: ViewContainerRef, parentInjector: Injector, selectInput: LuMultiSelectInputComponent<T>) {
		super(parentInjector, selectInput);

		const panelComponent: Type<LuMultiSelectPanelComponent<T>> = LuMultiSelectPanelComponent;

		this.panelRef = host.createComponent(panelComponent, {
			injector: this.panelInjector,
		});
		this.instance = this.panelRef.instance;
	}

	override updatePosition() {
		// do nothing, this is not a panel so repositioning is handled by the input.
	}

	override close(): void {
		this.closed.emit();
	}

	useDefaultPosition(): void {
		// do nothing, this is not a panel so repositioning is handled by the input.
	}
}

@Injectable()
export class LuMultiSelectPanelRefFactory {
	protected overlay = inject(Overlay);
	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected positionBuilder = inject(OverlayPositionBuilder);
	protected scrollStrategies = inject(ScrollStrategyOptions);
	protected parentInjector = inject(Injector);
	protected dialogService = inject(LuDialogService);
	private selectLabelId = inject(SELECT_LABEL_ID);
	private selectId = inject(SELECT_ID);

	buildPanelRef<T>(selectInput: LuMultiSelectInputComponent<T>, defaultOverlayConfigOverride: OverlayConfig = {}): LuMultiSelectPanelRef<T> {
		if (selectInput.bottomSheetMode()) {
			return new MultiSelectPanelSheetRef(this.dialogService, this.parentInjector, selectInput);
		}

		const defaultOverlayConfig = this.buildDefaultOverlayConfig(defaultOverlayConfigOverride);

		const overlayRef = this.overlay.create(defaultOverlayConfig);

		// The connected panel animates its height as options stream in.
		overlayRef.hostElement.style.transitionProperty = 'height';
		overlayRef.hostElement.style.transitionDuration = 'var(--commons-animations-durations-standard)';

		addAttributesOnCdkContainer(overlayRef, this.selectLabelId, this.selectId);

		return new MultiSelectPanelRef(overlayRef, this.parentInjector, selectInput, defaultOverlayConfig.positionStrategy!);
	}

	buildAndAttachPanelRef<T>(selectInput: LuMultiSelectInputComponent<T>, host: ViewContainerRef): LuMultiSelectPanelRef<T> {
		return new MultiSelectPanelDOMHostRef(host, this.parentInjector, selectInput);
	}

	protected buildDefaultOverlayConfig(overlayConfigOverride: OverlayConfig = {}): OverlayConfig {
		const overlayConfig: OverlayConfig = { ...overlayConfigOverride };

		const config = { overlapInput: false, offsetY: 2 };
		overlayConfig.positionStrategy = this.positionBuilder
			.flexibleConnectedTo(this.elementRef)
			.withGrowAfterOpen(true)
			.withLockedPosition(false)
			.withViewportMargin(getPushPanelViewportMargin(this.elementRef.nativeElement, 8))
			.withPositions([
				this.buildPosition('bottom', 'right', config),
				this.buildPosition('bottom', 'left', config),
				this.buildPosition('top', 'right', config),
				this.buildPosition('top', 'left', config),
			]);
		overlayConfig.scrollStrategy = this.scrollStrategies.reposition();
		overlayConfig.minWidth = this.elementRef.nativeElement.clientWidth;
		overlayConfig.maxWidth = '100vw';

		return overlayConfig;
	}

	protected buildPosition(
		yDirection: 'top' | 'bottom',
		xDirection: 'left' | 'right',
		config: {
			offsetX?: number;
			offsetY?: number;
			overlapInput: boolean;
		},
	): ConnectedPosition {
		const originX = xDirection === 'right' ? 'start' : 'end';
		const overlayX = originX;

		const oppositeYDirection = yDirection === 'top' ? 'bottom' : 'top';
		const { originY, overlayY } = config.overlapInput
			? ({
					originY: oppositeYDirection,
					overlayY: oppositeYDirection,
				} as const)
			: ({ originY: yDirection, overlayY: oppositeYDirection } as const);

		return {
			originX,
			originY,
			overlayX,
			overlayY,
			...(config.offsetX ? { offsetX: xDirection === 'right' ? config.offsetX : -config.offsetX } : {}),
			...(config.offsetY ? { offsetY: yDirection === 'bottom' ? config.offsetY : -config.offsetY } : {}),
		};
	}
}
