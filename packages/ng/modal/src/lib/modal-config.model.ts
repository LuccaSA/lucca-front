import { ChangeDetectionStrategy } from '@angular/core';
import { ILuPopupConfig } from '@lucca-front/ng/popup';

export type LuModalMode = 'modal' | 'sidepanel';

export interface LuModalClasses {
	panel: string;
	panelInner: string;
	overlayPane?: string;
}

export const luModalClasses: Record<LuModalMode, LuModalClasses> = {
	modal: { panel: 'lu-modal-panel', panelInner: 'lu-modal-panel-inner' },
	sidepanel: { panel: 'lu-sidepanel-panel', panelInner: 'lu-sidepanel-panel-inner', overlayPane: 'mod-sidepanel' },
};

type LuModalModeWithPosition = { mode: 'modal'; position: undefined | 'center' } | { mode: 'sidepanel'; position: 'left' | 'right' };

export type LuModalConfig = ILuPopupConfig &
	LuModalModeWithPosition & {
		changeDetection: ChangeDetectionStrategy;
	};
