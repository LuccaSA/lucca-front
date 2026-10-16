import { InjectionToken } from '@angular/core';
import { BubbleIconDirection } from './bubble-icon.type';

export const LU_BUBBLE_ICON_DEFAULT_DIRECTION = new InjectionToken<BubbleIconDirection>('LU_BUBBLE_ICON_DEFAULT_DIRECTION', {
	factory: () => 'random',
});
