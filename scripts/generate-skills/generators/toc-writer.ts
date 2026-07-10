import fs from 'fs';
import path from 'path';
import { DocumentationMap, VersionConfig } from '../types';
import { versionRoot, versionFolder } from './skill-writer';

/**
 * Writes the per-minor SKILL.md — the entry point of a single self-contained minor skill.
 *
 * Output: lucca-front/lucca-front-<M>-<m>/SKILL.md
 *
 * The minor is implicit (one minor per installed skill): no package.json detection, no version
 * guardrail. references/ documents the minor's LATEST published patch; fixes/ carries the
 * per-patch deltas. All paths are flat and relative to this folder. The component list (§6) is
 * sourced from the generated folders on disk — the single source of truth, so every listed slug
 * is a navigable path.
 */
export function writeToc(skillsDir: string, version: VersionConfig, patchTags: string[]): string {
	const root = versionRoot(skillsDir, version);
	const minorVersion = `${version.major}.${version.minor}`;
	const latestPatch = `${version.major}.${version.minor}.${version.patch}`;
	const skillName = versionFolder(version);
	const patchList = patchTags.map((t) => t.replace(/^v/, ''));
	const fixPatches = patchList.slice(1); // every published patch > x.y.0 has a fix file

	// ── Build component list: flat, alphabetical, sourced from generated folders ──
	const componentsDir = path.join(root, 'references', 'components');
	let componentSlugs: string[] = [];
	if (fs.existsSync(componentsDir)) {
		componentSlugs = fs
			.readdirSync(componentsDir, { withFileTypes: true })
			.filter((d) => d.isDirectory())
			.filter((d) => fs.existsSync(path.join(componentsDir, d.name, `${d.name}.md`)))
			.map((d) => d.name)
			.sort((a, b) => a.localeCompare(b));
	}
	const compactComponentLines = componentSlugs.map((slug) => `- ${slug}`).join('\n') + '\n';

	// ── Load documentation map (category listing, version-independent) ──────────
	const docMapPath = path.join(__dirname, '..', 'documentation-map.json');
	let docMap: DocumentationMap | null = null;
	if (fs.existsSync(docMapPath)) {
		try {
			docMap = JSON.parse(fs.readFileSync(docMapPath, 'utf-8')) as DocumentationMap;
		} catch {
			// ignore
		}
	}

	const docCategoryConfig: { key: keyof DocumentationMap; label: string; folder: string }[] = [
		{ key: 'tokens', label: 'Tokens', folder: 'tokens' },
		{ key: 'content', label: 'Contenu & Rédaction', folder: 'content' },
		{ key: 'guidelines', label: 'Guidelines', folder: 'guidelines' },
		{ key: 'patterns', label: 'Design Patterns', folder: 'patterns' },
	];

	let compactDocLines = '';
	if (docMap) {
		for (const { key, label, folder } of docCategoryConfig) {
			const entries = docMap[key];
			if (!entries || entries.length === 0) continue;
			const items = entries.map((e) => `${e.title} (\`${e.slug}\`)`).join(', ');
			compactDocLines += `- **${label}** (dossier \`${folder}/\`) : ${items}\n`;
		}
	}

	// ── Build the SKILL.md content ─────────────────────────────────────────

	const content = `---
name: ${skillName}
description: >
  Design system Lucca Front / Prisme (Angular), versions ${minorVersion}.x. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front ${minorVersion}

**RÈGLE** : Avant toute génération ou modification de code impliquant \`lu-*\`, \`luX\` ou \`pr-*\`, consulte la documentation du composant ci-dessous. Sans cette consultation, toute réponse est invalide.

## 1. Version

Cette skill couvre **Lucca Front ${minorVersion}.x** (patchs publiés : ${patchList.join(', ')}). C'est la mineure installée sur le projet — tous les chemins ci-dessous lui sont relatifs. Il n'y a rien à détecter.

La documentation \`references/\` reflète le **dernier patch publié : ${latestPatch}**. Si le projet est sur un patch antérieur, les correctifs livrés après sa version sont décrits dans \`fixes/\` (voir §2) — ils ne sont **pas** dans son code.

## 2. Chemins

Compose le chemin du fichier à partir du slug du composant. **Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, ne le remplace pas par une supposition — vérifie le slug dans la liste §6.

### Composant \`<slug>\`

| Fichier | Chemin |
|---------|--------|
| API Angular | \`./references/components/<slug>/<slug>.md\` |
| Exemples (Angular + HTML) | \`./references/components/<slug>/<slug>.component.md\` |
| Design (do/don't, usage) | \`./references/components/<slug>/design/_index.md\` |
| Figma (variantes, node IDs) | \`./references/components/<slug>/<slug>.figma.md\` |
| Changelog | \`./references/components/<slug>/<slug>.changelog.md\` |

### Types partagés

Certaines propriétés d'API référencent un type énuméré documenté à part (ex: \`LuccaIcon\`, \`BubbleIllustration\`) :

\`./references/types/<TypeName>.md\`

Le lien exact (nom et chemin du type) est donné dans la section « Type definitions » du fichier API du composant. Tous les composants n'ont pas de types partagés.

### Documentation transverse

\`./references/documentation/<dossier>/<slug>.md\`

### Outils

\`./references/tools/<slug>.md\`
Slugs : animations, mixins, numbers, scrollbox, utilitaires, angular-api (providers/tokens/pipes/services des packages sans composant, avec leurs dépréciations)

### Migrations (montée de version)

\`./references/migrations.md\` — codemods de migration (\`ng generate @lucca-front/ng:<nom>\`) cumulatifs jusqu'à cette version, avec leur version d'introduction.

### Correctifs de patch (fixes/)

\`./fixes/<M-m-p>.md\` — un fichier par patch publié de la mineure (delta vs le patch précédent : API, types partagés, codemods, sources de stories).${fixPatches.length > 0 ? ` Fichiers : ${fixPatches.map((p) => `\`${p.replace(/\./g, '-')}.md\``).join(', ')}.` : ' _(aucun patch publié après le .0 pour l\'instant)_'}

À consulter quand : le projet est sur un patch **antérieur** à ${latestPatch} (les fixes postérieurs à sa version décrivent des correctifs absents de son code), ou pour comprendre ce qu'un patch précis a changé.

### Exemple

Bouton → API : \`./references/components/button/button.md\`, Figma : \`./references/components/button/button.figma.md\`

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
| Composant déprécié | \`./references/documentation/deprecated/deprecated.md\` |
| Monter de version | \`./references/migrations.md\` + le \`<slug>.changelog.md\` de chaque composant touché |
| Projet sur un patch antérieur à ${latestPatch} / comportement inattendu sur un patch | \`./fixes/<M-m-p>.md\` |

## 4. Workflow Code

1. Lis l'API du composant (\`<slug>.md\`) — selectors, inputs, types exacts.
2. Consulte les exemples (\`<slug>.component.md\`).
3. Vérifie le changelog si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le \`.md\` fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (\`<slug>.figma.md\`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → \`design/_index.md\`.

⚠️ Les \`.figma.md\` reflètent l'état actuel de Figma.

## 6. Composants

${compactComponentLines}
## 7. Documentation transverse

${compactDocLines || '_(aucune documentation générée)_'}
## 8. Composants dépréciés

Consulte \`./references/documentation/deprecated/deprecated.md\` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
`;

	fs.mkdirSync(root, { recursive: true });
	const filePath = path.join(root, 'SKILL.md');
	fs.writeFileSync(filePath, content, 'utf-8');
	return filePath;
}
