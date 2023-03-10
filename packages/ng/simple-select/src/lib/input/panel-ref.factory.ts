import { Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, inject, Injectable, Injector } from '@angular/core';
import { LuSelectPanelRef } from '@lucca-front/ng/core-select';
import { takeUntil } from 'rxjs';
import { LuSelectPanelComponent } from '../panel';
import { ILuSelectPanelData, SELECT_PANEL_DATA } from '../select.model';

class SelectPanelRef<T> extends LuSelectPanelRef<T, T> {
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

@Injectable()
export class LuSimpleSelectPanelRefFactory {
	protected overlay = inject(Overlay);
	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected positionBuilder = inject(OverlayPositionBuilder);
	protected scrollStrategies = inject(ScrollStrategyOptions);
	protected parentInjector = inject(Injector);

	buildPanelRef<T>(panelData: ILuSelectPanelData<T>, overlayConfigOverride: OverlayConfig = {}): LuSelectPanelRef<T, T> {
		const overlayConfig = this.buildOverlayConfig(overlayConfigOverride);
		const overlayRef = this.overlay.create(overlayConfig);

		return new SelectPanelRef(overlayRef, this.parentInjector, panelData);
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
