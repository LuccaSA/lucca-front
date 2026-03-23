import fs from 'fs';
import path from 'path';
import { IndexEntry, SkillIndex, WriteMeta, WriteResult } from '../types';

function extractDescription(content: string): string {
	const c = content.replace(/\r\n/g, '\n');
	// Guillemets simples
	const m1 = c.match(/^---\n[\s\S]*?^description:\s*'([\s\S]*?)'\s*\n[\s\S]*?^---/m);
	if (m1) return m1[1].trim();
	// Guillemets doubles
	const m2 = c.match(/^---\n[\s\S]*?^description:\s*"([\s\S]*?)"\s*\n[\s\S]*?^---/m);
	if (m2) return m2[1].trim();
	// Sans guillemets
	const m3 = c.match(/^---\n[\s\S]*?^description:\s*(.+?)\s*\n[\s\S]*?^---/m);
	if (m3) return m3[1].trim();
	return '';
}

/**
 * Supprime le wrapper ```markdown ... ``` éventuellement ajouté par le modèle IA,
 * puis le frontmatter YAML.
 * Tolère les fins de ligne LF et CRLF.
 */
function stripFrontmatter(content: string): string {
	let c = content.replace(/\r\n/g, '\n');
	// Supprimer le wrapper ```markdown ... ``` si le modèle IA l'a ajouté
	c = c.replace(/^```(?:markdown)?\n([\s\S]*?)\n```\s*$/, '$1').trim();
	// Supprimer le frontmatter YAML
	c = c.replace(/^---\n[\s\S]*?\n---\n?/, '').trimStart();
	return c;
}

function updateIndex(resolvedSkillsDir: string, slug: string, meta: IndexEntry): void {
	const indexPath = path.join(resolvedSkillsDir, 'lucca-front', '_index.json');
	let index: SkillIndex = {};
	if (fs.existsSync(indexPath)) {
		try {
			index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
		} catch {
			index = {};
		}
	}
	index[slug] = meta;
	fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf-8');
}

export function writeComponentResource(skillsDir: string, slug: string, content: string, meta: WriteMeta = {}, force = false): WriteResult {
	if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
		throw new Error(`Slug invalide "${slug}" — seuls les caractères [a-z0-9-] sont autorisés`);
	}

	const resolvedSkillsDir = path.resolve(skillsDir);
	const resourcesDir = path.resolve(resolvedSkillsDir, 'lucca-front', 'resources');
	const filePath = path.resolve(resourcesDir, `${slug}.md`);

	// Vérification anti-path-traversal
	if (!filePath.startsWith(resourcesDir + path.sep)) {
		throw new Error(`Path traversal détecté pour le slug "${slug}"`);
	}

	if (fs.existsSync(filePath) && !force) {
		return { status: 'skipped', path: filePath };
	}

	const isUpdate = fs.existsSync(filePath);

	// Extraire la description avant de supprimer le frontmatter
	const description = extractDescription(content);
	const body = stripFrontmatter(content);

	fs.mkdirSync(resourcesDir, { recursive: true });
	fs.writeFileSync(filePath, body, 'utf-8');

	// Mettre à jour l'index des métadonnées
	updateIndex(resolvedSkillsDir, slug, {
		description,
		category: meta.category ?? '',
		figmaName: meta.figmaName ?? slug,
		storybookName: meta.storybookName ?? slug,
	});

	return { status: isUpdate ? 'updated' : 'created', path: filePath };
}
