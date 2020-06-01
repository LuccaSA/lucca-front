import { ILuModalConfig } from './modal-config.model';
import { ChangeDetectionStrategy } from '@angular/core';

export const luDefaultModalConfig: ILuModalConfig = {
	position: 'center',
	noBackdrop: false,
	undismissable: false,
	backdropClass: ['cdk-overlay-dark-backdrop', 'lu-popup-backdrop'],
	panelClass: 'lu-popup-panel',
	size: 'standard',
	changeDetection: ChangeDetectionStrategy.OnPush,
};
