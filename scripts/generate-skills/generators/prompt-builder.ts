import fs from 'fs';
import path from 'path';
import { MatchedEntry } from '../types';

/**
 * Construit le prompt AI pour générer le SKILL.md d'un composant.
 * Inclut : métadonnées Figma, URLs Storybook, code source des stories,
 * et guidelines Zeroheight.
 */

const WORKSPACE_ROOT = path.join(__dirname, '..', '..', '..');

const CATEGORY_LABELS: Record<string, string> = {
	Actions: 'Actions',
	Feedback: 'Feedback',
	Forms: 'Formulaires',
	Integration: 'Intégration',
	Intl: 'Internationalisation',
	Listings: 'Listes & Tableaux',
	Loaders: 'Chargement',
	Navigation: 'Navigation',
	Overlays: 'Overlays',
	Structure: 'Structure',
	Texts: 'Textes',
	Toolbox: 'Boîte à outils',
	Users: 'Utilisateurs',
};

export const SYSTEM_PROMPT = `Tu es un expert du design system Lucca Front (Angular).
Tu génères des fichiers SKILL.md pour VS Code Copilot / GitHub Copilot selon la spécification agentskills.io.
Le contenu est UNIQUEMENT Angular — pas d'exemples HTML/CSS standalone.

## Format SKILL.md requis

\`\`\`markdown
---
name: <slug-du-composant>
description: '<Description en français. Max 512 chars. Nom du composant, directives/sélecteurs Angular, inputs principaux, variantes, mots-clés de déclenchement.>'
---

# <Nom du composant>

## Quand utiliser ce composant
<Au moins 3 cas d'usage concrets>

## Stories Storybook
<Liens vers les stories docs et exemples interactifs>

## Composant Figma
<Lien Figma + description visuelle + variantes disponibles>

## Import

\`\`\`typescript
import { XxxComponent } from '@lucca-front/ng/<package>';
// ou
import { XxxDirective } from '@lucca-front/ng/<package>';
\`\`\`

## Usage de base

\`\`\`html
<!-- Usage minimal -->
<element luXxx>...</element>
\`\`\`

## Directive / Composant : \`luXxx\` ou \`<lu-xxx>\`

Description courte du sélecteur. Applicable sur quels éléments HTML.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| \`""\` (vide) | Variante par défaut |
| \`"outlined"\` | ... |

\`\`\`html
<element luXxx="valeur1">...</element>
\`\`\`

## Inputs

### \`inputName\`
Type: \`'valeur1' | 'valeur2'\` — Default: \`'default'\`

Description courte.

\`\`\`html
<element luXxx [inputName]="value">...</element>
\`\`\`

## Patterns courants

### <Nom du pattern>
\`\`\`html
<!-- Commentaire explicatif -->
<element luXxx ...>...</element>
\`\`\`

## Accessibilité
<Règles a11y spécifiques au composant>

## Guidelines Prisme
<Guidelines, dos & don'ts issus de Zeroheight — uniquement si disponibles>
\`\`\`

## Règles absolues
- Tout le contenu est en français SAUF les noms techniques (inputs, types, valeurs de directives, noms de composants Angular)
- La \`description\` frontmatter contient tous les noms de directives, sélecteurs, inputs, variantes pour maximiser la découverte Copilot
- Les imports doivent utiliser les vrais chemins \`@lucca-front/ng/<package>\` déduits des \`importPath\` des stories
- Les exemples de code sont déduits des stories fournies — ne JAMAIS inventer de propriétés ou comportements absents des données
- Toujours inclure \`type="button"\` sur les \`<button>\` dans les exemples
- Pas de section "Exemples HTML/CSS" — Angular uniquement
- Format YAML strict : guillemets simples pour \`description\`, pas de retours à la ligne dans le frontmatter
- Les types Angular exacts (union types, boolean, number) doivent être cités littéralement depuis les stories
`;

export function buildPrompt({ matched, zeroheightData }: { matched: MatchedEntry; zeroheightData: Record<string, string> | null }): {
	systemPrompt: string;
	userPrompt: string;
} {
	const { slug, figma, storybook } = matched;

	// Figma
	const figmaRepresentativeUrl = figma.components[0]?.nodeUrl ?? '';
	const figmaVariants = figma.components
		.map((c) => c.name)
		.slice(0, 30)
		.join(', ');

	// Storybook stories — Angular uniquement pour les liens
	const allStories = storybook?.stories ?? [];
	const angularStories = allStories.filter((s) => s.framework === 'angular');
	const docsLine = storybook?.docsEntry?.url ? `- [Documentation complète](${storybook.docsEntry.url})` : '';
	const storyLines = angularStories
		.slice(0, 12)
		.map((s) => `- [${s.name}](${s.url})`)
		.join('\n');
	const categoryLabel = storybook?.category ? (CATEGORY_LABELS[storybook.category] ?? storybook.category) : '';

	// Code sources des stories
	const codeExamples = readStoryExamples(storybook ?? null);

	// Stories connexes (sous-composants, variantes liées)
	let relatedSection = '';
	if (matched.relatedStorybook && matched.relatedStorybook.length > 0) {
		const relatedLinks: string[] = [];
		for (const rel of matched.relatedStorybook.slice(0, 3)) {
			const relAngular = (rel.stories ?? []).filter((s) => s.framework === 'angular').slice(0, 2);
			for (const s of relAngular) {
				relatedLinks.push(`- [${rel.storybookName ?? rel.sbSlug} / ${s.name}](${s.url})`);
			}
		}
		if (relatedLinks.length > 0) {
			relatedSection = `\n## Stories connexes (composants liés)\n${relatedLinks.join('\n')}\n`;
		}
	}

	// Zeroheight
	const guidelinesText =
		zeroheightData && Object.keys(zeroheightData).length > 0
			? Object.entries(zeroheightData)
					.map(([tool, text]) => `### Source : ${tool}\n${text}`)
					.join('\n\n')
			: '_Aucune guideline Zeroheight disponible pour ce composant._';

	const userPrompt = `Génère le SKILL.md pour le composant **${figma.figmaName}** du design system Lucca Front.

## Données Figma
- Nom : ${figma.figmaName}
- Slug : ${slug}
- Description : ${figma.description || '_Non renseignée_'}
- Lien Figma : ${figmaRepresentativeUrl}
- Variantes disponibles (${figma.components.length}) : ${figmaVariants}

## Stories Storybook
${docsLine}
${storyLines}
${categoryLabel ? `- Catégorie Storybook : ${categoryLabel}` : ''}
${relatedSection}
## Sélecteurs Angular réels (issus du code source des packages)
${extractComponentSelectors(storybook ?? null) ?? '_Non disponible_'}

## Exemples de code sources (tirés des stories)
${codeExamples ?? '_Aucun fichier source accessible_'}

## Guidelines Prisme / Zeroheight
${guidelinesText}

---
Génère maintenant le fichier SKILL.md complet selon le format spécifié.
Le champ \`name\` dans le frontmatter doit être exactement \`${slug}\`.
`;

	return { systemPrompt: SYSTEM_PROMPT, userPrompt };
}

/**
 * Lit le code source des stories Angular pour les inclure comme exemples.
 * Limite à ~6000 caractères par fichier pour ne pas saturer le contexte.
 */
function readStoryExamples(storybook: import('../types').StorybookGroup | null): string | null {
	if (!storybook?.stories?.length) return null;

	const examples: string[] = [];
	const angular = storybook.stories.filter((s) => s.framework === 'angular').slice(0, 5);

	const resolvedRoot = path.resolve(WORKSPACE_ROOT);

	for (const story of angular) {
		if (!story.importPath) continue;

		// Sécurité : l'importPath vient d'un serveur externe (Storybook index.json).
		// On rejette tout chemin contenant '..' pour éviter un path traversal.
		const normalizedImport = story.importPath.replace(/^[./\\]+/, '');
		if (/\.\./.test(normalizedImport)) {
			console.warn(`  ⚠️  importPath suspect ignoré : ${story.importPath}`);
			continue;
		}

		const filePath = path.resolve(resolvedRoot, normalizedImport);

		// Vérification finale que le fichier résolu est bien dans le workspace
		if (!filePath.startsWith(resolvedRoot + path.sep)) {
			console.warn(`  ⚠️  Chemin hors workspace ignoré : ${filePath}`);
			continue;
		}

		if (!fs.existsSync(filePath)) continue;

		try {
			const content = fs.readFileSync(filePath, 'utf-8');
			const truncated = content.length > 6000 ? content.slice(0, 6000) + '\n// ... (tronqué)' : content;
			examples.push(`\`\`\`typescript\n// ${story.importPath}\n${truncated}\n\`\`\``);
		} catch {
			// Fichier illisible — on ignore
		}
	}

	return examples.length > 0 ? examples.join('\n\n') : null;
}

/**
 * Extrait les véritables sélecteurs Angular depuis les fichiers source des packages.
 * Évite que l'IA invente des sélecteurs à partir des noms de classes.
 */
function extractComponentSelectors(storybook: import('../types').StorybookGroup | null): string | null {
	if (!storybook?.stories?.length) return null;

	const resolvedRoot = path.resolve(WORKSPACE_ROOT);
	const collectedClasses = new Map<string, string>(); // className → packagePath

	// Collecter les imports depuis les fichiers de stories
	const angular = storybook.stories.filter((s) => s.framework === 'angular').slice(0, 5);
	for (const story of angular) {
		if (!story.importPath) continue;
		const normalizedImport = story.importPath.replace(/^[./\\]+/, '');
		if (/\.\./.test(normalizedImport)) continue;
		const filePath = path.resolve(resolvedRoot, normalizedImport);
		if (!filePath.startsWith(resolvedRoot + path.sep) || !fs.existsSync(filePath)) continue;

		try {
			const content = fs.readFileSync(filePath, 'utf-8');
			// Extraire les imports depuis @lucca-front/ng/<package>
			const importRe = /import\s*\{([^}]+)\}\s*from\s*'@lucca-front\/ng\/([^']+)'/g;
			let m: RegExpExecArray | null;
			while ((m = importRe.exec(content)) !== null) {
				const classes = m[1].split(',').map((c) => c.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
				const pkg = m[2];
				for (const cls of classes) {
					if (cls && !collectedClasses.has(cls)) {
						collectedClasses.set(cls, pkg);
					}
				}
			}
		} catch {
			// ignore
		}
	}

	if (collectedClasses.size === 0) return null;

	// Pour chaque classe, chercher son sélecteur dans packages/ng/<package>/
	const results: string[] = [];
	const seen = new Set<string>();

	for (const [className, pkg] of collectedClasses) {
		// Ignorer les classes internes (ɵ prefix) et les directives non-composants courants
		if (className.startsWith('ɵ') || className.startsWith('provide') || className.endsWith('Module') || className.endsWith('Pipe')) continue;

		const pkgDir = path.join(resolvedRoot, 'packages', 'ng', pkg);
		if (!fs.existsSync(pkgDir)) continue;

		const selector = findSelectorInDir(pkgDir, className, resolvedRoot);
		if (selector && !seen.has(selector)) {
			seen.add(selector);
			results.push(`- \`${className}\` → sélecteur : \`${selector}\``);
		}
	}

	return results.length > 0 ? results.join('\n') : null;
}

/**
 * Cherche récursivement le sélecteur d'un composant/directive dans un répertoire.
 */
function findSelectorInDir(dir: string, className: string, root: string): string | null {
	let files: string[];
	try {
		files = fs.readdirSync(dir);
	} catch {
		return null;
	}

	for (const file of files) {
		const fullPath = path.join(dir, file);
		// Sécurité : rester dans le workspace
		if (!fullPath.startsWith(root + path.sep)) continue;

		let stat: fs.Stats;
		try {
			stat = fs.statSync(fullPath);
		} catch {
			continue;
		}

		if (stat.isDirectory()) {
			const found = findSelectorInDir(fullPath, className, root);
			if (found) return found;
		} else if (file.endsWith('.ts') && !file.endsWith('.spec.ts') && !file.endsWith('.d.ts')) {
			try {
				const content = fs.readFileSync(fullPath, 'utf-8');
				// Chercher la classe dans ce fichier
				if (!content.includes(`class ${className}`)) continue;
				// Extraire le sélecteur du décorateur @Component ou @Directive
				const selectorMatch = content.match(/selector:\s*['"`]([^'"`]+)['"`]/);
				if (selectorMatch) return selectorMatch[1];
			} catch {
				// ignore
			}
		}
	}
	return null;
}
