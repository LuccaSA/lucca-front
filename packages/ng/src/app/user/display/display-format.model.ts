export enum DisplayFullname {
	firstlast = 'fl',
	lastfirst = 'lf'
}

export enum DisplayInitials {
	firstlast = 'FL',
	lastfirst = 'LF'
}

export enum DisplayHybrid {
	firstIlastFull = 'Fl',
	firstFulllastI = 'fL',
	lastIfirstFull = 'Lf',
	lastFullfirstI = 'lF'
}

export type DisplayFormat = DisplayFullname | DisplayInitials | DisplayHybrid;
