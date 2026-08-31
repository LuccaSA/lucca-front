import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

/**
 * Popup roles of the panel, mirrored into `aria-haspopup` on the trigger.
 * Restricted to the roles `aria-haspopup` accepts.
 */
export const POPOVER_ROLES = ['dialog', 'menu', 'listbox', 'tree', 'grid'] as const;

export type PopoverRole = (typeof POPOVER_ROLES)[number];

export interface PopoverConfig {
	triggerElement: HTMLElement;
	content: TemplateRef<unknown> | Type<unknown>;
	ref: OverlayRef;
	contentId: string;
	role: PopoverRole | null;
	maxBlockSize: string | null;
	maxInlineSize: string | null;
	disableCloseButtonFocus: boolean;
	disableInitialTriggerFocus: boolean;
	noCloseButton: boolean;
}

export const POPOVER_CONFIG = new InjectionToken<PopoverConfig>('Popover:Config');
