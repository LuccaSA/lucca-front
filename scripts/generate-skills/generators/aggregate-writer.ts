/**
 * Aggregate "all versions" skill writer — one content folder per MAJOR.
 *
 * Assembles `lucca-front/lucca-front-all/` for machine-wide installs (several repos on different
 * versions). Layout per major:
 *
 * lucca-front-all/
 * ├── SKILL.md                      ← single router: detects the project's version
 * └── references/
 *     └── <major>/                  e.g. 21/
 *         ├── components/ documentation/ tools/ types/ migrations.md
 *         │                         ← BASE = full references/ of the major's NEWEST minor
 *         ├── fixes/                ← the base minor's per-patch fixes
 *         └── minors/<M-m>/         ← OVERRIDES for each OLDER minor:
 *             ├── _manifest.md      ← latest patch, URL rule, components added/removed later
 *             ├── fixes/            ← that minor's per-patch fixes
 *             └── …                 ← full files at the minor's state, ONLY where they differ
 *                                     substantially from the base (versioned URLs normalized)
 *
 * Override principle (fidelity first): an agent on an older minor always reads EXACT content for
 * its version — the override file if present, the base file otherwise. No diff reconstruction.
 *
 * Excluded from overrides (cumulative supersets, entries labeled per version — the base file
 * covers the older minor's content in full): `migrations.md`, and the trailing `## Changelog`
 * section of component API files (`components/<slug>/<slug>.md`), which is stripped from both
 * sides before comparison. The router instructs to ignore entries newer than the project's
 * version. An API override, when produced, still carries its full file — changelog included,
 * frozen at the minor's state.
 *
 * Only versioned Storybook URLs are normalized before comparison (decided 2026-07-10): any other
 * difference — typography included — is substantial and produces an override.
 */

import fs from 'fs';
import path from 'path';
import { DocumentationMap } from '../types';
import { MinorResolution, technicalMinorsCoveredBy } from '../version-config';
import { versionRoot } from './skill-writer';

const SKILLS_BASE = 'lucca-front';
const AGGREGATE_NAME = 'lucca-front-all';

/**
 * Lists the minor strings ("21.2") whose per-minor skill folder exists on disk.
 * Used to rebuild the aggregate from whatever is present (e.g. after a replay run that
 * only touched a subset of minors).
 */
export function listGeneratedVersionStrings(skillsDir: string): string[] {
	const base = path.resolve(skillsDir, SKILLS_BASE);
	if (!fs.existsSync(base)) return [];
	const out: string[] = [];
	for (const d of fs.readdirSync(base, { withFileTypes: true })) {
		const m = d.isDirectory() && d.name.match(/^lucca-front-(\d+)-(\d+)$/);
		if (m) out.push(`${m[1]}.${m[2]}`);
	}
	return out.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** Normalizes patch-versioned Storybook URLs so they don't count as a substantial difference. */
function normalizeVersionedUrls(content: string): string {
	return content.replace(/lucca-front\.lucca\.io\/v\d+\.\d+\.\d+\//g, 'lucca-front.lucca.io/vX/');
}

/** Cumulative-superset files: fully covered by the base's copy (entries labeled per version). */
function isCumulativeSuperset(relPath: string): boolean {
	return relPath === 'migrations.md';
}

/** Whether `relPath` is a component API file (components/<slug>/<slug>.md). */
function isComponentApiFile(relPath: string): boolean {
	const m = relPath.match(/^components\/([^/]+)\/([^/]+)\.md$/);
	return !!m && m[1] === m[2];
}

/**
 * Strips the trailing `## Changelog` section of a component API file — cumulative content
 * (entries labeled per version) that must not count as a substantial difference.
 */
function stripTrailingChangelog(content: string): string {
	const idx = content.indexOf('\n## Changelog\n');
	return idx === -1 ? content : content.slice(0, idx);
}

/** Recursively lists file paths (relative) under `dir`. */
function walkFiles(dir: string, prefix = ''): string[] {
	const out: string[] = [];
	for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
		const rel = prefix ? `${prefix}/${d.name}` : d.name;
		if (d.isDirectory()) out.push(...walkFiles(path.join(dir, d.name), rel));
		else out.push(rel);
	}
	return out;
}

/**
 * Builds the aggregate skill from the per-minor folders already on disk.
 * Returns the SKILL.md path and the number of bundled minors.
 */
export function writeAggregateSkill(skillsDir: string, minors: MinorResolution[]): { skillPath: string; versionCount: number } {
	const base = path.resolve(skillsDir, SKILLS_BASE);
	const aggRoot = path.join(base, AGGREGATE_NAME);

	// Fresh assembly: drop any stale copy so removed minors don't linger.
	fs.rmSync(aggRoot, { recursive: true, force: true });
	fs.mkdirSync(path.join(aggRoot, 'references'), { recursive: true });

	// Newest-first, deduped, only minors whose folder actually exists on disk.
	const bundled = [...minors]
		.sort((a, b) => (a.version.major !== b.version.major ? b.version.major - a.version.major : b.version.minor - a.version.minor))
		.filter((m, i, arr) => arr.findIndex((x) => x.minorKey === m.minorKey) === i)
		.filter((m) => fs.existsSync(path.join(versionRoot(skillsDir, m.version), 'references')));

	// Group by major, newest minor first inside each group.
	const byMajor = new Map<number, MinorResolution[]>();
	for (const m of bundled) {
		const list = byMajor.get(m.version.major) ?? [];
		list.push(m);
		byMajor.set(m.version.major, list);
	}

	const majorInfos: MajorInfo[] = [];
	for (const [major, group] of byMajor) {
		majorInfos.push(writeMajor(skillsDir, aggRoot, major, group));
	}
	majorInfos.sort((a, b) => b.major - a.major);

	const componentSlugs = unionComponentSlugs(aggRoot, majorInfos);
	const docLines = renderDocLines();

	const skillPath = path.join(aggRoot, 'SKILL.md');
	fs.writeFileSync(skillPath, renderRouter(majorInfos, componentSlugs, docLines), 'utf-8');

	return { skillPath, versionCount: bundled.length };
}

interface MajorInfo {
	major: number;
	/** Newest minor of the major — the base content of references/<major>/. */
	baseMinor: MinorResolution;
	/** Older minors, newest first — each has an override folder minors/<M-m>/. */
	olderMinors: MinorResolution[];
}

/** Assembles references/<major>/ : base minor in full + one override folder per older minor. */
function writeMajor(skillsDir: string, aggRoot: string, major: number, group: MinorResolution[]): MajorInfo {
	const [baseMinor, ...olderMinors] = group; // group is newest-first
	const majorDir = path.join(aggRoot, 'references', String(major));

	// Base = the newest minor's references, copied as a block (intra-references links stay valid).
	const baseRefs = path.join(versionRoot(skillsDir, baseMinor.version), 'references');
	fs.cpSync(baseRefs, majorDir, { recursive: true });

	// Base minor's fixes.
	const baseFixes = path.join(versionRoot(skillsDir, baseMinor.version), 'fixes');
	if (fs.existsSync(baseFixes)) fs.cpSync(baseFixes, path.join(majorDir, 'fixes'), { recursive: true });

	// Older minors → override folders.
	const baseFiles = new Set(walkFiles(majorDir));
	for (const minor of olderMinors) {
		const minorRefs = path.join(versionRoot(skillsDir, minor.version), 'references');
		const overrideDir = path.join(majorDir, 'minors', minor.minorKey.replace(/\./g, '-'));

		let overrideCount = 0;
		const removedLater: string[] = [];
		for (const rel of walkFiles(minorRefs)) {
			if (isCumulativeSuperset(rel)) continue; // base copy covers it in full

			const minorFile = path.join(minorRefs, rel);
			const baseFile = path.join(majorDir, rel);
			if (!baseFiles.has(rel)) {
				// Present in this minor, absent from the base → removed in a later minor. Keep in full.
				removedLater.push(rel);
			} else {
				let a = normalizeVersionedUrls(fs.readFileSync(minorFile, 'utf-8'));
				let b = normalizeVersionedUrls(fs.readFileSync(baseFile, 'utf-8'));
				if (isComponentApiFile(rel)) {
					a = stripTrailingChangelog(a);
					b = stripTrailingChangelog(b);
				}
				if (a === b) continue;
			}
			fs.mkdirSync(path.dirname(path.join(overrideDir, rel)), { recursive: true });
			fs.copyFileSync(minorFile, path.join(overrideDir, rel));
			overrideCount++;
		}

		// This minor's fixes.
		const minorFixes = path.join(versionRoot(skillsDir, minor.version), 'fixes');
		if (fs.existsSync(minorFixes)) fs.cpSync(minorFixes, path.join(overrideDir, 'fixes'), { recursive: true });

		// Components added after this minor = component dirs in base, absent from the minor.
		const addedLater = listComponentDirs(majorDir).filter((slug) => !fs.existsSync(path.join(minorRefs, 'components', slug)));

		fs.mkdirSync(overrideDir, { recursive: true });
		fs.writeFileSync(
			path.join(overrideDir, '_manifest.md'),
			renderMinorManifest(minor, baseMinor, overrideCount, addedLater, removedLater),
			'utf-8',
		);
	}

	return { major, baseMinor, olderMinors };
}

function listComponentDirs(majorDir: string): string[] {
	const compDir = path.join(majorDir, 'components');
	if (!fs.existsSync(compDir)) return [];
	return fs
		.readdirSync(compDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.sort((a, b) => a.localeCompare(b));
}

function renderMinorManifest(
	minor: MinorResolution,
	baseMinor: MinorResolution,
	overrideCount: number,
	addedLater: string[],
	removedLater: string[],
): string {
	const latestPatch = minor.version.tag.replace(/^v/, '');
	const basePatch = baseMinor.version.tag.replace(/^v/, '');

	let md = `# Overrides ${minor.minorKey} (vs base ${baseMinor.minorKey})\n\n`;
	md += `- **Dernier patch publié de cette mineure** : \`${latestPatch}\` (patchs : ${minor.patchTags.map((t) => t.replace(/^v/, '')).join(', ')})\n`;
	md += `- **Storybook exact** : https://lucca-front.lucca.io/${minor.version.tag}/storybook\n`;
	md += `- **Fichiers overrides** : ${overrideCount} — pour tout chemin, lire d'abord ce dossier, sinon la base \`../../\`.\n`;
	md += `- **Règle URL** : dans les fichiers lus depuis la base, remplacer \`v${basePatch}\` par \`v${latestPatch}\` dans les URLs Storybook.\n`;
	md += `- **Changelogs & migrations** : lire la section \`## Changelog\` du \`<slug>.md\` de la **base** et le \`migrations.md\` de la base (cumulatifs, entrées étiquetées par version) en **ignorant les entrées postérieures à \`${latestPatch}\`**.\n`;

	if (addedLater.length > 0) {
		md += `\n## Composants absents de ${minor.minorKey} (ajoutés dans une mineure ultérieure — ne pas utiliser)\n\n`;
		md += addedLater.map((s) => `- ${s}`).join('\n') + '\n';
	}
	if (removedLater.length > 0) {
		md += `\n## Fichiers retirés après ${minor.minorKey} (présents ici en intégralité)\n\n`;
		md += removedLater.map((s) => `- ${s}`).join('\n') + '\n';
	}
	return md;
}

/** Union of component slugs: every major's base components + override component dirs. */
function unionComponentSlugs(aggRoot: string, majorInfos: MajorInfo[]): string[] {
	const slugs = new Set<string>();
	for (const info of majorInfos) {
		const majorDir = path.join(aggRoot, 'references', String(info.major));
		for (const slug of listComponentDirs(majorDir)) slugs.add(slug);
		const minorsDir = path.join(majorDir, 'minors');
		if (!fs.existsSync(minorsDir)) continue;
		for (const d of fs.readdirSync(minorsDir, { withFileTypes: true })) {
			if (!d.isDirectory()) continue;
			const compDir = path.join(minorsDir, d.name, 'components');
			if (!fs.existsSync(compDir)) continue;
			for (const c of fs.readdirSync(compDir, { withFileTypes: true })) {
				if (c.isDirectory()) slugs.add(c.name);
			}
		}
	}
	return [...slugs].sort((a, b) => a.localeCompare(b));
}

/** Transverse documentation listing (§7), sourced from documentation-map.json (version-independent). */
function renderDocLines(): string {
	const docMapPath = path.join(__dirname, '..', 'documentation-map.json');
	let docMap: DocumentationMap | null = null;
	if (fs.existsSync(docMapPath)) {
		try {
			docMap = JSON.parse(fs.readFileSync(docMapPath, 'utf-8')) as DocumentationMap;
		} catch {
			docMap = null;
		}
	}
	if (!docMap) return '';

	const config: { key: keyof DocumentationMap; label: string; folder: string }[] = [
		{ key: 'tokens', label: 'Tokens', folder: 'tokens' },
		{ key: 'content', label: 'Contenu & Rédaction', folder: 'content' },
		{ key: 'guidelines', label: 'Guidelines', folder: 'guidelines' },
		{ key: 'patterns', label: 'Design Patterns', folder: 'patterns' },
	];

	let out = '';
	for (const { key, label, folder } of config) {
		const entries = docMap[key];
		if (!entries || entries.length === 0) continue;
		const items = entries.map((e) => `${e.title} (\`${e.slug}\`)`).join(', ');
		out += `- **${label}** (dossier \`${folder}/\`) : ${items}\n`;
	}
	return out;
}

function renderRouter(majorInfos: MajorInfo[], componentSlugs: string[], docLines: string): string {
	const componentList = componentSlugs.map((s) => `- ${s}`).join('\n') + '\n';

	const availableLines = majorInfos
		.map((info) => {
			const older = info.olderMinors.map((m) => `${m.minorKey} → \`minors/${m.minorKey.replace(/\./g, '-')}/\``).join(', ');
			// Technical minors (framework-compat releases, no content of their own) covered by one
			// of this major's documented minors — resolved as their covering minor, patch .0 only.
			const techs = [info.baseMinor, ...info.olderMinors]
				.flatMap((m) => technicalMinorsCoveredBy(m.minorKey).map((t) => `${t.minorKey} (${t.reason}) → lire comme ${t.coveredBy}, patch \`.0\` uniquement`))
				.join(', ');
			return `- **Majeure ${info.major}** (\`./references/${info.major}/\`) : base = ${info.baseMinor.minorKey} (contenu du patch ${info.baseMinor.version.tag.replace(/^v/, '')})${older ? ` ; overrides : ${older}` : ''}${techs ? ` ; mineures techniques : ${techs}` : ''}`;
		})
		.join('\n');
	const hasTechMinors = majorInfos.some((info) => [info.baseMinor, ...info.olderMinors].some((m) => technicalMinorsCoveredBy(m.minorKey).length > 0));

	const newestInfo = majorInfos[0];
	const exMajor = newestInfo ? String(newestInfo.major) : '21';
	const exOlder = newestInfo?.olderMinors[0];

	return `---
name: ${AGGREGATE_NAME}
description: >
  Design system Lucca Front / Prisme (Angular) — toutes versions. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front (toutes versions)

**RÈGLE** : Avant toute génération ou modification de code impliquant \`lu-*\`, \`luX\` ou \`pr-*\`, détecte la version du projet (§1) puis consulte la documentation **de cette version** en suivant la résolution §2. Sans cette consultation, toute réponse est invalide.

## 1. Version

1. Lis la version de \`@lucca-front/ng\` installée :
   - en priorité \`node_modules/@lucca-front/ng/package.json\` → champ \`version\` (version résolue exacte, ex: \`21.2.1\`) ;
   - à défaut, la dépendance \`@lucca-front/ng\` (ou \`@lucca-front/scss\`) dans le \`package.json\` du projet (ex: \`^21.2.1\` → \`21.2.1\`).
2. Décompose : **majeure** (\`21\`), **mineure** (\`21.2\`), **patch** (\`21.2.1\`).

${availableLines || '- (aucune version générée)'}

Si la version ne peut pas être déterminée → **s'arrêter et demander à l'utilisateur**. Ne jamais supposer une version par défaut.

**Contrôle de cohérence (anti-péremption).** La version détectée doit être couverte par la liste ci-dessus. Dans chacun de ces cas, **arrête-toi et demande à l'utilisateur** — ne suppose jamais, ne code pas :

- la **majeure** détectée n'apparaît pas ci-dessus (ex: projet monté en majeure supérieure alors que la skill n'a pas été mise à jour) ;
- la **mineure** détectée est plus récente que la base de sa majeure${hasTechMinors ? ' **et** n\'est pas une mineure technique listée ci-dessus' : ''} (mineure publiée après cette skill → non documentée) ;
- le **patch** détecté est **postérieur** au dernier patch connu de sa mineure (le dernier patch de la base est indiqué ci-dessus ; celui d'une mineure antérieure dans son \`_manifest.md\`${hasTechMinors ? ' ; \`.0\` pour une mineure technique' : ''} → skill périmée, l'API réelle peut différer).

## 2. Résolution des chemins

Le dossier \`./references/<majeure>/\` contient la documentation complète de la **base** (la mineure la plus récente de la majeure). Les mineures antérieures sont des dossiers d'**overrides** : \`./references/<majeure>/minors/<M-m>/\`.

### Projet sur la mineure de base

Lis directement \`./references/<majeure>/<chemin>\` (table des chemins §3).

### Projet sur une mineure antérieure

1. Lis \`./references/<majeure>/minors/<M-m>/_manifest.md\` (dernier patch de la mineure, règle URL, composants à ne pas utiliser).
2. Pour **chaque fichier** : lis d'abord \`./references/<majeure>/minors/<M-m>/<chemin>\` ; s'il n'existe pas, lis \`./references/<majeure>/<chemin>\` (contenu identique pour cette mineure, aux URLs Storybook près — appliquer la règle URL du manifeste).
3. **Changelog et migrations** : la section \`## Changelog\` (fin du \`<slug>.md\`) et \`migrations.md\` sont cumulatifs, entrées étiquetées par version — pour l'historique complet, lis toujours ceux de la **base** et **ignore les entrées postérieures à la version du projet**.
4. **Ne jamais utiliser** un composant listé « absent de cette mineure » dans le manifeste.

### Patch antérieur au dernier patch de la mineure

La doc reflète le **dernier patch publié** de la mineure. Si le patch du projet est antérieur, les correctifs livrés entre les deux sont décrits dans \`fixes/<M-m-p>.md\` (dans \`./references/<majeure>/fixes/\` pour la base, dans \`minors/<M-m>/fixes/\` pour une mineure antérieure) — ils ne sont **pas** dans le code du projet.
${
	hasTechMinors
		? `
### Projet sur une mineure technique

Une mineure listée « technique » en §1 est une release de pure compatibilité framework : aucun changement d'API, de codemod ni de documentation. Traite le projet **comme s'il était sur sa mineure de couverture** et applique la résolution ci-dessus (ex: projet en \`21.4.0\` → documentation de \`21.3\`). **Seul le patch \`.0\` est couvert** — un patch ultérieur → arrête-toi et demande à l'utilisateur.
`
		: ''
}

## 3. Chemins (relatifs à \`./references/<majeure>/\` ou à \`minors/<M-m>/\` selon §2)

| Fichier | Chemin |
|---------|--------|
| API Angular + Changelog (section \`## Changelog\` en fin de fichier) | \`components/<slug>/<slug>.md\` |
| Exemples (Angular + HTML, stories incluses) | \`components/<slug>/<slug>.component.md\` |
| Design (do/don't, usage) | \`components/<slug>/<slug>.design.md\` |
| Figma (variantes, node IDs) | \`components/<slug>/<slug>.figma.md\` |
| Types partagés | \`types/<TypeName>.md\` |
| Documentation transverse | \`documentation/<dossier>/<slug>.md\` |
| Outils | \`tools/<slug>.md\` (animations, mixins, numbers, scrollbox, utilitaires, angular-api) |
| Migrations | \`migrations.md\` |
| Correctifs de patch | \`fixes/<M-m-p>.md\` |

**Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, vérifie le slug (§6) et la résolution (§2) — un composant peut ne pas exister dans toutes les versions.

### Exemple

${exOlder ? `Projet en \`${exOlder.version.tag.replace(/^v/, '')}\` (mineure ${exOlder.minorKey}, base = ${newestInfo.baseMinor.minorKey}), bouton → \`./references/${exMajor}/minors/${exOlder.minorKey.replace(/\./g, '-')}/components/button/button.md\` s'il existe, sinon \`./references/${exMajor}/components/button/button.md\`.` : `Projet en \`${newestInfo ? newestInfo.baseMinor.version.tag.replace(/^v/, '') : '21.3.0'}\`, bouton → \`./references/${exMajor}/components/button/button.md\`.`}

## 4. Quand consulter quoi

| Cas d'usage | Consulter |
|-------------|-----------|
| Écrire du code Angular | API (.md) → Exemples (.component.md) → section \`## Changelog\` du .md |
| Intégrer depuis maquette Figma | Figma (.figma.md) → Tokens → Guidelines dev UI |
| Créer une maquette Figma (Code → Figma) | Figma (.figma.md) → Design (\`<slug>.design.md\`) |
| Review de code | API → Guidelines dev UI → Contenu (si textes) → Patterns (si UX) |
| Conventions de rédaction | Contenu (dossier \`content/\`) |
| Design patterns | Patterns (dossier \`patterns/\`) |
| Tokens CSS | Tokens (dossier \`tokens/\`) |
| Mixins / animations SCSS | Outils (dossier \`tools/\`) |
| Composant déprécié | \`documentation/deprecated/deprecated.md\` |
| Monter de version | \`migrations.md\` + la section \`## Changelog\` du \`<slug>.md\` de chaque composant touché (celui de la base, cf. §2) |
| Projet sur un patch antérieur au dernier de sa mineure | \`fixes/<M-m-p>.md\` |

## 5. Workflows

**Code** : détecte la version (§1) → résous les chemins (§2) → API (\`<slug>.md\`) → exemples (\`<slug>.component.md\`, chaque story est une section \`###\`) → section \`## Changelog\` si comportement inattendu.
⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le \`.md\` fait foi.

**Code → Figma** : \`<slug>.figma.md\` (variantes, node IDs — utilise les noms **Figma**, pas Angular) → \`<slug>.design.md\` pour les guidelines visuelles.
⚠️ Les \`.figma.md\` reflètent l'état actuel de Figma.

## 6. Composants

Liste consolidée toutes versions. Un composant peut ne pas exister dans la version détectée — seul le fichier réellement présent fait foi (§2).

${componentList}## 7. Documentation transverse

${docLines || '_(aucune documentation générée)_'}## 8. Composants dépréciés

Consulte \`documentation/deprecated/deprecated.md\` (résolution §2) avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
`;
}
