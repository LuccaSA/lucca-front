/**
 * Pre-flight of a generation run.
 *
 * Runs before any collection, in three phases, ordered by two rules:
 *
 *   1. **No question while a non-interactive check can still stop the run.** Otherwise the operator
 *      answers prompts for a generation that will not happen.
 *   2. **No side effect before the last abort door.** The ZeroHeight guard persists a release ID the
 *      instant it is typed (`addZhReleaseId` writes `zh-release-ids.json`), so the Figma gate — whose
 *      "no" leaves nothing behind — is asked first.
 *
 * Phase 1 (`ensureReleasesExist`, non-interactive): the requested release really exists — git tag,
 * clone up to date, npm publication, deployed Storybook.
 * Phase 2 (`ensureFigmaAccess`, interactive): a usable Figma token, or a deliberate yes to generate
 * without one.
 * Phase 3 (`zh-release-guard.ts`): the ZeroHeight release IDs.
 *
 * Every refusal leaves through `PreflightAbort`, so a decision never reads like a crash.
 */

import { execFileSync } from 'child_process';
import { fetchWithTimeout } from './collectors/http';
import { ask, isInteractive, isYes } from './prompt';
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

// ─── Phase 2 — Figma token ───────────────────────────────────────────────────

type TokenVerdict = 'valid' | 'invalid' | 'unknown';

/**
 * One request to prove the token works. Presence is not validity: a 401/403 is never retried and
 * produces no design tokens at all (see collectors/figma-connect.ts), which is how an expired token
 * once went undiagnosed across ~90 nodes.
 *
 * The probe hits the SAME endpoint the collector uses — the design file's nodes — and not `/v1/me`.
 * Measured: a personal access token scoped `file_content:read`, which is exactly what the README
 * recommends ("lecture seule suffit"), reads the file fine but gets a 403 on `/v1/me` ("Invalid
 * scope … requires file_read"). Validating there would have rejected every correctly-scoped token.
 * Asking for the document root (`0:1`) keeps the payload to nothing while proving both the token and
 * access to that particular file.
 */
async function validateFigmaToken(token: string, fileKey: string): Promise<TokenVerdict> {
	const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=0%3A1&depth=1`;
	try {
		const res = await fetchWithTimeout(url, { headers: { 'X-Figma-Token': token } });
		if (res.status === 200) return 'valid';
		if (res.status === 401 || res.status === 403) return 'invalid';
		return 'unknown';
	} catch {
		return 'unknown';
	}
}

/**
 * Gate on the Figma token: generating without it silently drops every `<slug>.figma.md`, so the
 * default answer is to stop. Continuing has to be a deliberate `y` — or an explicit `--skip-figma`,
 * which is the same decision stated up front.
 */
export async function ensureFigmaAccess(figma: { token?: string; fileKey: string }, opts: { skipFigma: boolean }): Promise<void> {
	if (opts.skipFigma) {
		console.log(line('⏭️', 'Figma', 'ignoré (--skip-figma)'));
		return;
	}

	let reason: string | null = null;
	if (!figma.token) {
		reason = 'aucun token (ni generate-skills-config.json, ni FIGMA_TOKEN)';
	} else {
		const verdict = await validateFigmaToken(figma.token, figma.fileKey);
		if (verdict === 'invalid') reason = `token refusé sur le fichier ${figma.fileKey} (401/403) — expiré, révoqué, ou sans accès à ce fichier`;
		// A network hiccup on /v1/me is not evidence against the token: the collectors retry on their
		// own, so an unverifiable token is accepted rather than turned into a false alarm.
		else if (verdict === 'unknown') console.log(line('ℹ️', 'Figma', 'token non vérifiable (réseau) — accepté tel quel'));
		else console.log(line('✅', 'Figma', 'token valide'));
	}
	if (!reason) return;

	console.log(line('⚠️', 'Figma', reason));
	console.log('        Sans token, aucun <slug>.figma.md ne sera écrit : la skill partira sans les tokens de design.');

	if (!isInteractive()) {
		throw new PreflightAbort(
			`Figma — ${reason}.\n   → En non-interactif, relance avec --skip-figma pour générer sciemment sans Figma.`,
		);
	}

	const answer = await ask('  ↳ Générer quand même sans Figma ? (N/y) : ');
	if (!isYes(answer)) {
		throw new PreflightAbort(
			`token Figma absent ou invalide.\n` +
				`   → Renseigne-le (cp generate-skills-config.json.example generate-skills-config.json), ` +
				`ou relance avec --skip-figma pour générer sciemment sans Figma.`,
		);
	}
	console.log(line('ℹ️', 'Figma', 'poursuite sans Figma (choix explicite)'));
}
