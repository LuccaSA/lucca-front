/**
 * Pre-flight of a generation run.
 *
 * Runs before any collection, in two phases. No question is asked while a non-interactive check can
 * still stop the run: otherwise the operator answers prompts for a generation that will not happen.
 *
 * Phase 1 (`ensureReleasesExist`, non-interactive): the requested release really exists — git tag,
 * clone up to date, npm publication, deployed Storybook.
 * Phase 2 (`zh-release-guard.ts`): the ZeroHeight release IDs.
 *
 * Every refusal leaves through `PreflightAbort`, so a decision never reads like a crash.
 */

import { execFileSync } from 'child_process';
import { fetchWithTimeout } from './collectors/http';
import { MinorResolution, compareTags } from './version-config';
import { VersionConfig } from './types';

/**
 * A run refused at pre-flight: the release is not generatable, or the operator declined to continue.
 * Distinct from a thrown Error so the caller can report a *decision* (🛑, no stack, no "Fatal error")
 * rather than a failure — while still exiting non-zero, exactly like the ZeroHeight guard's own
 * `abandon` keyword. Nothing was generated, so nothing may look like a success.
 */
export class PreflightAbort extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'PreflightAbort';
	}
}

/**
 * Whether this branch may (re)generate `requested` (e.g. "22.1") over the skill it already carries,
 * which documents `committed` (null before the first generation). Returns the refusal shown to the
 * operator, or null when the run may proceed.
 *
 * The skill is a single folder rewritten in place: generating a minor overwrites the one committed
 * here, and the next tag cut from this branch ships it to every consumer pinned on that tag.
 */
export function refuseMinorForThisBranch(requested: string, committed: string | null): string | null {
	if (committed === null) return null;
	const [reqMajor, reqMinor] = requested.split('.').map(Number);
	const [comMajor, comMinor] = committed.split('.').map(Number);
	const isOlder = reqMajor < comMajor || (reqMajor === comMajor && reqMinor < comMinor);
	if (!isOlder) return null;
	return (
		`--version ${requested} : cette branche porte la skill ${committed}, la générer ici l'écraserait et le prochain tag la livrerait aux projets en ${committed}. ` +
		`Génère ${requested} sur la branche de maintenance de sa majeure (ex : v21.4-lts pour la 21.x).`
	);
}

/** The npm package whose publication proves a tag actually shipped. */
const NG_PACKAGE_NAME = '@lucca-front/ng';

/** `git ls-remote` and `npm view` both hit the network; neither is worth waiting on for long. */
const GIT_REMOTE_TIMEOUT_MS = 30_000;
const NPM_VIEW_TIMEOUT_MS = 60_000;
/** Generous next to the collectors' deadline: this single request must not be the flaky one. */
const STORYBOOK_TIMEOUT_MS = 20_000;

/** One aligned recap line: `   ✅ Storybook   https://…`. */
function line(status: string, label: string, detail: string): string {
	return `   ${status} ${label.padEnd(11)} ${detail}`;
}

/** Keeps a multi-line stderr readable inside a one-line recap. */
function firstLine(text: string): string {
	return String(text).split('\n').map((l) => l.trim()).filter(Boolean)[0] ?? 'raison inconnue';
}

// ─── Phase 1 — the release exists ────────────────────────────────────────────

/**
 * Verifies, for every targeted minor, that the release is real and complete enough to generate
 * from. Read-only, so it also runs under `--dry-run`: knowing the release is not ready is precisely
 * what a dry run is for.
 *
 * The git tag itself is already proven by `resolveMinorVersion` (it throws on an unknown minor), so
 * it is only reported here — the recap is the point: four lines that say what the run is about to
 * read, before anything is asked or written.
 */
export async function ensureReleasesExist(resolutions: MinorResolution[]): Promise<void> {
	for (const resolution of resolutions) {
		console.log(`\n🔎 Pré-flight ${resolution.minorKey}`);
		console.log(line('✅', 'Tag git', `${resolution.version.tag} (${resolution.patchTags.length} patch·s publié·s)`));
		checkCloneUpToDate(resolution.minorKey);
		checkNpmPublished(resolution.version.tag);
		await checkStorybookDeployed(resolution.version);
	}
}

/** Stable release tags of a minor as `git ls-remote` reports them (peeled refs deduplicated). */
function parseLsRemoteTags(out: string): string[] {
	const tags = new Set<string>();
	for (const raw of out.split('\n')) {
		const ref = raw.split('\t')[1];
		if (!ref) continue;
		const tag = ref.replace(/^refs\/tags\//, '').replace(/\^\{\}$/, '');
		if (/^v\d+\.\d+\.\d+$/.test(tag)) tags.add(tag);
	}
	return [...tags];
}

function localTags(pattern: string): string[] {
	const out = execFileSync('git', ['tag', '-l', pattern], { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
	return out.split('\n').map((t) => t.trim()).filter((t) => /^v\d+\.\d+\.\d+$/.test(t));
}

/**
 * A clone one patch behind is the silent failure this whole check exists for: `listStableTags` reads
 * LOCAL tags only, so a missing `v22.1.2` simply makes `v22.1.1` look like the minor's latest patch.
 * The run then reports "dernier patch : v22.1.1" — perfectly plausible — and produces a skill whose
 * references/ and Storybook URLs are a patch behind, with no error anywhere.
 *
 * The fetch is NOT performed here: a generation script has no business mutating the operator's repo.
 */
function checkCloneUpToDate(minorKey: string): void {
	const pattern = `v${minorKey}.*`;
	let remote: string[];
	try {
		const out = execFileSync('git', ['ls-remote', '--tags', 'origin', pattern], {
			encoding: 'utf-8',
			timeout: GIT_REMOTE_TIMEOUT_MS,
			maxBuffer: 10 * 1024 * 1024,
			stdio: ['ignore', 'pipe', 'pipe'],
		});
		remote = parseLsRemoteTags(out);
	} catch (err: any) {
		console.log(line('❌', 'Remote', `origin injoignable (${firstLine(err.stderr ?? err.message)})`));
		throw new PreflightAbort(
			`les tags de origin n'ont pas pu être vérifiés : impossible de garantir que le clone est à jour sur ${minorKey}.`,
		);
	}

	const local = new Set(localTags(pattern));
	const missing = remote.filter((t) => !local.has(t)).sort(compareTags);
	if (missing.length > 0) {
		console.log(line('❌', 'Remote', `${missing.join(', ')} sur origin, absent(s) en local`));
		throw new PreflightAbort(
			`git fetch --tags, puis relance. Générer maintenant produirait une skill ${minorKey} figée sur un patch dépassé, sans le moindre message.`,
		);
	}

	// A local tag absent from origin is suspicious (a release tag that was never pushed) but it does
	// not make the generation wrong — the content it points at exists. Reported, not blocking.
	const unpushed = [...local].filter((t) => !remote.includes(t)).sort(compareTags);
	if (unpushed.length > 0) {
		console.log(line('⚠️', 'Remote', `${unpushed.join(', ')} en local, absent(s) de origin`));
		return;
	}
	console.log(line('✅', 'Remote', `aucun tag ${pattern} manquant en local`));
}

/**
 * A git tag and an npm publication are two separate events, and the second one fails on its own:
 * `v21.1.5` and `v21.2.3` are tagged but never reached npm. They are neutralised by a hand-kept list
 * (`UNPUBLISHED_TAGS`), necessarily written AFTER someone noticed. Without this check, a freshly
 * failed publication makes the pipeline document a version nobody can install, and emit a `fixes/`
 * file for a phantom.
 *
 * npm stays an alarm, not a source: `listStableTags` remains git-only, so changelogs and fixes/ keep
 * generating offline and reproducibly.
 */
function checkNpmPublished(tag: string): void {
	const spec = `${NG_PACKAGE_NAME}@${tag.replace(/^v/, '')}`;
	let published: string;
	try {
		published = execFileSync('npm', ['view', spec, 'version'], {
			encoding: 'utf-8',
			timeout: NPM_VIEW_TIMEOUT_MS,
			stdio: ['ignore', 'pipe', 'pipe'],
		}).trim();
	} catch (err: any) {
		const stderr = String(err.stderr ?? err.message ?? '');
		// A version that does not exist is an E404 on the *spec*, which npm exits 1 on — the only
		// case that means "not published". Anything else (offline, registry 5xx, auth) is a failure
		// to verify, and must not be reported as a phantom release.
		if (/E404|No match found/.test(stderr)) {
			reportUnpublished(tag, spec);
		}
		console.log(line('❌', 'npm', `vérification impossible (${firstLine(stderr)})`));
		throw new PreflightAbort(`la publication npm de ${tag} n'a pas pu être vérifiée.`);
	}

	if (published === '') reportUnpublished(tag, spec);
	console.log(line('✅', 'npm', `${spec} publiée`));
}

function reportUnpublished(tag: string, spec: string): never {
	console.log(line('❌', 'npm', `${spec} absente du registre`));
	throw new PreflightAbort(
		`le tag ${tag} existe mais la version n'est pas publiée — publication ratée ou en cours.\n` +
			`   → Attends la publication, ou ajoute ${tag} à UNPUBLISHED_TAGS (version-config.ts) si c'est un tag fantôme assumé.`,
	);
}

/**
 * Storybook is not one source among others: it is what the component list itself is built from
 * (`discoverComponents` starts from the index, and only rescues metadata entries that have an
 * Angular entrypoint). Without it there are no code examples, CSS-only components vanish entirely,
 * every survivor lands in `category: 'Unknown'` — and nothing reports it, since the output guard
 * only inspects examples that exist. Refusing to generate is the only honest answer.
 *
 * The index is fetched again by the collector a few seconds later; one extra request buys a refusal
 * that happens before any question is asked, rather than mid-run.
 */
async function checkStorybookDeployed(version: VersionConfig): Promise<void> {
	const indexUrl = `${version.storybookBaseUrl}/index.json`;
	let status: number;
	try {
		status = (await fetchWithTimeout(indexUrl, {}, STORYBOOK_TIMEOUT_MS)).status;
	} catch (err: any) {
		console.log(line('❌', 'Storybook', `${indexUrl} injoignable (${firstLine(err.message)})`));
		throw new PreflightAbort(`le Storybook de ${version.tag} n'a pas répondu — génération refusée (les exemples de code viendraient à manquer).`);
	}
	if (status !== 200) {
		console.log(line('❌', 'Storybook', `HTTP ${status} sur ${indexUrl}`));
		throw new PreflightAbort(
			`le Storybook de ${version.tag} n'est pas déployé — génération refusée : sans lui, la skill perd tous ses exemples de code et ses composants CSS-only.`,
		);
	}
	console.log(line('✅', 'Storybook', version.storybookBaseUrl));
}
