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

/** What kind of generation unit the failed fetch belongs to — drives `--retry-failed` replay. */
export type FetchScope = 'component' | 'documentation' | 'tools' | 'deprecated';

export interface FetchFailure {
	source: 'zeroheight' | 'figma';
	/**
	 * Replay scope. Absent in manifests written before this field existed — treat as 'component'.
	 */
	scope?: FetchScope;
	/** Slug of the failed unit: component slug, "category/page" for documentation, tool slug. */
	slug: string;
	/** Bare version, e.g. "21.1.2". */
	version: string;
	/** What was requested: ZH page path or Figma node id. */
	ref: string;
	/** HTTP status or a symbolic code ("network", "html", "empty", "shrink"). */
	status: string;
	/** Human-readable reason. */
	reason: string;
}

/**
 * Report-only anomaly: surfaced at the end of the run but NOT written to the replay manifest
 * (replaying wouldn't fix it — e.g. a property genuinely removed in Figma).
 */
export interface FetchWarning {
	source: 'zeroheight' | 'figma';
	/** What the warning is about (slug, page path or node id). */
	label: string;
	/** Human-readable reason. */
	reason: string;
}

let failures: FetchFailure[] = [];
let warnings: FetchWarning[] = [];

export function clearFailures(): void {
	failures = [];
	warnings = [];
}

export function recordFailure(f: FetchFailure): void {
	failures.push(f);
}

export function recordWarning(w: FetchWarning): void {
	warnings.push(w);
}

export function getFailures(): FetchFailure[] {
	return failures;
}

/** Prints a grouped, readable summary of the failures and warnings collected this run. */
export function reportFailures(): void {
	if (warnings.length > 0) {
		console.warn(`\n🔎 ${warnings.length} anomalie(s) signalée(s) (rapport seul, non rejouable) :\n`);
		for (const w of warnings.sort((a, b) => a.label.localeCompare(b.label))) {
			console.warn(`    • [${w.source}] ${w.label} : ${w.reason}`);
		}
	}

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
			const scope = f.scope && f.scope !== 'component' ? ` [${f.scope}]` : '';
			console.warn(`    • ${f.version}${scope} ${f.slug} — ${f.status} (${f.ref}) : ${f.reason}`);
		}
	}
	const hasShrink = failures.some((f) => f.status === 'shrink');
	console.warn(`\n  → Rejoue ces unités : npm run skills:generate -- --retry-failed`);
	if (hasShrink) {
		console.warn(`  → Rétrécissement légitime (suppression assumée côté source) : ajouter --accept-shrink`);
	}
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
