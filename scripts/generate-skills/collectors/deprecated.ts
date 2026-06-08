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
import { fetchZeroHeightPage } from './zeroheight-fetch';
import { cleanZeroHeightMarkdown } from '../generators/template-renderer';
import { writeDocumentationPage } from '../generators/skill-writer';

/** ZeroHeight tab paths for the deprecated/removed content. */
const ZH_DEPRECATED_TAB = '40c515-cycle-de-vie-des-composants/b/95175f';
const ZH_REMOVED_TAB = '40c515-cycle-de-vie-des-composants/b/16627d';

/**
 * Fetches both deprecated & removed tabs from ZeroHeight and combines them
 * into a single `deprecated.md` documentation page.
 *
 * @returns Result summary with written/error counts
 */
export async function collectDeprecated(
	skillsDir: string,
	version: VersionConfig,
): Promise<{ written: number; errors: number }> {
	const parts: string[] = [];

	// Fetch the "deprecated list" tab
	try {
		const deprecatedData = await fetchZeroHeightPage(ZH_DEPRECATED_TAB, version.zhReleaseId);
		if (deprecatedData) {
			const cleaned = cleanZeroHeightMarkdown(deprecatedData.raw);
			if (cleaned.trim()) {
				parts.push(cleaned);
			} else {
				console.warn('  ⚠️  Empty content after cleaning for deprecated tab');
			}
		} else {
			console.warn('  ⚠️  No ZH content for deprecated tab');
		}
	} catch (err: any) {
		console.warn(`  ⚠️  Error fetching deprecated tab: ${err.message}`);
	}

	// Fetch the "removed elements" tab
	try {
		const removedData = await fetchZeroHeightPage(ZH_REMOVED_TAB, version.zhReleaseId);
		if (removedData) {
			const cleaned = cleanZeroHeightMarkdown(removedData.raw);
			if (cleaned.trim()) {
				parts.push(cleaned);
			} else {
				console.warn('  ⚠️  Empty content after cleaning for removed tab');
			}
		} else {
			console.warn('  ⚠️  No ZH content for removed elements tab');
		}
	} catch (err: any) {
		console.warn(`  ⚠️  Error fetching removed elements tab: ${err.message}`);
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
