import { InjectionToken, TemplateRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export interface PopoverConfig {
	triggerElement: HTMLElement;
	content: TemplateRef<unknown>;
	ref: OverlayRef;
	contentId: string;
	disableFocusManipulation: boolean;
}

export const POPOVER_CONFIG = new InjectionToken<PopoverConfig>('Popover:Config');
