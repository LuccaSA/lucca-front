import { LuSidepanelConfig } from './sidepanel-config.model';
import { ChangeDetectionStrategy } from '@angular/core';

export const luDefaultSidepanelConfig: LuSidepanelConfig = {
	position: 'right',
	mode: 'sidepanel',
	noBackdrop: false,
	undismissable: false,
	backdropClass: ['cdk-overlay-dark-backdrop', 'lu-popup-backdrop'],
	panelClass: ['lu-popup-panel', 'mod-sidepanel'],
	size: 'standard',
	changeDetection: ChangeDetectionStrategy.OnPush,
};
