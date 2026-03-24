import fs from 'fs';
import path from 'path';
import { IndexEntry, SkillIndex, WriteMeta, WriteResult } from '../types';

function extractDescription(content: string): string {
	const c = content.replace(/\r\n/g, '\n');
	// Single quotes
	const m1 = c.match(/^---\n[\s\S]*?^description:\s*'([\s\S]*?)'\s*\n[\s\S]*?^---/m);
	if (m1) return m1[1].trim();
	// Double quotes
	const m2 = c.match(/^---\n[\s\S]*?^description:\s*"([\s\S]*?)"\s*\n[\s\S]*?^---/m);
	if (m2) return m2[1].trim();
	// No quotes
	const m3 = c.match(/^---\n[\s\S]*?^description:\s*(.+?)\s*\n[\s\S]*?^---/m);
	if (m3) return m3[1].trim();
	return '';
}

/**
 * Strips the ```markdown ... ``` wrapper optionally added by the AI model,
 * then strips the YAML frontmatter.
 * Handles both LF and CRLF line endings.
 */
function stripFrontmatter(content: string): string {
	let c = content.replace(/\r\n/g, '\n');
	// Strip the ```markdown ... ``` wrapper if the AI model added it
	c = c.replace(/^```(?:markdown)?\n([\s\S]*?)\n```\s*$/, '$1').trim();
	// Strip YAML frontmatter
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
		throw new Error(`Invalid slug "${slug}" — only [a-z0-9-] characters are allowed`);
	}

	const resolvedSkillsDir = path.resolve(skillsDir);
	const resourcesDir = path.resolve(resolvedSkillsDir, 'lucca-front', 'references');
	const filePath = path.resolve(resourcesDir, `${slug}.md`);

	// Path-traversal guard
	if (!filePath.startsWith(resourcesDir + path.sep)) {
		throw new Error(`Path traversal detected for slug "${slug}"`);
	}

	if (fs.existsSync(filePath) && !force) {
		return { status: 'skipped', path: filePath };
	}

	const isUpdate = fs.existsSync(filePath);

	// Extract description before stripping frontmatter
	const description = extractDescription(content);
	const body = stripFrontmatter(content);

	fs.mkdirSync(resourcesDir, { recursive: true });
	fs.writeFileSync(filePath, body, 'utf-8');

	// Update the metadata index
	updateIndex(resolvedSkillsDir, slug, {
		description,
		category: meta.category ?? '',
		figmaName: meta.figmaName ?? slug,
		storybookName: meta.storybookName ?? slug,
	});

	return { status: isUpdate ? 'updated' : 'created', path: filePath };
}
