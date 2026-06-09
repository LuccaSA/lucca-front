/**
 * Fetch-failure registry & replay manifest.
 *
 * The generator pulls live data from ZeroHeight and Figma. Those fetchers RETRY transient
 * problems (network, 5xx, 429, HTML-instead-of-markdown); when retries are exhausted they throw a
 * `TransientFetchError` so the caller can record *what* failed and *why* — instead of silently
 * dropping content and producing a different output on the next run.
 *
 * At the end of a run, the collected failures are printed (so you know immediately) and written to
 * a manifest. `--retry-failed` reads that manifest and re-generates only the affected components.
 *
 * Definitive absences (404 / node missing from a 200 response) are NOT failures: the data simply
 * doesn't exist for that component/version, and the fetchers return null without recording anything.
 */

import fs from 'fs';

/** Thrown by a fetcher when transient errors persist after all retries. */
export class TransientFetchError extends Error {
	constructor(
		public readonly status: string,
		message: string,
	) {
		super(message);
		this.name = 'TransientFetchError';
	}
}

export interface FetchFailure {
	source: 'zeroheight' | 'figma';
	/** Component slug the fetch was for. */
	slug: string;
	/** Bare version, e.g. "21.1.2". */
	version: string;
	/** What was requested: ZH page path or Figma node id. */
	ref: string;
	/** HTTP status or a symbolic code ("network", "html", "empty"). */
	status: string;
	/** Human-readable reason. */
	reason: string;
}

let failures: FetchFailure[] = [];

export function clearFailures(): void {
	failures = [];
}

export function recordFailure(f: FetchFailure): void {
	failures.push(f);
}

export function getFailures(): FetchFailure[] {
	return failures;
}

/** Prints a grouped, readable summary of the failures collected this run. */
export function reportFailures(): void {
	if (failures.length === 0) {
		console.log('\n✅ Aucune récupération ZH/Figma en échec.');
		return;
	}

	console.warn(`\n⚠️  ${failures.length} récupération(s) en échec (contenu manquant) :\n`);
	for (const source of ['zeroheight', 'figma'] as const) {
		const group = failures.filter((f) => f.source === source);
		if (group.length === 0) continue;
		console.warn(`  ${source} (${group.length}) :`);
		for (const f of group.sort((a, b) => a.version.localeCompare(b.version) || a.slug.localeCompare(b.slug))) {
			console.warn(`    • ${f.version} ${f.slug} — ${f.status} (${f.ref}) : ${f.reason}`);
		}
	}
	console.warn(`\n  → Rejoue ces composants : npm run skills:generate -- --retry-failed`);
}

/** Writes the failure manifest (or removes it when there are no failures). */
export function writeFailureManifest(manifestPath: string): void {
	if (failures.length === 0) {
		if (fs.existsSync(manifestPath)) fs.rmSync(manifestPath);
		return;
	}
	fs.writeFileSync(manifestPath, JSON.stringify(failures, null, 2) + '\n', 'utf-8');
	console.warn(`  📄 Manifeste des échecs : ${manifestPath}`);
}

export function readFailureManifest(manifestPath: string): FetchFailure[] {
	if (!fs.existsSync(manifestPath)) return [];
	try {
		const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
		return Array.isArray(parsed) ? (parsed as FetchFailure[]) : [];
	} catch {
		return [];
	}
}
