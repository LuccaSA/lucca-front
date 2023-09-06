import { ILuPopupConfig } from './popup-config.model';

export const luDefaultPopupConfig: ILuPopupConfig = {
	position: 'center',
	noBackdrop: false,
	undismissable: false,
	backdropClass: ['cdk-overlay-dark-backdrop', 'lu-popup-backdrop'],
	panelClass: 'lu-popup-panel',
	size: 'M',
};
