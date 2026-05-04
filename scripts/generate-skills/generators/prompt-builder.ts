import fs from 'fs';
import path from 'path';
import { MatchedEntry } from '../types';

/**
 * Builds the AI prompt to generate the SKILL.md for a component.
 * Includes: Figma metadata, Storybook URLs, story source code,
 * and Zeroheight guidelines.
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
		.slice(0, 8)
		.join(', ');

	// Storybook stories — Angular uniquement pour les liens
	const allStories = storybook?.stories ?? [];
	const angularStories = allStories.filter((s) => s.framework === 'angular');
	const docsLine = storybook?.docsEntry?.url ? `- [Documentation complète](${storybook.docsEntry.url})` : '';
	const storyLines = angularStories
		.slice(0, 5)
		.map((s) => `- [${s.name}](${s.url})`)
		.join('\n');
	const categoryLabel = storybook?.category ? (CATEGORY_LABELS[storybook.category] ?? storybook.category) : '';

	// Story source code — primary + any extra stories from component-map extraStories
	const codeExamples = readStoryExamples(storybook ?? null, matched.additionalStorybook);

	// Related stories (sub-components, related variants)
	let relatedSection = '';
	if (matched.relatedStorybook && matched.relatedStorybook.length > 0) {
		const relatedLinks: string[] = [];
		for (const rel of matched.relatedStorybook.slice(0, 1)) {
			const relAngular = (rel.stories ?? []).filter((s) => s.framework === 'angular').slice(0, 1);
			for (const s of relAngular) {
				relatedLinks.push(`- [${rel.storybookName ?? rel.sbSlug} / ${s.name}](${s.url})`);
			}
		}
		if (relatedLinks.length > 0) {
			relatedSection = `\n## Stories connexes (composants liés)\n${relatedLinks.join('\n')}\n`;
		}
	}

	// Zeroheight
	const guidelinesRaw =
		zeroheightData && Object.keys(zeroheightData).length > 0
			? Object.entries(zeroheightData)
					.map(([tool, text]) => `### Source : ${tool}\n${text}`)
					.join('\n\n')
			: '_Aucune guideline Zeroheight disponible pour ce composant._';
	const guidelinesText = guidelinesRaw.length > 1500 ? guidelinesRaw.slice(0, 1500) + '\n[...]' : guidelinesRaw;

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
 * Reads Angular story source files and extracts only the essential parts:
 * imports, HTML templates and argType descriptions.
 * Much more compact and focused than the raw file, with no arbitrary char limit.
 */
function readStoryExamples(storybook: import('../types').StorybookGroup | null, additionalGroups?: import('../types').StorybookGroup[]): string | null {
	const allGroups = [storybook, ...(additionalGroups ?? [])].filter(Boolean) as import('../types').StorybookGroup[];
	if (allGroups.length === 0) return null;

	const seen = new Set<string>();
	const examples: string[] = [];
	const angular = allGroups.flatMap((g) => g.stories.filter((s) => s.framework === 'angular')).slice(0, 2);

	const resolvedRoot = path.resolve(WORKSPACE_ROOT);

	for (const story of angular) {
		if (!story.importPath) continue;

		// Security: importPath comes from an external server (Storybook index.json).
		// Reject any path containing '..' to prevent path traversal.
		const normalizedImport = story.importPath.replace(/^[./\\]+/, '');
		if (/\.\./.test(normalizedImport)) {
			console.warn(`  ⚠️  Suspicious importPath skipped: ${story.importPath}`);
			continue;
		}

		const filePath = path.resolve(resolvedRoot, normalizedImport);

		// Final check: ensure the resolved path is within the workspace
		if (!filePath.startsWith(resolvedRoot + path.sep)) {
			console.warn(`  ⚠️  Path outside workspace skipped: ${filePath}`);
			continue;
		}

		if (!fs.existsSync(filePath)) continue;
		// Deduplicate: multiple stories can share the same source file
		if (seen.has(filePath)) continue;
		seen.add(filePath);

		try {
			const content = fs.readFileSync(filePath, 'utf-8');
			const extracted = extractStoryEssentials(content);
			if (extracted) {
				examples.push(`// ${story.importPath}\n${extracted}`);
			}
		} catch {
			// Unreadable file — skip
		}
	}

	return examples.length > 0 ? examples.join('\n\n') : null;
}

/**
 * Extracts the essential parts of a Storybook Angular story file:
 * 1. Import lines (what modules/components are used)
 * 2. All HTML templates found in template: `...` properties
 * 3. argType descriptions (the available inputs and their descriptions)
 */
function extractStoryEssentials(content: string): string | null {
	const parts: string[] = [];

	// 1. Imports
	const importLines = content
		.split('\n')
		.filter((l) => l.trimStart().startsWith('import '))
		.filter((l) => !l.includes('storybook/test') && !l.includes('stories/helpers'))
		.join('\n');
	if (importLines) parts.push(importLines);

	// 2. HTML templates — extract all template: `...` values using a recursive state machine
	const templates = extractTemplateLiterals(content);
	if (templates.length > 0) {
		parts.push('// Templates:\n' + templates.map((t) => `\`\`\`html\n${t.trim()}\n\`\`\``).join('\n'));
	}

	// 3. argType descriptions — extract prop name + description value
	const argTypeDescriptions = extractArgTypeDescriptions(content);
	if (argTypeDescriptions.length > 0) {
		parts.push('// Inputs:\n' + argTypeDescriptions.map(({ name, description }) => `// @Input() ${name}: ${description}`).join('\n'));
	}

	return parts.length > 0 ? parts.join('\n\n') : null;
}

/**
 * Extracts all template literal values assigned to a `template:` property.
 * Uses mutual recursion between readTemplateLiteral and skipInterpolation
 * to correctly handle nested template literals inside ${} expressions.
 */
function extractTemplateLiterals(content: string): string[] {
	const results: string[] = [];
	const searchStr = 'template:';
	let pos = 0;

	while (pos < content.length) {
		const idx = content.indexOf(searchStr, pos);
		if (idx === -1) break;

		// Skip to the opening backtick (ignore whitespace)
		let i = idx + searchStr.length;
		while (i < content.length && (content[i] === ' ' || content[i] === '\n' || content[i] === '\r' || content[i] === '\t')) i++;

		if (content[i] !== '`') {
			// template: someVar or template: "string" — not a template literal, skip
			pos = idx + searchStr.length;
			continue;
		}

		i++; // skip opening backtick
		const { text, endPos } = readTemplateLiteral(content, i);
		if (text.trim()) results.push(text);
		pos = endPos;
	}

	return results.slice(0, 3);
}

/** Reads a template literal body until the closing backtick, handling nested ${} recursively. */
function readTemplateLiteral(content: string, startPos: number): { text: string; endPos: number } {
	let i = startPos;
	let text = '';

	while (i < content.length) {
		const ch = content[i];
		if (ch === '`') {
			return { text, endPos: i + 1 };
		} else if (ch === '\\' && i + 1 < content.length) {
			text += ch + content[i + 1];
			i += 2;
		} else if (ch === '$' && content[i + 1] === '{') {
			i = skipInterpolation(content, i + 2); // skip past ${
			text += '${…}';
		} else {
			text += ch;
			i++;
		}
	}

	return { text, endPos: i };
}

/** Skips a ${...} interpolation block, recursively handling nested template literals. */
function skipInterpolation(content: string, startPos: number): number {
	let i = startPos;
	let depth = 1;

	while (i < content.length && depth > 0) {
		const ch = content[i];
		if (ch === '\\' && i + 1 < content.length) {
			i += 2;
		} else if (ch === '`') {
			// Nested template literal — skip it fully (readTemplateLiteral handles its own ${})
			i++;
			const { endPos } = readTemplateLiteral(content, i);
			i = endPos;
		} else if (ch === '{') {
			depth++;
			i++;
		} else if (ch === '}') {
			depth--;
			i++;
		} else {
			i++;
		}
	}

	return i;
}

/**
 * Extracts argType descriptions from a Storybook story file.
 * Scans line by line for `description: '...'` values and pairs them
 * with the enclosing property name by looking at the preceding lines.
 * Returns an array of { name, description } pairs.
 */
function extractArgTypeDescriptions(content: string): { name: string; description: string }[] {
	const results: { name: string; description: string }[] = [];
	const seen = new Set<string>();
	const lines = content.split('\n');

	for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
		const line = lines[lineIdx];
		const descMatch = line.match(/^\s+description\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
		if (!descMatch) continue;

		const raw = descMatch[1] ?? descMatch[2] ?? '';
		const description = raw
			.replace(/<[^>]+>/g, '')
			.replace(/\\n/g, ' ')
			.trim();
		if (!description) continue;

		// Find the enclosing property by walking backward for `propName: {` at a lower indent
		const descIndent = (line.match(/^(\s+)/)?.[1] ?? '').length;
		let propName: string | null = null;
		for (let j = lineIdx - 1; j >= 0 && j >= lineIdx - 15; j--) {
			const prev = lines[j];
			const prevIndent = (prev.match(/^(\s+)/)?.[1] ?? '').length;
			if (prevIndent < descIndent) {
				const nameMatch = prev.match(/^\s+(\w+)\s*:\s*\{/);
				if (nameMatch) {
					propName = nameMatch[1];
					break;
				}
			}
		}

		const SKIP = new Set(['type', 'control', 'table', 'if', 'mapping']);
		if (propName && !seen.has(propName) && !SKIP.has(propName)) {
			seen.add(propName);
			const truncated = description.length > 120 ? description.slice(0, 120) + '…' : description;
			results.push({ name: propName, description: truncated });
			if (results.length >= 8) break;
		}
	}

	return results;
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
				const classes = m[1]
					.split(',')
					.map((c) =>
						c
							.trim()
							.split(/\s+as\s+/)[0]
							.trim(),
					)
					.filter(Boolean);
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
