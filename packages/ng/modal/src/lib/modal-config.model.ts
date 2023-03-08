import { ChangeDetectionStrategy } from '@angular/core';
import { ILuPopupConfig } from '@lucca-front/ng/popup';

export type LuModalMode = 'modal' | 'sidepanel';

export interface LuModalClasses {
	panel: string;
	panelContainer: string;
	panelInner: string;
	overlayPane?: string;
}

export const luModalClasses: Record<LuModalMode, LuModalClasses> = {
	modal: { panel: 'lu-modal-panel', panelInner: 'lu-modal-panel-inner', panelContainer: 'lu-modal-container' },
	sidepanel: { panel: 'lu-sidepanel-panel', panelInner: 'lu-sidepanel-panel-inner', overlayPane: 'mod-sidepanel', panelContainer: 'lu-sidepanel-container' },
};

type LuModalModeWithPosition = { mode: 'modal'; position: undefined | 'center' } | { mode: 'sidepanel'; position: 'left' | 'right' };

export type LuModalConfig = ILuPopupConfig &
	LuModalModeWithPosition & {
		changeDetection: ChangeDetectionStrategy;
	};
