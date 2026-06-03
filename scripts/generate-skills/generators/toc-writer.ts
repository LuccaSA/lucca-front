import fs from 'fs';
import path from 'path';
import { ComponentMap, DocumentationMap, VersionManifest } from '../types';

/** Parse a version tag like "v21.2.0" into a numeric [major, minor, patch] tuple. */
function parseTag(tag: string): [number, number, number] {
	const [maj, min, pat] = tag.replace(/^v/, '').split('.').map(Number);
	return [maj || 0, min || 0, pat || 0];
}

/** Ascending comparator for version tags. */
function compareTagAsc(a: string, b: string): number {
	const [aMaj, aMin, aPat] = parseTag(a);
	const [bMaj, bMin, bPat] = parseTag(b);
	return aMaj !== bMaj ? aMaj - bMaj : aMin !== bMin ? aMin - bMin : aPat - bPat;
}

/**
 * Formats the version availability of a component that is NOT present in every version.
 * Returns a contiguous range `(v… → v…)` when the versions form an unbroken span of the
 * global list, otherwise an explicit comma-separated list so the signal is never misleading.
 */
function formatVersionRange(versionTags: string[], allTagsAsc: string[]): string {
	const sorted = versionTags.slice().sort(compareTagAsc);
	const min = sorted[0];
	const max = sorted[sorted.length - 1];
	const idxMin = allTagsAsc.indexOf(min);
	const idxMax = allTagsAsc.indexOf(max);
	const contiguous = idxMin !== -1 && idxMax !== -1 && idxMax - idxMin + 1 === sorted.length;
	if (contiguous) {
		return min === max ? `_(${min} uniquement)_` : `_(${min} → ${max})_`;
	}
	return `_(${sorted.join(', ')})_`;
}

/**
 * Writes the main SKILL.md — the entry point for the Copilot agent skill.
 *
 * This file is loaded automatically when the agent encounters `lu-*` or `luX` prefixed
 * components. It MUST contain clear instructions on version detection, file navigation,
 * and both Code and Figma workflows.
 */
export function writeToc(skillsDir: string, componentMap: ComponentMap): string {
	const luccaDir = path.join(skillsDir, 'lucca-front');
	const manifestPath = path.join(luccaDir, '_versions.json');

	let manifest: VersionManifest = { latest: '', versions: {} };
	if (fs.existsSync(manifestPath)) {
		try {
			manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
		} catch {
			// keep default
		}
	}

	// ── Build component list: flat, alphabetical, sourced from generated folders ──
	// The directories under references/components/ are the source of truth: every listed slug
	// is a navigable path. The previous ZeroHeight-derived category grouping was unreliable —
	// miscategorized entries, an "Unknown" bucket, and slug/registry-key mismatches that silently
	// dropped real components (e.g. error-page). A flat list also makes update diffs obvious.
	const componentsDir = path.join(luccaDir, 'references', 'components');
	// Full set of versions, used to flag components that don't span every version.
	const allTagsAsc = Object.keys(manifest.versions)
		.map((v) => `v${v}`)
		.sort(compareTagAsc);
	const totalVersionCount = allTagsAsc.length;

	let componentInfos: { slug: string; versions: string[] }[] = [];
	if (fs.existsSync(componentsDir)) {
		componentInfos = fs
			.readdirSync(componentsDir, { withFileTypes: true })
			.filter((d) => d.isDirectory())
			.map((d) => ({
				slug: d.name,
				// keep only the versioned folders (v21.x.x)
				versions: fs.readdirSync(path.join(componentsDir, d.name)).filter((f) => /^v\d/.test(f)),
			}))
			.filter((c) => c.versions.length > 0)
			.sort((a, b) => a.slug.localeCompare(b.slug));
	}
	// Annotate components absent from some versions with their availability range, so a path
	// composed on an unavailable version is recognised as a non-existent file, not a silent 404.
	const compactComponentLines =
		componentInfos
			.map(({ slug, versions }) =>
				totalVersionCount === 0 || versions.length === totalVersionCount
					? `- ${slug}`
					: `- ${slug} ${formatVersionRange(versions, allTagsAsc)}`,
			)
			.join('\n') + '\n';

	// Build version list
	const sortedVersions = Object.keys(manifest.versions).sort((a, b) => {
		const [aMaj, aMin, aPat] = a.split('.').map(Number);
		const [bMaj, bMin, bPat] = b.split('.').map(Number);
		return aMaj !== bMaj ? bMaj - aMaj : aMin !== bMin ? bMin - aMin : bPat - aPat;
	});

	let versionLines = '';
	for (const v of sortedVersions) {
		const e = manifest.versions[v];
		const isLatest = v === manifest.latest;
		versionLines += `- **v${v}**${isLatest ? ' (latest)' : ''} — ${e.componentCount} composants\n`;
	}

	// ── Load documentation map ──────────────────────────────────────────────
	const docMapPath = path.join(__dirname, '..', 'documentation-map.json');
	let docMap: DocumentationMap | null = null;
	if (fs.existsSync(docMapPath)) {
		try {
			docMap = JSON.parse(fs.readFileSync(docMapPath, 'utf-8')) as DocumentationMap;
		} catch {
			// ignore
		}
	}

	// Build compact documentation lines: title (slug) per category
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
			const items = entries.map(e => `${e.title} (\`${e.slug}\`)`).join(', ');
			compactDocLines += `- **${label}** (dossier \`${folder}/\`) : ${items}\n`;
		}
	}

	// ── Build the SKILL.md content ─────────────────────────────────────────

	const content = `---
name: lucca-front
description: >
  Design system Lucca Front / Prisme (Angular). À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front

**RÈGLE** : Avant toute génération ou modification de code impliquant \`lu-*\`, \`luX\` ou \`pr-*\`, consulte la documentation versionnée du composant. Sans cette consultation, toute réponse est invalide.

## 1. Version

1. Lis \`package.json\` → dépendance \`@lucca-front/ng\` (ou \`@lucca-front/scss\`) → ex: \`21.2.1\`.
2. **Composants, stories, outils** → version fix exacte : \`v21.2.1\`.
3. **Documentation transverse** (tokens, contenu, guidelines, patterns) → version mineure : \`v21.2\`.

Versions disponibles : ${sortedVersions.map(v => `v${v}`).join(', ') || '_(aucune)_'}

Si la version ne peut pas être déterminée → s'arrêter et demander à l'utilisateur. Ne jamais supposer une version par défaut.

## 2. Chemins

Compose l'URL du fichier à partir du slug et de la version détectée.
**Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, ne le remplace pas par une supposition — vérifie le slug dans la liste §6 (qui signale les composants absents de certaines versions) et les versions disponibles (§1).

### Composant \`<slug>\` (version fix)

| Fichier | Chemin |
|---------|--------|
| API Angular | \`./references/components/<slug>/v<M>.<m>.<p>/<slug>.md\` |
| Exemples (Angular + HTML) | \`./references/components/<slug>/v<M>.<m>.<p>/<slug>.component.md\` |
| Design (do/don't, usage) | \`./references/components/<slug>/v<M>.<m>.<p>/design/_index.md\` |
| Figma (variantes, node IDs) | \`./references/components/<slug>/<slug>.figma.md\` |
| Changelog | \`./references/components/<slug>/<slug>.changelog.md\` |

### Types partagés (version fix)

Certaines propriétés d'API référencent un type énuméré documenté à part (ex: \`LuccaIcon\`, \`BubbleIllustration\`) :

\`./references/types/v<M>.<m>.<p>/<TypeName>.md\`

Le lien exact (nom et chemin du type) est donné dans la section « Type definitions » du fichier API du composant. Tous les composants n'ont pas de types partagés.

### Documentation transverse (version mineure)

\`./references/documentation/<dossier>/v<M>.<m>/<slug>.md\`

### Outils (version mineure)

\`./references/tools/v<M>.<m>/<slug>.md\`
Slugs : animations, mixins, numbers, scrollbox, utilitaires

### Exemple

Bouton en v21.2.1 → API : \`./references/components/button/v21.2.1/button.md\`, Figma : \`./references/components/button/button.figma.md\`

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
| Composant déprécié | \`./references/documentation/deprecated/v<M>.<m>/deprecated.md\` |

## 4. Workflow Code

1. Détecte la version (§1).
2. Lis l'API du composant (\`<slug>.md\`) — selectors, inputs, types exacts.
3. Consulte les exemples (\`<slug>.component.md\`).
4. Vérifie le changelog si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le \`.md\` versionné fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (\`<slug>.figma.md\`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → \`design/_index.md\`.

⚠️ Les \`.figma.md\` ne sont pas versionnés — ils reflètent l'état actuel de Figma.

## 6. Composants

${compactComponentLines}
## 7. Documentation transverse

${compactDocLines || '_(aucune documentation générée)_'}
## 8. Composants dépréciés

Consulte \`./references/documentation/deprecated/v<M>.<m>/deprecated.md\` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
`;

	fs.mkdirSync(luccaDir, { recursive: true });
	const filePath = path.join(luccaDir, 'SKILL.md');
	fs.writeFileSync(filePath, content, 'utf-8');
	return filePath;
}

