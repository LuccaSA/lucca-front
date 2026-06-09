/**
 * Aggregate "all versions" skill writer.
 *
 * Assembles `lucca-front/lucca-front-all/` — a single skill bundling every generated version's
 * `references/` tree under `references/<version>/`, plus **one** router `SKILL.md` at the root that:
 *   1. detects the project's @lucca-front/ng version (node_modules, then package.json),
 *   2. composes paths into the matching `references/<version>/…` subtree (as the legacy skill did).
 *
 * Only each version's `references/` is copied — **not** its per-version SKILL.md. A single
 * description lives at the root, so nothing duplicates or competes in the agent's skill list.
 *
 * Two distribution targets, one source tree:
 *   - global (machine-wide) install → install `lucca-front-all`, any repo gets its right version;
 *   - per-repo install → install one/two `lucca-front-<M>-<m>-<p>` directly (leaner fetch).
 *
 * The whole `references/` subtree is moved as a block, so intra-references relative links
 * (e.g. a component's `../../types/<Type>.md`) stay valid under `references/<version>/`.
 */

import fs from 'fs';
import path from 'path';
import { DocumentationMap, VersionConfig } from '../types';
import { versionRoot } from './skill-writer';

const SKILLS_BASE = 'lucca-front';
const AGGREGATE_NAME = 'lucca-front-all';

/** Dotted version key used as the references subfolder (not an APM leaf → dots are fine). */
function dotted(v: VersionConfig): string {
	return `${v.major}.${v.minor}.${v.patch}`;
}

/**
 * Builds the aggregate skill from the per-version folders already on disk.
 * Returns the SKILL.md path and the number of bundled versions.
 */
export function writeAggregateSkill(skillsDir: string, versions: VersionConfig[]): { skillPath: string; versionCount: number } {
	const base = path.resolve(skillsDir, SKILLS_BASE);
	const aggRoot = path.join(base, AGGREGATE_NAME);

	// Fresh assembly: drop any stale copy so removed versions don't linger.
	fs.rmSync(aggRoot, { recursive: true, force: true });
	fs.mkdirSync(path.join(aggRoot, 'references'), { recursive: true });

	// Newest-first, deduped, only versions whose folder actually exists on disk.
	const bundled = [...versions]
		.sort((a, b) => (a.major !== b.major ? b.major - a.major : a.minor !== b.minor ? b.minor - a.minor : b.patch - a.patch))
		.filter((v, i, arr) => arr.findIndex((x) => x.major === v.major && x.minor === v.minor && x.patch === v.patch) === i)
		.filter((v) => fs.existsSync(path.join(versionRoot(skillsDir, v), 'references')));

	for (const v of bundled) {
		const srcRefs = path.join(versionRoot(skillsDir, v), 'references');
		const destRefs = path.join(aggRoot, 'references', dotted(v));
		// Copy only references/ — the per-version SKILL.md is intentionally left behind.
		fs.cpSync(srcRefs, destRefs, { recursive: true });
	}

	const componentSlugs = unionComponentSlugs(aggRoot, bundled);
	const docLines = renderDocLines();

	const skillPath = path.join(aggRoot, 'SKILL.md');
	fs.writeFileSync(skillPath, renderRouter(bundled, componentSlugs, docLines), 'utf-8');

	return { skillPath, versionCount: bundled.length };
}

/** Union of component slugs across all bundled versions (a slug counts if it has `<slug>.md`). */
function unionComponentSlugs(aggRoot: string, versions: VersionConfig[]): string[] {
	const slugs = new Set<string>();
	for (const v of versions) {
		const compDir = path.join(aggRoot, 'references', dotted(v), 'components');
		if (!fs.existsSync(compDir)) continue;
		for (const d of fs.readdirSync(compDir, { withFileTypes: true })) {
			if (d.isDirectory() && fs.existsSync(path.join(compDir, d.name, `${d.name}.md`))) {
				slugs.add(d.name);
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

function renderRouter(versions: VersionConfig[], componentSlugs: string[], docLines: string): string {
	const available = versions.map((v) => dotted(v)).join(', ');
	const newest = versions[0] ? dotted(versions[0]) : '21.2.4';
	const componentList = componentSlugs.map((s) => `- ${s}`).join('\n') + '\n';

	return `---
name: ${AGGREGATE_NAME}
description: >
  Design system Lucca Front / Prisme (Angular) — toutes versions. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front (toutes versions)

**RÈGLE** : Avant toute génération ou modification de code impliquant \`lu-*\`, \`luX\` ou \`pr-*\`, détecte la version du projet (§1) puis consulte la documentation **de cette version**. Sans cette consultation, toute réponse est invalide.

## 1. Version

1. Lis la version de \`@lucca-front/ng\` installée :
   - en priorité \`node_modules/@lucca-front/ng/package.json\` → champ \`version\` (version résolue exacte) ;
   - à défaut, la dépendance \`@lucca-front/ng\` (ou \`@lucca-front/scss\`) dans le \`package.json\` du projet (ex: \`^21.2.1\` → \`21.2.1\`).
2. Le segment de version est ce numéro (ex: \`21.2.1\`). Tous les chemins ci-dessous en dépendent.
3. Si la version exacte est absente de la liste, prends le **plus haut patch disponible ≤** la version installée, **dans la même mineure**.

**Versions disponibles** : ${available || '(aucune)'}

Si la version ne peut pas être déterminée → **s'arrêter et demander à l'utilisateur**. Ne jamais supposer une version par défaut.

## 2. Chemins

Compose le chemin à partir du slug du composant et de la version détectée (\`<version>\` = ex: \`21.2.1\`).
**Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, vérifie le slug (§6) et la version (§1) — un composant peut ne pas exister dans toutes les versions.

### Composant \`<slug>\`

| Fichier | Chemin |
|---------|--------|
| API Angular | \`./references/<version>/components/<slug>/<slug>.md\` |
| Exemples (Angular + HTML) | \`./references/<version>/components/<slug>/<slug>.component.md\` |
| Design (do/don't, usage) | \`./references/<version>/components/<slug>/design/_index.md\` |
| Figma (variantes, node IDs) | \`./references/<version>/components/<slug>/<slug>.figma.md\` |
| Changelog | \`./references/<version>/components/<slug>/<slug>.changelog.md\` |

### Types partagés

Certaines propriétés d'API référencent un type énuméré documenté à part (ex: \`LuccaIcon\`, \`BubbleIllustration\`) :

\`./references/<version>/types/<TypeName>.md\`

Le lien exact (nom et chemin du type) est donné dans la section « Type definitions » du fichier API du composant. Tous les composants n'ont pas de types partagés.

### Documentation transverse

\`./references/<version>/documentation/<dossier>/<slug>.md\`

### Outils

\`./references/<version>/tools/<slug>.md\`
Slugs : animations, mixins, numbers, scrollbox, utilitaires

### Migrations (montée de version)

\`./references/<version>/migrations.md\` — codemods de migration (\`ng generate @lucca-front/ng:<nom>\`) cumulatifs jusqu'à cette version, avec leur version d'introduction.

### Exemple

Projet en \`${newest}\`, bouton → API : \`./references/${newest}/components/button/button.md\`, Figma : \`./references/${newest}/components/button/button.figma.md\`

## 3. Quand consulter quoi

| Cas d'usage | Consulter |
|-------------|-----------|
| Écrire du code Angular | API (.md) → Exemples (.component.md) → Changelog |
| Intégrer depuis maquette Figma | Figma (.figma.md) → Tokens → Guidelines dev UI |
| Créer une maquette Figma (Code → Figma) | Figma (.figma.md) → Design (design/_index.md) |
| Review de code | API → Guidelines dev UI → Contenu (si textes) → Patterns (si UX) |
| Conventions de rédaction | Contenu (dossier \`content/\`) |
| Design patterns | Patterns (dossier \`patterns/\`) |
| Tokens CSS | Tokens (dossier \`tokens/\`) |
| Mixins / animations SCSS | Outils (dossier \`tools/\`) |
| Composant déprécié | \`./references/<version>/documentation/deprecated/deprecated.md\` |
| Monter de version | \`./references/<version>/migrations.md\` + le \`<slug>.changelog.md\` de chaque composant touché |

## 4. Workflow Code

1. Détecte la version (§1).
2. Lis l'API du composant (\`<slug>.md\`) — selectors, inputs, types exacts.
3. Consulte les exemples (\`<slug>.component.md\`).
4. Vérifie le changelog si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le \`.md\` fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (\`<slug>.figma.md\`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → \`design/_index.md\`.

⚠️ Les \`.figma.md\` reflètent l'état actuel de Figma.

## 6. Composants

Liste consolidée toutes versions. Un composant peut ne pas exister dans la version détectée — seul le fichier réellement présent fait foi (§2).

${componentList}## 7. Documentation transverse

${docLines || '_(aucune documentation générée)_'}## 8. Composants dépréciés

Consulte \`./references/<version>/documentation/deprecated/deprecated.md\` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
`;
}
