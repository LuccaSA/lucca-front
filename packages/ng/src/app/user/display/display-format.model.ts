export enum DisplayFullname {
	firstlast = 'fl',
	lastfirst = 'lf',
	first = 'f',
	last = 'l'
}

export enum DisplayInitials {
	firstlast = 'FL',
	lastfirst = 'LF',
	last = 'L',
	first = 'F'
}

export enum DisplayHybrid {
	firstIlastFull = 'Fl',
	firstFulllastI = 'fL',
	lastIfirstFull = 'Lf',
	lastFullfirstI = 'lF'
}

export type DisplayFormat = DisplayFullname | DisplayInitials | DisplayHybrid;
