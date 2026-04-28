import { InjectionToken } from '@angular/core';
import { SkeletonContainerDirective } from './skeleton-display.directive';

export const SKELETON_DISPLAY_INSTANCE = new InjectionToken<SkeletonContainerDirective>('SKELETON_DISPLAY_INSTANCE');
