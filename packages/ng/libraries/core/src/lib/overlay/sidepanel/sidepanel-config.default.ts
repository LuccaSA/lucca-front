import { ILuSidepanelConfig } from './sidepanel-config.model';

export const luDefaultSidepanelConfig: ILuSidepanelConfig = {
	position: 'right',
	noBackdrop: false,
	backdropClass: ['cdk-overlay-dark-backdrop', 'lu-popup-backdrop'],
	panelClass: ['lu-popup-panel', 'lu-sidepanel-panel'],
};
