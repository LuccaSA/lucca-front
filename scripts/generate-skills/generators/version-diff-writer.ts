/**
 * Version-level changelog — **human PR-review aid** (NOT consumed by the skill).
 *
 * Diffs a generated version folder against its predecessor and writes a summary to
 * `lucca-front/changelog/<version>.md`. It helps reviewers confirm what changed between two
 * generated versions when regenerating.
 *
 * Adapted to the flat layout: compares the sibling version folders
 * `lucca-front/<prev>/` vs `lucca-front/<curr>/` (the old layout diffed per-component version
 * subdirs, which no longer exist). Requires the predecessor's folder to be present on disk;
 * run it after all target versions have been generated.
 */

import fs from 'fs';
import path from 'path';
import { VersionConfig, VersionManifest } from '../types';
import { versionRoot } from './skill-writer';
import { resolveVersion } from '../version-config';

const SKILLS_BASE = 'lucca-front';

interface FileDiff {
	relativePath: string;
	status: 'added' | 'removed' | 'modified';
	linesBefore?: number;
	linesAfter?: number;
	inlineDiff?: string;
}

/** Finds the previous version from the manifest (highest version strictly lower than current). */
function findPreviousVersion(manifest: VersionManifest, current: VersionConfig): string | null {
	const currentKey = `${current.major}.${current.minor}.${current.patch}`;
	const sorted = Object.keys(manifest.versions)
		.filter((v) => v !== currentKey)
		.sort((a, b) => {
			const [aMaj, aMin, aPat] = a.split('.').map(Number);
			const [bMaj, bMin, bPat] = b.split('.').map(Number);
			return aMaj !== bMaj ? bMaj - aMaj : aMin !== bMin ? bMin - aMin : bPat - aPat;
		});

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
 * Normalizes content for comparison by replacing version-specific URLs with a placeholder,
 * so a file isn't reported "modified" solely because of a version number in a Storybook/ZH link.
 */
function normalizeForComparison(content: string): string {
	return content
		// Neutralize bare version tokens (e.g. "v21.2.3", "21.2.3", "18.2.0-alpha") so a file isn't
		// reported "modified" solely because its header label references the target version — this is
		// the dominant noise (every <slug>.changelog.md header + SKILL.md §1). Real content/API diffs
		// (new changelog sections, added inputs…) still show because their lines genuinely differ.
		.replace(/v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?/g, '__VER__')
		.replace(/\/v\/\d+\//g, '/v/__RELEASE__/')
		.replace(/[ \t]+$/gm, '');
}

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
	const changeIdx = ops.map((op, i) => (op.type !== 'equal' ? i : -1)).filter((i) => i !== -1);
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
		const shown = lines.filter((l) => l.startsWith('+') || l.startsWith('-')).length;
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

function countLines(filePath: string): number {
	try {
		return fs.readFileSync(filePath, 'utf-8').split('\n').length;
	} catch {
		return 0;
	}
}

/** Compares two directory trees and returns file-level diffs (relative paths from dirB). */
function diffDirectories(dirA: string, dirB: string): FileDiff[] {
	const filesA = new Set(listFiles(dirA));
	const filesB = new Set(listFiles(dirB));
	const allFiles = new Set([...filesA, ...filesB]);
	const diffs: FileDiff[] = [];

	for (const file of [...allFiles].sort()) {
		const inA = filesA.has(file);
		const inB = filesB.has(file);

		if (!inA && inB) {
			diffs.push({ relativePath: file, status: 'added', linesAfter: countLines(path.join(dirB, file)) });
		} else if (inA && !inB) {
			diffs.push({ relativePath: file, status: 'removed', linesBefore: countLines(path.join(dirA, file)) });
		} else {
			const contentA = fs.readFileSync(path.join(dirA, file), 'utf-8');
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
		}
	}

	return diffs;
}

/** Top-level group label for a relative path (components/<slug>, documentation, tools, racine…). */
function groupOf(relPath: string): string {
	const parts = relPath.split(path.sep);
	if (parts[0] === 'references') {
		if (parts[1] === 'components') return `components/${parts[2] ?? ''}`;
		return parts[1] ?? 'references';
	}
	return parts[0]; // SKILL.md, etc.
}

// ─── Rename detection ────────────────────────────────────────────────────────
//
// Most "removed" files between two versions are renames (story files renamed in the repo, a
// component slug change, a ZH section retitled): the content survives under a new path. Pairing
// them with their added counterpart de-noises the « Suppressions à vérifier » section so only
// genuine disappearances demand a human look.

interface RenameMatch {
	from: string;
	to: string;
	/** Content similarity in [0, 1] (line-based, on normalized content). */
	similarity: number;
}

/** Path reduced to lowercase alphanumerics — "components/color-picker/color-picker.md" and
 *  "components/colorpicker/colorpicker.md" collapse to the same form. */
function compactPath(relPath: string): string {
	return relPath.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Line-based content similarity: 2·LCS / (|A|+|B|), on normalized lines. */
function contentSimilarity(a: string[], b: string[]): number {
	if (a.length === 0 && b.length === 0) return 1;
	const lcs = computeLCS(a, b)[a.length][b.length];
	return (2 * lcs) / (a.length + b.length);
}

/**
 * Pairs removed files with added files that are most likely renames.
 *
 * Candidates are restricted to plausible pairs (same basename, same group — e.g. the same
 * component —, or identical compact path) to keep the comparison cheap, then matched greedily
 * by descending content similarity. A pair is accepted at ≥ 0.5 similarity (≥ 0.3 when the
 * compact paths are identical — the path itself is then strong evidence).
 */
function detectRenames(removed: FileDiff[], added: FileDiff[], prevRoot: string, currRoot: string): RenameMatch[] {
	if (removed.length === 0 || added.length === 0) return [];

	const readLines = (root: string, rel: string): string[] | null => {
		try {
			return normalizeForComparison(fs.readFileSync(path.join(root, rel), 'utf-8')).split('\n');
		} catch {
			return null;
		}
	};

	const removedLines = new Map<string, string[]>();
	for (const d of removed) {
		const lines = readLines(prevRoot, d.relativePath);
		if (lines) removedLines.set(d.relativePath, lines);
	}
	const addedLines = new Map<string, string[]>();
	for (const d of added) {
		const lines = readLines(currRoot, d.relativePath);
		if (lines) addedLines.set(d.relativePath, lines);
	}

	const candidates: RenameMatch[] = [];
	for (const [from, fromLines] of removedLines) {
		for (const [to, toLines] of addedLines) {
			const sameBase = path.basename(from) === path.basename(to);
			const sameGroup = groupOf(from) === groupOf(to);
			const compactEqual = compactPath(from) === compactPath(to);
			if (!sameBase && !sameGroup && !compactEqual) continue;

			const similarity = contentSimilarity(fromLines, toLines);
			if (similarity >= 0.5 || (compactEqual && similarity >= 0.3)) {
				candidates.push({ from, to, similarity });
			}
		}
	}

	// Greedy 1:1 matching by descending similarity.
	candidates.sort((a, b) => b.similarity - a.similarity);
	const usedFrom = new Set<string>();
	const usedTo = new Set<string>();
	const matches: RenameMatch[] = [];
	for (const c of candidates) {
		if (usedFrom.has(c.from) || usedTo.has(c.to)) continue;
		usedFrom.add(c.from);
		usedTo.add(c.to);
		matches.push(c);
	}
	return matches.sort((a, b) => a.from.localeCompare(b.from));
}

/**
 * Generates the version-level review changelog comparing this version's folder against its
 * predecessor. Returns the written path, or null if the manifest is missing.
 */
export function writeVersionChangelog(skillsDir: string, version: VersionConfig): string | null {
	const baseDir = path.resolve(skillsDir, SKILLS_BASE);
	const manifestPath = path.join(baseDir, '_versions.json');
	if (!fs.existsSync(manifestPath)) return null;

	let manifest: VersionManifest;
	try {
		manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
	} catch {
		return null;
	}

	const bareVersion = `${version.major}.${version.minor}.${version.patch}`;
	const changelogDir = path.join(baseDir, 'changelog');
	fs.mkdirSync(changelogDir, { recursive: true });
	const outPath = path.join(changelogDir, `${bareVersion}.md`);

	const prevKey = findPreviousVersion(manifest, version);
	if (!prevKey) {
		fs.writeFileSync(outPath, `# ${version.tag} — première génération\n\nAucune version précédente dans le manifeste.\n`, 'utf-8');
		return outPath;
	}

	const currRoot = versionRoot(skillsDir, version);
	const prevRoot = versionRoot(skillsDir, resolveVersion(prevKey));

	if (!fs.existsSync(prevRoot)) {
		fs.writeFileSync(
			outPath,
			`# ${version.tag} vs v${prevKey}\n\nLe dossier de la version précédente (\`${prevKey}/\`) n'est pas présent sur le disque — diff impossible. Régénère les deux versions pour obtenir le diff de review.\n`,
			'utf-8',
		);
		return outPath;
	}

	// Exclude per-component changelog files from the review diff: they are derived/cumulative
	// artifacts (a real API change already shows in <slug>.md), and they carry their own noise
	// (version label in the header, non-deterministic ZH prose layer). Reviewing them here is
	// redundant and misleading.
	const diffs = diffDirectories(prevRoot, currRoot).filter((d) => !d.relativePath.endsWith('.changelog.md'));

	let md = `# ${version.tag} vs v${prevKey}\n\n`;
	md += `> Aide à la review (non consommé par la skill) : diff des fichiers générés entre les deux versions.\n\n`;

	if (diffs.length === 0) {
		md += `Aucune différence détectée.\n`;
		fs.writeFileSync(outPath, md, 'utf-8');
		return outPath;
	}

	const added = diffs.filter((d) => d.status === 'added');
	const removed = diffs.filter((d) => d.status === 'removed');
	const modified = diffs.filter((d) => d.status === 'modified');
	md += `**Résumé** : ${added.length} ajouté(s), ${modified.length} modifié(s), ${removed.length} supprimé(s)\n\n`;

	// Deletions deserve a dedicated look: an addition between two versions is the normal case, a
	// removal is either a real cleanup or the symptom of a partial fetch. Renames (a removal whose
	// content survives under an added path) are paired first and listed apart — only the genuine
	// disappearances and ZH-sourced content (design/, documentation/) that shrank remain to check.
	const renames = detectRenames(removed, added, prevRoot, currRoot);
	const renamedFrom = new Set(renames.map((r) => r.from));
	const trulyRemoved = removed.filter((d) => !renamedFrom.has(d.relativePath));
	const shrunken = modified.filter(
		(d) =>
			(d.relativePath.includes(`${path.sep}design${path.sep}`) || d.relativePath.includes(`${path.sep}documentation${path.sep}`)) &&
			(d.linesAfter ?? 0) < (d.linesBefore ?? 0),
	);
	if (trulyRemoved.length > 0 || shrunken.length > 0) {
		md += `## ⚠️ Suppressions à vérifier\n\n`;
		md += `> Une suppression peut être légitime, mais elle est moins courante qu'un ajout — vérifier qu'elle ne trahit pas un fetch partiel.\n\n`;
		for (const d of trulyRemoved) {
			md += `- ➖ \`${d.relativePath}\` supprimé (${d.linesBefore} lignes)\n`;
		}
		for (const d of shrunken) {
			md += `- 📉 \`${d.relativePath}\` réduit (${d.linesBefore} → ${d.linesAfter} lignes)\n`;
		}
		md += '\n';
	}
	if (renames.length > 0) {
		md += `## 🔁 Renommages détectés\n\n`;
		md += `> Suppressions appariées à un ajout au contenu quasi identique — pas de perte de contenu.\n\n`;
		for (const r of renames) {
			md += `- \`${r.from}\` → \`${r.to}\` (similarité ${Math.round(r.similarity * 100)} %)\n`;
		}
		md += '\n';
	}

	// Group by top-level area for readability.
	const groups = new Map<string, FileDiff[]>();
	for (const d of diffs) {
		const g = groupOf(d.relativePath);
		if (!groups.has(g)) groups.set(g, []);
		groups.get(g)!.push(d);
	}

	for (const g of [...groups.keys()].sort()) {
		md += `## ${g}\n\n`;
		for (const d of groups.get(g)!) {
			if (d.status === 'added') {
				md += `- ➕ \`${d.relativePath}\` (${d.linesAfter} lignes)\n`;
			} else if (d.status === 'removed') {
				md += `- ➖ \`${d.relativePath}\` (${d.linesBefore} lignes)\n`;
			} else {
				const delta = (d.linesAfter ?? 0) - (d.linesBefore ?? 0);
				const sign = delta >= 0 ? '+' : '';
				md += `- 🔄 \`${d.relativePath}\` (${d.linesBefore} → ${d.linesAfter}, ${sign}${delta})\n`;
				if (d.inlineDiff) {
					md += `\n  \`\`\`\`diff\n`;
					for (const line of d.inlineDiff.split('\n')) md += `  ${line}\n`;
					md += `  \`\`\`\`\n\n`;
				}
			}
		}
		md += '\n';
	}

	fs.writeFileSync(outPath, md, 'utf-8');
	return outPath;
}
