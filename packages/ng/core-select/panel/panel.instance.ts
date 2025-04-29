import { CoreSelectPanelElement } from './selectable-item';
import { InjectionToken, WritableSignal } from '@angular/core';

export interface CoreSelectPanelInstance<T = unknown> {
	options: WritableSignal<CoreSelectPanelElement<T>[]>;
}

export const SELECT_PANEL_INSTANCE = new InjectionToken<CoreSelectPanelInstance>('CoreSelect:PanelInstance');
