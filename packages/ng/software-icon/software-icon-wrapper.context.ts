import { InjectionToken, Signal } from '@angular/core';

export interface SoftwareIconWrapperContext {
	size: Signal<'XXS' | 'XS' | 'S' | 'L' | ''>;
}

export const SOFTWARE_ICON_WRAPPER = new InjectionToken<SoftwareIconWrapperContext | null | undefined>('SOFTWARE_ICON_WRAPPER');
