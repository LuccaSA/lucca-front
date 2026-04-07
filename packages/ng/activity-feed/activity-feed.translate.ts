import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_ACTIVITY_FEED_TRANSLATIONS = new InjectionToken('luActivityFeedTranslations', {
	factory: () => luActivityFeedTranslations,
});

export interface ActivityFeedTranslate {
	replaceByAlt: string;
	at: string;
}

export const luActivityFeedTranslations: LuTranslation<ActivityFeedTranslate> = Translations;
