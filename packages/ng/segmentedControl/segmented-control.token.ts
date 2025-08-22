import { InjectionToken } from '@angular/core';
import { SegmentedControlPanelComponent } from './panel/panel.component';
import { SegmentedControlComponent } from './segmented-control.component';

export const LU_SEGMENTEDCONTROL_INSTANCE = new InjectionToken<SegmentedControlComponent>('LU_SEGMENTEDCONTROL_INSTANCE');
export const LU_SEGMENTEDCONTROLPANEL_INSTANCE = new InjectionToken<SegmentedControlPanelComponent>('LU_SEGMENTEDCONTROLPANEL_INSTANCE');
