import { ChangeDetectionStrategy } from '@angular/core';
import { LuModalConfig } from './modal-config.model';

export const luDefaultModalConfig: LuModalConfig = {
	mode: 'modal',
	position: 'center',
	noBackdrop: false,
	undismissable: false,
	backdropClass: ['cdk-overlay-dark-backdrop', 'lu-popup-backdrop'],
	panelClass: 'lu-popup-panel',
	size: 'standard',
	changeDetection: ChangeDetectionStrategy.OnPush,
};

export const luDefaultSidepanelConfig: LuModalConfig = {
	...luDefaultModalConfig,
	mode: 'sidepanel',
	position: 'right',
};
