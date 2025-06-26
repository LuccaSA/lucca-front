import { InjectionToken, isSignal, type Provider, type Signal } from '@angular/core';

import type { Tag } from './tag.model';

export const TAGS = new InjectionToken<Signal<Tag[]>>('TAGS');

export function provideLuRichTextTags(tags: Signal<Tag[]> | (() => Signal<Tag[]>)): Provider {
	return {
		provide: TAGS,
		useFactory: () => (isSignal(tags) ? tags : tags()),
	};
}
