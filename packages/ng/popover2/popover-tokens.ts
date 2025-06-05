import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export interface PopoverConfig {
	triggerElement: HTMLElement;
	content: TemplateRef<unknown> | Type<unknown>;
	ref: OverlayRef;
	contentId: string;
	disableFocusManipulation: boolean;
	noCloseButton: boolean;
}

export const POPOVER_CONFIG = new InjectionToken<PopoverConfig>('Popover:Config');
