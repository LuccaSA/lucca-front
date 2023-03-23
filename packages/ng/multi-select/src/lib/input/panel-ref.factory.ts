import { Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, inject, Injectable, Injector } from '@angular/core';
import { takeUntil } from 'rxjs';
import { LuMultiSelectPanelComponent } from '../panel';
import { ILuMultiSelectPanelData, MULTI_SELECT_PANEL_DATA } from '../select.model';
import { LuMultiSelectPanelRef } from './panel.model';

class MultiSelectPanelRef<T> extends LuMultiSelectPanelRef<T> {
	instance: LuMultiSelectPanelComponent<T>;
	private panelRef: ComponentRef<LuMultiSelectPanelComponent<T>>;
	private portalRef: ComponentPortal<LuMultiSelectPanelComponent<T>>;

	constructor(private overlayRef: OverlayRef, parentInjector: Injector, panelData: ILuMultiSelectPanelData<T>) {
		super();

		const injector = Injector.create({
			providers: [
				{ provide: LuMultiSelectPanelRef, useValue: this },
				{ provide: MULTI_SELECT_PANEL_DATA, useValue: panelData },
			],
			parent: parentInjector,
		});

		this.portalRef = new ComponentPortal<LuMultiSelectPanelComponent<T>>(LuMultiSelectPanelComponent, undefined, injector);
		this.panelRef = overlayRef.attach(this.portalRef);
		this.instance = this.panelRef.instance;

		overlayRef
			.backdropClick()
			.pipe(takeUntil(this.closed))
			.subscribe(() => this.close());
	}

	emitValue(value: T[]): void {
		this.valueChanged.emit(value);
	}

	updateSelectedOptions(selectedOptions: T[]): void {
		this.instance.selectedOptions = selectedOptions;
		// Run change detection on the panel component
		this.panelRef.injector.get(ChangeDetectorRef).markForCheck();
	}

	override close(): void {
		super.close();
		this.panelRef.destroy();
		this.overlayRef.detach();
	}
}

@Injectable()
export class LuMultiSelectPanelRefFactory {
	protected overlay = inject(Overlay);
	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected positionBuilder = inject(OverlayPositionBuilder);
	protected scrollStrategies = inject(ScrollStrategyOptions);
	protected parentInjector = inject(Injector);

	buildPanelRef<T>(panelData: ILuMultiSelectPanelData<T>, overlayConfigOverride: OverlayConfig = {}): LuMultiSelectPanelRef<T> {
		const overlayConfig = this.buildOverlayConfig(overlayConfigOverride);
		const overlayRef = this.overlay.create(overlayConfig);
		return new MultiSelectPanelRef(overlayRef, this.parentInjector, panelData);
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
