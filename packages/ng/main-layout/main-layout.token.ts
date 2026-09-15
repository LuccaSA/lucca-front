import { InjectionToken, Signal } from '@angular/core';

export interface MainLayoutIllustrations {
	readonly bubblesIllustrationStartEnd: Signal<number | null>;
	readonly bubblesIllustrationEndStart: Signal<number | null>;
	readonly illustrationStartEndUrl: Signal<string | null>;
	readonly illustrationEndStartUrl: Signal<string | null>;
}

export const LU_MAIN_LAYOUT_INSTANCE = new InjectionToken<MainLayoutIllustrations>('LU_MAIN_LAYOUT_INSTANCE');
