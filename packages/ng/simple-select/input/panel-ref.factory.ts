import { Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable, Injector, inject } from '@angular/core';
import { addAttributesOnCdkContainer, LuSelectPanelRef, SELECT_ID, SELECT_LABEL_ID } from '@lucca-front/ng/core-select';
import { takeUntil } from 'rxjs';
import { LuSelectPanelComponent } from '../panel';
import { SIMPLE_SELECT_INPUT } from '../select.model';
import { LuSimpleSelectInputComponent } from './select-input.component';

class SelectPanelRef<T> extends LuSelectPanelRef<T, T> {
	instance: LuSelectPanelComponent<T>;
	private panelRef: ComponentRef<LuSelectPanelComponent<T>>;
	private portalRef: ComponentPortal<LuSelectPanelComponent<T>>;

	constructor(
		private overlayRef: OverlayRef,
		parentInjector: Injector,
		selectInput: LuSimpleSelectInputComponent<T>,
	) {
		super();

		const injector = Injector.create({
			providers: [
				{ provide: LuSelectPanelRef, useValue: this },
				{ provide: SIMPLE_SELECT_INPUT, useValue: selectInput },
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

	override handleKeyManagerEvent(event: KeyboardEvent) {
		this.instance.keyManager.onKeydown(event);
	}

	override close(): void {
		super.close();
		this.panelRef.destroy();
		this.overlayRef.detach();
	}

	selectCurrentlyHighlightedValue(): void {
		if (this.instance.keyManager.activeItem) {
			this.emitValue(this.instance.keyManager.activeItem.option);
		}
		this.close();
	}

	updatePosition(): void {
		this.overlayRef.updatePosition();
	}
}

@Injectable()
export class LuSimpleSelectPanelRefFactory {
	protected overlay = inject(Overlay);
	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected positionBuilder = inject(OverlayPositionBuilder);
	protected scrollStrategies = inject(ScrollStrategyOptions);
	protected parentInjector = inject(Injector);
	private selectLabelId = inject(SELECT_LABEL_ID);
	private selectId = inject(SELECT_ID);

	buildPanelRef<T>(selectInput: LuSimpleSelectInputComponent<T>, overlayConfigOverride: OverlayConfig = {}): LuSelectPanelRef<T, T> {
		const overlayConfig = this.buildOverlayConfig(overlayConfigOverride);
		const overlayRef = this.overlay.create(overlayConfig);

		addAttributesOnCdkContainer(overlayRef, this.selectLabelId, this.selectId);

		return new SelectPanelRef(overlayRef, this.parentInjector, selectInput);
	}

	protected buildOverlayConfig(overlayConfigOverride: OverlayConfig = {}): OverlayConfig {
		const overlayConfig: OverlayConfig = overlayConfigOverride || {};
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

		return overlayConfig;
	}
}
