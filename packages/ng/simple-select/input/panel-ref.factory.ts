import { Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, inject, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { getPushPanelViewportMargin } from '@lucca-front/ng/core';
import { addAttributesOnCdkContainer, LuSelectPanelRef, SELECT_ID, SELECT_LABEL_ID, ɵopenSelectPanelSheet } from '@lucca-front/ng/core-select';
import { LuDialogRef, LuDialogService } from '@lucca-front/ng/dialog';
import { takeUntil } from 'rxjs';
import { LuSelectPanelComponent } from '../panel';
import { SIMPLE_SELECT_INPUT } from '../select.model';
import { LuSimpleSelectInputComponent } from './select-input.component';

abstract class BaseSelectPanelRef<T> extends LuSelectPanelRef<T, T> {
	/** Carries this ref and the select input down to the panel, however it ends up being rendered. */
	protected readonly panelInjector: Injector;

	instance: LuSelectPanelComponent<T>;

	protected panelRef: ComponentRef<LuSelectPanelComponent<T>>;

	protected constructor(
		parentInjector: Injector,
		protected selectInput: LuSimpleSelectInputComponent<T>,
	) {
		super();

		this.panelInjector = this.createInjector(selectInput, parentInjector);
	}

	protected createInjector(selectInput: LuSimpleSelectInputComponent<T>, parentInjector: Injector): Injector {
		return Injector.create({
			providers: [
				{ provide: LuSelectPanelRef, useValue: this },
				{ provide: SIMPLE_SELECT_INPUT, useValue: selectInput },
			],
			parent: parentInjector,
		});
	}

	override handleKeyManagerEvent(event: KeyboardEvent) {
		this.instance.keyManager.onKeydown(event);
	}

	emitValue(value: T): void {
		this.valueChanged.emit(value);
		this.close();
	}

	selectCurrentlyHighlightedValue(): void {
		this.instance.keyManager.activeItem?.selected.emit();
	}
}

class SelectPanelRef<T> extends BaseSelectPanelRef<T> {
	constructor(
		private overlayRef: OverlayRef,
		parentInjector: Injector,
		selectInput: LuSimpleSelectInputComponent<T>,
	) {
		super(parentInjector, selectInput);
		this.panelRef = overlayRef.attach(new ComponentPortal<LuSelectPanelComponent<T>>(LuSelectPanelComponent, undefined, this.panelInjector));
		this.instance = this.panelRef.instance;

		overlayRef
			.backdropClick()
			.pipe(takeUntil(this.closed))
			.subscribe(() => this.close());
	}

	override close(): void {
		super.close();
		this.panelRef.destroy();
		this.overlayRef.detach();
		this.selectInput.focusInput();
	}

	updatePosition(): void {
		this.overlayRef.updatePosition();
	}
}

class SelectPanelSheetRef<T> extends BaseSelectPanelRef<T> {
	private readonly dialogRef: LuDialogRef<LuSelectPanelComponent<T>, never>;

	// The sheet can be closed from either side (a selection here, the backdrop/Escape/close button there);
	// this keeps the two from bouncing the close back at each other.
	private dialogClosed = false;

	constructor(dialogService: LuDialogService, parentInjector: Injector, selectInput: LuSimpleSelectInputComponent<T>) {
		super(parentInjector, selectInput);

		const panelComponent: Type<LuSelectPanelComponent<T>> = LuSelectPanelComponent;

		this.dialogRef = ɵopenSelectPanelSheet(dialogService, panelComponent, this.panelInjector, selectInput.panelTitle());
		this.panelRef = this.dialogRef.cdkRef.componentRef!;
		this.instance = this.panelRef.instance;

		this.dialogRef.closed$.pipe(takeUntil(this.closed)).subscribe(() => {
			this.dialogClosed = true;
			this.close();
		});
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

class SelectPanelDOMHostRef<T> extends BaseSelectPanelRef<T> {
	constructor(host: ViewContainerRef, parentInjector: Injector, selectInput: LuSimpleSelectInputComponent<T>) {
		super(parentInjector, selectInput);

		const panelComponent: Type<LuSelectPanelComponent<T>> = LuSelectPanelComponent;

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
}

@Injectable()
export class LuSimpleSelectPanelRefFactory {
	protected overlay = inject(Overlay);
	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected positionBuilder = inject(OverlayPositionBuilder);
	protected scrollStrategies = inject(ScrollStrategyOptions);
	protected parentInjector = inject(Injector);
	protected dialogService = inject(LuDialogService);
	private selectLabelId = inject(SELECT_LABEL_ID);
	private selectId = inject(SELECT_ID);

	buildPanelRef<T>(selectInput: LuSimpleSelectInputComponent<T>, overlayConfigOverride: OverlayConfig = {}): LuSelectPanelRef<T, T> {
		if (selectInput.bottomSheetMode()) {
			return new SelectPanelSheetRef(this.dialogService, this.parentInjector, selectInput);
		}

		const overlayConfig = this.buildOverlayConfig(overlayConfigOverride);
		const overlayRef = this.overlay.create(overlayConfig);

		addAttributesOnCdkContainer(overlayRef, this.selectLabelId, this.selectId);

		return new SelectPanelRef(overlayRef, this.parentInjector, selectInput);
	}

	buildAndAttachPanelRef<T>(selectInput: LuSimpleSelectInputComponent<T>, host: ViewContainerRef): LuSelectPanelRef<T, T> {
		return new SelectPanelDOMHostRef(host, this.parentInjector, selectInput);
	}

	protected buildOverlayConfig(overlayConfigOverride: OverlayConfig = {}): OverlayConfig {
		const overlayConfig: OverlayConfig = overlayConfigOverride || {};
		overlayConfig.positionStrategy = this.positionBuilder
			.flexibleConnectedTo(this.elementRef)
			// Options usually arrive after the panel has been opened: without this, every reposition is
			// capped to the bounding box computed while the panel was still empty, so a panel opened in a
			// tight space below the field can never grow nor flip above once its options are there.
			.withGrowAfterOpen(true)
			.withViewportMargin(getPushPanelViewportMargin(this.elementRef.nativeElement, 8))
			.withPositions([
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

		return overlayConfig;
	}
}
