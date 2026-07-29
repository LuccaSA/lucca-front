import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { CoreSelectPanelElement } from './selectable-item';

export interface CoreSelectPanelInstance<T = unknown> {
	options: WritableSignal<CoreSelectPanelElement<T>[]>;
	pointerNavigation: Signal<boolean>;
}

export const SELECT_PANEL_INSTANCE = new InjectionToken<CoreSelectPanelInstance>('CoreSelect:PanelInstance');
