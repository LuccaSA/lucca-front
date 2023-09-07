import { ConnectedPosition, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, PositionStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
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

	constructor(
		private overlayRef: OverlayRef,
		parentInjector: Injector,
		panelData: ILuMultiSelectPanelData<T>,
		protected defaultPositionStrategy: PositionStrategy,
		protected expandedPositionStrategy: PositionStrategy,
	) {
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

	useExpandedPosition(): void {
		this.overlayRef.updatePositionStrategy(this.expandedPositionStrategy);
	}

	useDefaultPosition(): void {
		this.overlayRef.updatePositionStrategy(this.defaultPositionStrategy);
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

	buildPanelRef<T>(panelData: ILuMultiSelectPanelData<T>, defaultOverlayConfigOverride: OverlayConfig = {}, expandedPositionStrategy?: PositionStrategy): LuMultiSelectPanelRef<T> {
		const defaultOverlayConfig = this.buildDefaultOverlayConfig(defaultOverlayConfigOverride);
		expandedPositionStrategy ??= this.buildExpandedPositionStrategy();

		const overlayRef = this.overlay.create(defaultOverlayConfig);

		overlayRef.hostElement.style.transitionProperty = 'height';
		overlayRef.hostElement.style.transitionDuration = 'var(--commons-animations-durations-standard)';

		return new MultiSelectPanelRef(overlayRef, this.parentInjector, panelData, defaultOverlayConfig.positionStrategy, expandedPositionStrategy);
	}

	protected buildDefaultOverlayConfig(overlayConfigOverride: OverlayConfig = {}): OverlayConfig {
		const overlayConfig: OverlayConfig = { ...overlayConfigOverride };

		const config = { overlapInput: false, offsetY: 8 };
		overlayConfig.positionStrategy = this.positionBuilder
			.flexibleConnectedTo(this.elementRef)
			.withViewportMargin(10)
			.withPositions([
				this.buildPosition('bottom', 'right', config),
				this.buildPosition('bottom', 'left', config),
				this.buildPosition('top', 'right', config),
				this.buildPosition('top', 'left', config),
			]);
		overlayConfig.scrollStrategy = this.scrollStrategies.reposition();
		overlayConfig.minWidth = this.elementRef.nativeElement.clientWidth;

		overlayConfig.width = 'min(40rem, 80vw)';
		overlayConfig.maxWidth = '100vw';

		return overlayConfig;
	}

	buildExpandedPositionStrategy(): PositionStrategy {
		const config = { overlapInput: true, offsetX: -4, offsetY: -4 };
		return this.positionBuilder
			.flexibleConnectedTo(this.elementRef)
			.withViewportMargin(10)
			.withPositions([
				this.buildPosition('top', 'right', config),
				this.buildPosition('top', 'left', config),
				this.buildPosition('bottom', 'right', config),
				this.buildPosition('bottom', 'left', config),
			]);
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
