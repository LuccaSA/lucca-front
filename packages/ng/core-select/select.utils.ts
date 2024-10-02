export const sanitizeClueFilter = (clue: string, delimiter: string): string =>
	clue
		.split(' ')
		.map((c: string) => encodeURIComponent(c))
		.join(delimiter);
