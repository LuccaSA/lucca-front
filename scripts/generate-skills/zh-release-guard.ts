/**
 * Pre-flight guard for ZeroHeight release IDs.
 *
 * ZeroHeight design content is version-pinned only when a minor has a release ID in
 * `zh-release-ids.json`. Without it, the fetch falls back to "latest" (a moving target). Since npm
 * and ZeroHeight ship in lockstep, a minor is safe to leave unpinned ONLY while it is the newest
 * published version — at that instant "latest" == its content. The danger is regenerating an OLDER,
 * unpinned minor later (e.g. a generator-wide re-run): it would pull "latest" = a newer version and
 * silently corrupt that version's design sections.
 *
 * This guard runs before generation and enforces the invariant:
 *   a minor may be (re)generated unpinned ONLY if it is the newest minor involved (run ∪ on-disk).
 *
 * Resolution of an unpinned minor:
 *   - superseded (a newer minor exists) → MUST be pinned: --zh-id flag, else interactive prompt,
 *     else hard fail (CI).
 *   - newest & being (re)generated → confirm it's still the latest online (--zh-latest flag, else
 *     y/n prompt). "no" (a newer ZH release exists) → ask for this minor's ID and pin it.
 *
 * Supplied IDs are validated against ZeroHeight and persisted via addZhReleaseId.
 */

import readline from 'readline';
import { parseMinor, parseVersion, getZeroHeightUrl, getZhReleaseIds, addZhReleaseId } from './version-config';
import { listGeneratedVersionStrings } from './generators/aggregate-writer';

export interface ZhGuardFlags {
	/** Release IDs supplied non-interactively: { "21.3": 12345 } (from --zh-id 21.3=12345). */
	zhIds: Record<string, number>;
	/** Minors explicitly asserted as "the latest online" (from --zh-latest 21.3), allowed unpinned. */
	zhLatest: Set<string>;
}

/** A ZeroHeight page path known to exist in recent releases, used to validate a supplied release ID. */
const VALIDATION_PAGE = '098404'; // button

/** Accepts a minor ("21.2") or a full patch version ("21.2.5") and returns "major.minor". */
function minorKey(version: string): string {
	const m = parseMinor(version);
	if (m) return `${m.major}.${m.minor}`;
	const p = parseVersion(version);
	if (!p) throw new Error(`Version invalide: "${version}"`);
	return `${p.major}.${p.minor}`;
}

function compareMinors(a: string, b: string): number {
	const [aMaj, aMin] = a.split('.').map(Number);
	const [bMaj, bMin] = b.split('.').map(Number);
	return aMaj - bMaj || aMin - bMin;
}

function ask(question: string): Promise<string> {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); }));
}

/**
 * Validates a release ID by fetching a known page at `/v/<id>/`. Returns:
 *  - true  → the release exists (HTTP 200 with content);
 *  - false → invalid (404 / empty);
 *  - 'unknown' → could not verify (network error) — accepted with a warning, not a hard reject.
 */
async function validateReleaseId(releaseId: number): Promise<true | false | 'unknown'> {
	const url = getZeroHeightUrl(VALIDATION_PAGE, releaseId);
	try {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 20000);
		const res = await fetch(url, { signal: controller.signal });
		clearTimeout(timer);
		if (res.status === 200) {
			const body = await res.text();
			return body.trim().length > 0 ? true : false;
		}
		return false;
	} catch {
		return 'unknown';
	}
}

/** Prompts (TTY) for a release ID for `minor`, validates it, returns the numeric ID. */
async function promptForId(minor: string): Promise<number> {
	for (;;) {
		const raw = await ask(`  ↳ Quel est l'ID de release ZeroHeight de la version ${minor}.x ? (entier, ou "abandon") : `);
		if (raw.toLowerCase() === 'abandon') throw new Error(`Génération annulée : ID ZeroHeight manquant pour ${minor}.`);
		const id = Number(raw);
		if (!Number.isInteger(id) || id <= 0) {
			console.log('     ⚠️  ID invalide (entier attendu).');
			continue;
		}
		const verdict = await validateReleaseId(id);
		if (verdict === false) {
			console.log(`     ⚠️  L'ID ${id} ne renvoie aucun contenu sur ZeroHeight — vérifie et réessaie.`);
			continue;
		}
		if (verdict === 'unknown') console.log(`     ℹ️  Impossible de vérifier l'ID ${id} (réseau) — accepté tel quel.`);
		return id;
	}
}

/** Resolves an ID for `minor` non-interactively (flag) or via prompt (TTY); persists it. */
async function resolveAndPin(minor: string, interactive: boolean, flags: ZhGuardFlags, ctx: string): Promise<void> {
	const dupes = Object.entries(getZhReleaseIds()).filter(([, id]) => id === flags.zhIds[minor]);
	if (flags.zhIds[minor] != null) {
		const id = flags.zhIds[minor];
		if (dupes.length > 0) throw new Error(`L'ID ${id} fourni pour ${minor} est déjà attribué à ${dupes[0][0]}.`);
		const verdict = await validateReleaseId(id);
		if (verdict === false) throw new Error(`L'ID ZeroHeight ${id} (--zh-id ${minor}=${id}) ne renvoie aucun contenu — invalide.`);
		addZhReleaseId(minor, id);
		console.log(`  ✅ ${minor} → ID ${id} pinné (zh-release-ids.json).`);
		return;
	}
	if (interactive) {
		console.log(`  ⚠️  ${ctx}`);
		const id = await promptForId(minor);
		addZhReleaseId(minor, id);
		console.log(`  ✅ ${minor} → ID ${id} pinné (zh-release-ids.json).`);
		return;
	}
	throw new Error(
		`${ctx}\n` +
			`  → Fournis son ID ZeroHeight : --zh-id ${minor}=<releaseId> ` +
			`(ou lance en interactif). L'ID se lit dans l'URL du sélecteur de versions Prisme (/v/<id>/). Voir README.`,
	);
}

/**
 * Enforces the ZeroHeight release-ID invariant before generation. Throws (aborts the run) when an
 * unpinned, superseded minor can't be resolved, or when the newest minor isn't confirmed in CI.
 */
export async function ensureZhReleaseIds(runVersions: string[], skillsDir: string, flags: ZhGuardFlags): Promise<void> {
	const runMinors = new Set(runVersions.map(minorKey));
	const diskMinors = new Set(listGeneratedVersionStrings(skillsDir).map(minorKey));
	const allMinors = [...new Set([...runMinors, ...diskMinors])].sort(compareMinors);
	if (allMinors.length === 0) return;

	const newest = allMinors[allMinors.length - 1];
	const interactive = !!process.stdin.isTTY;
	const pinned = getZhReleaseIds();

	for (const minor of allMinors) {
		if (pinned[minor] != null) continue; // already pinned → reproducible
		const superseded = compareMinors(minor, newest) < 0;
		const inRun = runMinors.has(minor);

		if (superseded) {
			// A newer minor exists → "latest" would no longer match this one. Must pin before any
			// (re)generation that touches it. We resolve even if it's only on disk (not in this run),
			// so the ID is captured now, while the design team still exposes it.
			await resolveAndPin(
				minor,
				interactive,
				flags,
				`ZeroHeight : la mineure ${minor} n'est plus la plus récente (${newest} existe) et n'a pas d'ID pinné. ` +
					`La régénérer tirerait le contenu « latest » (= ${newest}) → corruption silencieuse.`,
			);
			continue;
		}

		// minor === newest
		if (!inRun) continue; // newest, unpinned, not regenerated this run → safe to leave as-is.

		// Newest minor being (re)generated, unpinned: confirm it's still the latest ONLINE (ZH may be
		// ahead of what we've generated). --zh-latest asserts it; otherwise prompt; otherwise fail (CI).
		if (flags.zhLatest.has(minor)) {
			console.log(`  ℹ️  ZeroHeight : ${minor} déclarée comme dernière version en ligne (--zh-latest) → contenu « latest ».`);
			continue;
		}
		if (flags.zhIds[minor] != null) {
			await resolveAndPin(minor, interactive, flags, '');
			continue;
		}
		if (interactive) {
			const answer = (await ask(`  ↳ ZeroHeight : ${minor} est-elle la dernière version disponible EN LIGNE (ZeroHeight) ? (y/n) : `)).toLowerCase();
			if (answer === 'y' || answer === 'o' || answer === 'yes' || answer === 'oui') {
				console.log(`  ℹ️  ${minor} = dernière en ligne → contenu « latest » (à pinner dès qu'une version plus récente sortira).`);
				continue;
			}
			console.log(`  ⚠️  ${minor} n'est donc plus la dernière en ligne → il faut son ID.`);
			const id = await promptForId(minor);
			addZhReleaseId(minor, id);
			console.log(`  ✅ ${minor} → ID ${id} pinné (zh-release-ids.json).`);
			continue;
		}
		throw new Error(
			`ZeroHeight : ${minor} est généré sans ID pinné. En non-interactif, confirme que c'est la dernière ` +
				`version en ligne avec --zh-latest ${minor}, ou fournis son ID avec --zh-id ${minor}=<releaseId>. Voir README.`,
		);
	}
}
