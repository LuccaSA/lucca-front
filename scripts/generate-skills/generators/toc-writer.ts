import fs from 'fs';
import path from 'path';
import { SkillIndex } from '../types';

export function writeToc(skillsDir: string): string {
	const luccaDir = path.join(skillsDir, 'lucca-front');
	const indexPath = path.join(luccaDir, '_index.json');

	let index: SkillIndex = {};
	if (fs.existsSync(indexPath)) {
		try {
			index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
		} catch {
			index = {};
		}
	}

	const slugs = Object.keys(index).sort();

	// Liste de slugs pour la description Copilot (découverte)
	const slugList = slugs.slice(0, 50).join(', ');

	let componentLines = '';
	for (const slug of slugs) {
		const { description, figmaName } = index[slug];
		const displayName = figmaName || slug;
		// Description tronquée à 120 chars pour ne pas surcharger le TOC
		const descSnippet = description ? ` — ${description.slice(0, 120)}` : '';
		componentLines += `- **[${displayName}](./resources/${slug}.md)**${descSnippet}\n`;
	}

	const content = `---
name: lucca-front
description: 'Table des matières du design system Lucca Front (Angular). Charge ce skill pour trouver le bon composant à utiliser. Composants disponibles : ${slugList}, et plus encore. Catégories : actions, formulaires, navigation, overlays, listes, structure, feedback, chargement, textes, utilisateurs.'
---

## Composants

${componentLines}`;

	fs.mkdirSync(luccaDir, { recursive: true });
	const filePath = path.join(luccaDir, 'SKILL.md');
	fs.writeFileSync(filePath, content, 'utf-8');
	return filePath;
}
