import { ILuModalConfig } from './modal-config.model';

export const luDefaultModalConfig: ILuModalConfig = {
	position: 'center',
	noBackdrop: false,
	backdropClass: ['cdk-overlay-dark-backdrop', 'lu-popup-backdrop'],
	panelClass: 'lu-popup-panel',
};
