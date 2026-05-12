/**
 * Changelog writer — generates a diff summary between two generated versions.
 *
 * Output goes to `.github/skills/lucca-front/changelog/v<M>.<m>.<p>.md`.
 * These files are NOT consumed by the skill — they serve as a human-readable
 * PR review aid to confirm what changed between consecutive versions.
 */

import fs from 'fs';
import path from 'path';
import { VersionConfig, VersionManifest } from '../types';

const SKILLS_BASE = 'lucca-front';

interface FileDiff {
	relativePath: string;
	status: 'added' | 'removed' | 'modified' | 'unchanged';
	linesBefore?: number;
	linesAfter?: number;
	inlineDiff?: string;
}

interface DiffSection {
	label: string;
	diffs: FileDiff[];
}

/**
 * Finds the previous version from the manifest (highest version lower than current).
 */
export function findPreviousVersion(manifest: VersionManifest, current: VersionConfig): string | null {
	const currentKey = `${current.major}.${current.minor}.${current.patch}`;
	const sorted = Object.keys(manifest.versions)
		.filter(v => v !== currentKey)
		.sort((a, b) => {
			const [aMaj, aMin, aPat] = a.split('.').map(Number);
			const [bMaj, bMin, bPat] = b.split('.').map(Number);
			return aMaj !== bMaj ? bMaj - aMaj : aMin !== bMin ? bMin - aMin : bPat - aPat;
		});

	// Return the highest version that is strictly lower than current
	for (const v of sorted) {
		const [maj, min, pat] = v.split('.').map(Number);
		if (
			maj < current.major ||
			(maj === current.major && min < current.minor) ||
			(maj === current.major && min === current.minor && pat < current.patch)
		) {
			return v;
		}
	}
	return null;
}

/**
 * Recursively lists all files in a directory, returning relative paths.
 */
function listFiles(dir: string, base: string = dir): string[] {
	if (!fs.existsSync(dir)) return [];
	const results: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...listFiles(full, base));
		} else {
			results.push(path.relative(base, full));
		}
	}
	return results.sort();
}

/**
 * Normalizes content for comparison by replacing version-specific URLs
 * with a placeholder. This prevents false "modified" reports caused solely
 * by the version number changing in Storybook/ZH links.
 */
function normalizeForComparison(content: string): string {
	return content
		// Storybook URLs: /v21.0.0/ → /v__VERSION__/
		.replace(/\/v\d+\.\d+(\.\d+)?\//g, '/v__VERSION__/')
		// ZH release URLs: /v/47452/ → /v/__RELEASE__/
		.replace(/\/v\/\d+\//g, '/v/__RELEASE__/')
		// Trailing whitespace per line
		.replace(/[ \t]+$/gm, '');
}

// ── Inline diff computation ─────────────────────────────────────────────────

interface DiffOp {
	type: 'equal' | 'add' | 'remove';
	line: string;
}

function computeLCS(a: string[], b: string[]): number[][] {
	const m = a.length;
	const n = b.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
		}
	}
	return dp;
}

/**
 * Builds diff operations from LCS backtracing.
 * Compares normalized lines but returns raw lines for display.
 */
function buildDiffOps(normA: string[], normB: string[], rawA: string[], rawB: string[]): DiffOp[] {
	const dp = computeLCS(normA, normB);
	const ops: DiffOp[] = [];
	let i = normA.length;
	let j = normB.length;
	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && normA[i - 1] === normB[j - 1]) {
			ops.unshift({ type: 'equal', line: rawB[j - 1] });
			i--;
			j--;
		} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
			ops.unshift({ type: 'add', line: rawB[j - 1] });
			j--;
		} else {
			ops.unshift({ type: 'remove', line: rawA[i - 1] });
			i--;
		}
	}
	return ops;
}

const DIFF_CONTEXT = 2;
const MAX_DIFF_OUTPUT = 60;

function formatUnifiedDiff(ops: DiffOp[]): string {
	const changeIdx = ops.map((op, i) => (op.type !== 'equal' ? i : -1)).filter(i => i !== -1);
	if (changeIdx.length === 0) return '';

	const hunks: { start: number; end: number }[] = [];
	let hs = Math.max(0, changeIdx[0] - DIFF_CONTEXT);
	let he = Math.min(ops.length - 1, changeIdx[0] + DIFF_CONTEXT);

	for (let k = 1; k < changeIdx.length; k++) {
		const ns = Math.max(0, changeIdx[k] - DIFF_CONTEXT);
		const ne = Math.min(ops.length - 1, changeIdx[k] + DIFF_CONTEXT);
		if (ns <= he + 1) {
			he = ne;
		} else {
			hunks.push({ start: hs, end: he });
			hs = ns;
			he = ne;
		}
	}
	hunks.push({ start: hs, end: he });

	const lines: string[] = [];
	let count = 0;
	let truncated = false;

	for (let h = 0; h < hunks.length; h++) {
		if (h > 0 || hunks[h].start > 0) lines.push('@@ ... @@');
		for (let i = hunks[h].start; i <= hunks[h].end; i++) {
			if (count >= MAX_DIFF_OUTPUT) {
				truncated = true;
				break;
			}
			const prefix = ops[i].type === 'add' ? '+' : ops[i].type === 'remove' ? '-' : ' ';
			lines.push(`${prefix}${ops[i].line}`);
			count++;
		}
		if (truncated) break;
	}

	if (truncated) {
		const shown = lines.filter(l => l.startsWith('+') || l.startsWith('-')).length;
		const remaining = changeIdx.length - shown;
		if (remaining > 0) lines.push(`@@ ... ${remaining} changement(s) supplémentaire(s) @@`);
	}

	return lines.join('\n');
}

function computeInlineDiff(contentA: string, contentB: string): string {
	const rawA = contentA.split('\n');
	const rawB = contentB.split('\n');
	const normA = normalizeForComparison(contentA).split('\n');
	const normB = normalizeForComparison(contentB).split('\n');
	return formatUnifiedDiff(buildDiffOps(normA, normB, rawA, rawB));
}

/**
 * Compares two directories and returns file-level diffs.
 */
function diffDirectories(dirA: string | null, dirB: string): FileDiff[] {
	const filesA = dirA ? new Set(listFiles(dirA)) : new Set<string>();
	const filesB = new Set(listFiles(dirB));
	const allFiles = new Set([...filesA, ...filesB]);
	const diffs: FileDiff[] = [];

	for (const file of [...allFiles].sort()) {
		const inA = filesA.has(file);
		const inB = filesB.has(file);

		if (!inA && inB) {
			const linesAfter = countLines(path.join(dirB, file));
			diffs.push({ relativePath: file, status: 'added', linesAfter });
		} else if (inA && !inB) {
			const linesBefore = countLines(path.join(dirA!, file));
			diffs.push({ relativePath: file, status: 'removed', linesBefore });
		} else {
			// Both exist — compare content (normalized to ignore version-only URL changes)
			const contentA = fs.readFileSync(path.join(dirA!, file), 'utf-8');
			const contentB = fs.readFileSync(path.join(dirB, file), 'utf-8');
			if (normalizeForComparison(contentA) !== normalizeForComparison(contentB)) {
				diffs.push({
					relativePath: file,
					status: 'modified',
					linesBefore: contentA.split('\n').length,
					linesAfter: contentB.split('\n').length,
					inlineDiff: computeInlineDiff(contentA, contentB),
				});
			}
			// unchanged files are skipped
		}
	}

	return diffs;
}

function countLines(filePath: string): number {
	try {
		return fs.readFileSync(filePath, 'utf-8').split('\n').length;
	} catch {
		return 0;
	}
}

/**
 * Generates a changelog comparing the current version against the previous one.
 * Returns the path to the written changelog file, or null if skipped.
 */
export function writeVersionChangelog(
	skillsDir: string,
	version: VersionConfig,
	componentSlugs: string[],
): string | null {
	const baseDir = path.resolve(skillsDir, SKILLS_BASE);
	const manifestPath = path.join(baseDir, '_versions.json');

	if (!fs.existsSync(manifestPath)) return null;

	let manifest: VersionManifest;
	try {
		manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
	} catch {
		return null;
	}

	const prevVersionKey = findPreviousVersion(manifest, version);
	const currentVersionKey = `${version.major}.${version.minor}.${version.patch}`;

	const changelogDir = path.join(baseDir, 'changelog');
	fs.mkdirSync(changelogDir, { recursive: true });
	const changelogPath = path.join(changelogDir, `${version.tag}.md`);

	// First generation — no previous version to compare
	if (!prevVersionKey) {
		const content = `# ${version.tag} — Première génération\n\nAucune version précédente. ${componentSlugs.length} composants générés.\n`;
		fs.writeFileSync(changelogPath, content, 'utf-8');
		return changelogPath;
	}

	const prevTag = `v${prevVersionKey}`;
	const sections: DiffSection[] = [];

	// ── Components diff ──────────────────────────────────────────────────────
	const componentDiffs: FileDiff[] = [];
	for (const slug of componentSlugs) {
		const prevDir = path.join(baseDir, 'references', 'components', slug, prevTag);
		const currDir = path.join(baseDir, 'references', 'components', slug, version.tag);

		if (!fs.existsSync(currDir)) continue;

		const diffs = diffDirectories(
			fs.existsSync(prevDir) ? prevDir : null,
			currDir,
		);

		for (const d of diffs) {
			componentDiffs.push({ ...d, relativePath: `${slug}/${d.relativePath}` });
		}
	}

	if (componentDiffs.length > 0) {
		sections.push({ label: 'Composants', diffs: componentDiffs });
	}

	// ── Tools diff ───────────────────────────────────────────────────────────
	const prevToolsDir = path.join(baseDir, 'references', 'tools', prevTag);
	const currToolsDir = path.join(baseDir, 'references', 'tools', version.tag);

	if (fs.existsSync(currToolsDir)) {
		const toolDiffs = diffDirectories(
			fs.existsSync(prevToolsDir) ? prevToolsDir : null,
			currToolsDir,
		);
		if (toolDiffs.length > 0) {
			sections.push({ label: 'Outils', diffs: toolDiffs });
		}
	}

	// ── Documentation diff ───────────────────────────────────────────────────
	const currMinor = `${version.major}.${version.minor}`;
	const [prevMaj, prevMin] = prevVersionKey.split('.').map(Number);
	const prevMinor = `${prevMaj}.${prevMin}`;

	if (currMinor !== prevMinor) {
		// Minor changed — compare documentation directories
		const docCategories = ['tokens', 'content', 'guidelines', 'patterns'];
		const docDiffs: FileDiff[] = [];

		for (const cat of docCategories) {
			const prevDir = path.join(baseDir, 'references', 'documentation', cat, `v${prevMinor}`);
			const currDir = path.join(baseDir, 'references', 'documentation', cat, `v${currMinor}`);

			if (!fs.existsSync(currDir)) continue;

			const diffs = diffDirectories(
				fs.existsSync(prevDir) ? prevDir : null,
				currDir,
			);
			for (const d of diffs) {
				docDiffs.push({ ...d, relativePath: `${cat}/${d.relativePath}` });
			}
		}

		if (docDiffs.length > 0) {
			sections.push({ label: 'Documentation transverse', diffs: docDiffs });
		}
	}

	// ── Format output ────────────────────────────────────────────────────────
	let md = `# ${version.tag} vs ${prevTag}\n\n`;

	if (sections.length === 0) {
		md += `Aucune différence détectée.\n`;
	} else {
		// Summary
		const totalAdded = sections.reduce((sum, s) => sum + s.diffs.filter(d => d.status === 'added').length, 0);
		const totalModified = sections.reduce((sum, s) => sum + s.diffs.filter(d => d.status === 'modified').length, 0);
		const totalRemoved = sections.reduce((sum, s) => sum + s.diffs.filter(d => d.status === 'removed').length, 0);
		md += `**Résumé** : ${totalAdded} ajouté(s), ${totalModified} modifié(s), ${totalRemoved} supprimé(s)\n\n`;

		for (const section of sections) {
			md += `## ${section.label}\n\n`;

			const added = section.diffs.filter(d => d.status === 'added');
			const modified = section.diffs.filter(d => d.status === 'modified');
			const removed = section.diffs.filter(d => d.status === 'removed');

			if (added.length > 0) {
				md += `### Ajoutés (${added.length})\n\n`;
				for (const d of added) {
					md += `- \`${d.relativePath}\` (${d.linesAfter} lignes)\n`;
				}
				md += '\n';
			}

			if (modified.length > 0) {
				md += `### Modifiés (${modified.length})\n\n`;
				for (const d of modified) {
					const delta = (d.linesAfter ?? 0) - (d.linesBefore ?? 0);
					const sign = delta >= 0 ? '+' : '';
					md += `- \`${d.relativePath}\` (${d.linesBefore} → ${d.linesAfter} lignes, ${sign}${delta})\n`;
					if (d.inlineDiff) {
						md += `\n  \`\`\`\`diff\n`;
						for (const line of d.inlineDiff.split('\n')) {
							md += `  ${line}\n`;
						}
						md += `  \`\`\`\`\n\n`;
					}
				}
				md += '\n';
			}

			if (removed.length > 0) {
				md += `### Supprimés (${removed.length})\n\n`;
				for (const d of removed) {
					md += `- \`${d.relativePath}\` (${d.linesBefore} lignes)\n`;
				}
				md += '\n';
			}
		}
	}

	fs.writeFileSync(changelogPath, md, 'utf-8');
	return changelogPath;
}
