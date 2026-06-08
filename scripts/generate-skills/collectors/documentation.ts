/**
 * Documentation collector — fetches non-component ZeroHeight pages
 * (tokens, content writing rules, guidelines, design patterns).
 *
 * Uses the same fetch logic as the component ZH collector but writes
 * to `references/documentation/<category>/v<M>.<m>/`.
 *
 * Versioned by **minor** (e.g. 21.2) since ZH has one releaseId per minor.
 */

import fs from 'fs';
import path from 'path';
import { DocumentationMap, DocumentationEntry, VersionConfig } from '../types';
import { fetchZeroHeightPage } from './zeroheight-fetch';
import { cleanZeroHeightMarkdown } from '../generators/template-renderer';
import { writeDocumentationPage } from '../generators/skill-writer';

const DOC_MAP_PATH = path.join(__dirname, '..', 'documentation-map.json');

export function loadDocumentationMap(): DocumentationMap {
	const raw = fs.readFileSync(DOC_MAP_PATH, 'utf-8');
	return JSON.parse(raw) as DocumentationMap;
}

export type DocCategory = keyof DocumentationMap;

/**
 * Fetches and writes all documentation pages for a given category and version.
 *
 * @returns Number of pages successfully written
 */
export async function collectDocumentation(
	skillsDir: string,
	version: VersionConfig,
	category: DocCategory,
	entries: DocumentationEntry[],
): Promise<{ written: number; errors: number }> {
	let written = 0;
	let errors = 0;

	for (const entry of entries) {
		try {
			const zhData = await fetchZeroHeightPage(entry.zhPagePath, version.zhReleaseId);

			if (!zhData) {
				console.warn(`  ⚠️  No ZH content for ${category}/${entry.slug}`);
				errors++;
				continue;
			}

			const cleaned = cleanZeroHeightMarkdown(zhData.raw);

			if (!cleaned.trim()) {
				console.warn(`  ⚠️  Empty content after cleaning for ${category}/${entry.slug}`);
				errors++;
				continue;
			}

			const content = `# ${entry.title}\n\n${cleaned}\n`;
			const result = writeDocumentationPage(skillsDir, version, category, `${entry.slug}.md`, content);
			console.log(`     ✅ ${category}/${entry.slug}.md — ${result.status}`);
			written++;
		} catch (err: any) {
			console.warn(`  ⚠️  Error processing ${category}/${entry.slug}: ${err.message}`);
			errors++;
		}
	}

	return { written, errors };
}

/**
 * Collects all documentation categories for a version.
 */
export async function collectAllDocumentation(
	skillsDir: string,
	version: VersionConfig,
): Promise<{ written: number; errors: number }> {
	const docMap = loadDocumentationMap();
	let totalWritten = 0;
	let totalErrors = 0;

	for (const category of Object.keys(docMap) as DocCategory[]) {
		const entries = docMap[category];
		if (entries.length === 0) continue;

		console.log(`\n  📖 ${category} (${entries.length} pages)...`);
		const { written, errors } = await collectDocumentation(skillsDir, version, category, entries);
		totalWritten += written;
		totalErrors += errors;
	}

	return { written: totalWritten, errors: totalErrors };
}
