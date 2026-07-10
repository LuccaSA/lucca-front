/**
 * Close-match suggestions for an unknown utility class. Pure — no 'vscode'
 * import. Bounded Levenshtein with an early-exit row minimum; only invoked when
 * a user hovers/references an unknown `pr-u-*` class, so cost is negligible.
 */

const MAX_DISTANCE = 3;

/**
 * Returns up to `max` candidate names closest to `name`, ordered by edit
 * distance, then by longest shared prefix, then alphabetically. Names further
 * than MAX_DISTANCE are excluded.
 */
export function closestUtilities(name: string, candidates: readonly string[], max = 3): string[] {
	const target = name.toLowerCase();
	const scored: Array<{ name: string; distance: number; prefix: number }> = [];

	for (const candidate of candidates) {
		const distance = boundedLevenshtein(target, candidate.toLowerCase(), MAX_DISTANCE);
		if (distance <= MAX_DISTANCE) {
			scored.push({ name: candidate, distance, prefix: sharedPrefix(target, candidate.toLowerCase()) });
		}
	}

	scored.sort((a, b) => a.distance - b.distance || b.prefix - a.prefix || a.name.localeCompare(b.name));
	return scored.slice(0, max).map((s) => s.name);
}

/** Levenshtein distance, giving up (returns limit + 1) once the whole row exceeds `limit`. */
function boundedLevenshtein(a: string, b: string, limit: number): number {
	if (Math.abs(a.length - b.length) > limit) {
		return limit + 1;
	}
	let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
	let curr = new Array<number>(b.length + 1);

	for (let i = 1; i <= a.length; i++) {
		curr[0] = i;
		let rowMin = curr[0];
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
			if (curr[j] < rowMin) {
				rowMin = curr[j];
			}
		}
		if (rowMin > limit) {
			return limit + 1;
		}
		[prev, curr] = [curr, prev];
	}
	return prev[b.length];
}

function sharedPrefix(a: string, b: string): number {
	let i = 0;
	while (i < a.length && i < b.length && a[i] === b[i]) {
		i++;
	}
	return i;
}
