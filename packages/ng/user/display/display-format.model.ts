import { InjectionToken } from '@angular/core';
import { EnumValue } from '@lucca-front/ng/core';

export enum LuDisplayFullname {
	firstlast = 'fl',
	lastfirst = 'lf',
	first = 'f',
	last = 'l',
}

export enum LuDisplayInitials {
	firstlast = 'FL',
	lastfirst = 'LF',
	last = 'L',
	first = 'F',
}

export enum LuDisplayHybrid {
	firstIlastFull = 'Fl',
	firstFulllastI = 'fL',
	lastIfirstFull = 'Lf',
	lastFullfirstI = 'lF',
}

export type LuDisplayFormat = EnumValue<typeof LuDisplayFullname> | EnumValue<typeof LuDisplayInitials> | EnumValue<typeof LuDisplayHybrid>;

/** Injection token that can be used to change the default displayed user format. */
export const LU_DEFAULT_DISPLAY_POLICY = new InjectionToken<LuDisplayFormat>('LuDisplayFormat', { factory: () => LuDisplayFullname.lastfirst });
