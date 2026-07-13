/**
 * Deprecated components collector — fetches the "Cycle de vie des composants" page
 * from ZeroHeight, which contains:
 * - Liste des éléments dépréciés (deprecated items with replacements)
 * - Schematics (migration commands)
 * - Statuts & cycle de vie (lifecycle rules)
 * - Liste des éléments supprimés (removed items per version)
 *
 * Outputs to `references/documentation/deprecated/v<M>.<m>/deprecated.md`
 *
 * Sources:
 * - Tab "éléments dépréciés": 40c515-cycle-de-vie-des-composants/b/95175f
 * - Tab "éléments supprimés": 40c515-cycle-de-vie-des-composants/b/16627d
 */

import { VersionConfig } from '../types';
import { fetchZeroHeightPageGuarded } from './zeroheight-fetch';
import { TransientFetchError, recordFailure } from './fetch-failures';
import { cleanZeroHeightMarkdown } from '../generators/template-renderer';
import { writeDocumentationPage } from '../generators/skill-writer';

/** ZeroHeight tab paths for the deprecated/removed content. */
const ZH_DEPRECATED_TAB = '40c515-cycle-de-vie-des-composants/b/95175f';
const ZH_REMOVED_TAB = '40c515-cycle-de-vie-des-composants/b/16627d';

/**
 * Fetches both deprecated & removed tabs from ZeroHeight and combines them
 * into a single `deprecated.md` documentation page.
 *
 * The page is written ONLY when no tab failed transiently: a half-fetched page must never
 * overwrite a previously complete `deprecated.md`. A 404 tab is a legitimate absence and
 * doesn't block the write. Transient failures are recorded for `--retry-failed`.
 *
 * @returns Result summary with written/error counts
 */
export async function collectDeprecated(
	skillsDir: string,
	version: VersionConfig,
): Promise<{ written: number; errors: number }> {
	const bareVersion = `${version.major}.${version.minor}.${version.patch}`;
	const parts: string[] = [];
	let transientFailures = 0;

	const tabs: { label: string; pagePath: string }[] = [
		{ label: 'deprecated', pagePath: ZH_DEPRECATED_TAB },
		{ label: 'removed', pagePath: ZH_REMOVED_TAB },
	];

	for (const tab of tabs) {
		try {
			const data = await fetchZeroHeightPageGuarded(tab.pagePath, version.zhReleaseId, {
				scope: 'deprecated',
				slug: 'deprecated',
				version: bareVersion,
			});
			if (data) {
				const cleaned = cleanZeroHeightMarkdown(data.raw);
				if (cleaned.trim()) {
					parts.push(cleaned);
				} else {
					console.warn(`  ⚠️  Empty content after cleaning for ${tab.label} tab`);
				}
			} else {
				console.warn(`  ⚠️  No ZH content for ${tab.label} tab`);
			}
		} catch (err: any) {
			transientFailures++;
			if (err instanceof TransientFetchError) {
				recordFailure({
					source: 'zeroheight',
					scope: 'deprecated',
					slug: 'deprecated',
					version: bareVersion,
					ref: tab.pagePath,
					status: err.status,
					reason: err.message,
				});
			}
			console.warn(`  ⚠️  Error fetching ${tab.label} tab: ${err.message}`);
		}
	}

	if (transientFailures > 0) {
		console.warn('  ⚠️  Page deprecated incomplète — fichier non écrit (le précédent est conservé). Rejouable via --retry-failed.');
		return { written: 0, errors: 1 };
	}

	if (parts.length === 0) {
		console.warn('  ⚠️  No deprecated content could be collected');
		return { written: 0, errors: 1 };
	}

	const content = parts.join('\n\n---\n\n');

	const result = writeDocumentationPage(skillsDir, version, 'deprecated', 'deprecated.md', content);
	console.log(`     ✅ deprecated/deprecated.md — ${result.status}`);
	return { written: 1, errors: 0 };
}
