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

export type LuDisplayFormat = LuDisplayFullname | LuDisplayInitials | LuDisplayHybrid;
