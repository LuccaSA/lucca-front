import { ConnectedPosition, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, PositionStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, Injectable, Injector, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { LuMultiSelectPanelComponent } from '../panel/index';
import { ILuMultiSelectPanelData, MULTI_SELECT_PANEL_DATA } from '../select.model';
import { LuMultiSelectPanelRef } from './panel.model';

class MultiSelectPanelRef<T> extends LuMultiSelectPanelRef<T> {
	instance: LuMultiSelectPanelComponent<T>;
	private panelRef: ComponentRef<LuMultiSelectPanelComponent<T>>;
	private portalRef: ComponentPortal<LuMultiSelectPanelComponent<T>>;

	constructor(private overlayRef: OverlayRef, parentInjector: Injector, panelData: ILuMultiSelectPanelData<T>, protected defaultPositionStrategy: PositionStrategy) {
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

	handleKeyManagerEvent(event: KeyboardEvent) {
		this.instance.keyManager.onKeydown(event);
	}

	selectCurrentlyHighlightedValue(): void {
		this.instance.toggleOption(this.instance.keyManager?.activeItem?.option);
	}
}

@Injectable()
export class LuMultiSelectPanelRefFactory {
	protected overlay = inject(Overlay);
	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected positionBuilder = inject(OverlayPositionBuilder);
	protected scrollStrategies = inject(ScrollStrategyOptions);
	protected parentInjector = inject(Injector);

	buildPanelRef<T>(panelData: ILuMultiSelectPanelData<T>, defaultOverlayConfigOverride: OverlayConfig = {}): LuMultiSelectPanelRef<T> {
		const defaultOverlayConfig = this.buildDefaultOverlayConfig(defaultOverlayConfigOverride);

		const overlayRef = this.overlay.create(defaultOverlayConfig);

		overlayRef.hostElement.style.transitionProperty = 'height';
		overlayRef.hostElement.style.transitionDuration = 'var(--commons-animations-durations-standard)';

		return new MultiSelectPanelRef(overlayRef, this.parentInjector, panelData, defaultOverlayConfig.positionStrategy);
	}

	protected buildDefaultOverlayConfig(overlayConfigOverride: OverlayConfig = {}): OverlayConfig {
		const overlayConfig: OverlayConfig = { ...overlayConfigOverride };

		const config = { overlapInput: false, offsetY: 2 };
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
