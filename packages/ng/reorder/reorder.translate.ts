import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_REORDER_TRANSLATIONS = new InjectionToken('LuReorderTranslations', {
	factory: () => luReorderTranslations,
});

export interface LuReorderTranslations {
	move: string;
	moveItem: string;
	moveUp: string;
	moveDown: string;
	moveFirst: string;
	moveLast: string;
	moveLeft: string;
	moveRight: string;
	moveStart: string;
	moveEnd: string;
	moveToList: string;
	listFallback: string;
	itemFallback: string;
	announceMove: string;
	announceMoveTo: string;
}

export const luReorderTranslations: LuTranslation<LuReorderTranslations> = Translations;
