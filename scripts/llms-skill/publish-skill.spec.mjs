import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { renderIndex, resolveSkillMinor, skillDirName } from './publish-skill.mjs';

const skillsRoot = resolve(fileURLToPath(import.meta.url), '..', '..', '..', '.github/skills/lucca-front');
const manifest = JSON.parse(readFileSync(join(skillsRoot, '_versions.json'), 'utf8'));

describe('resolveSkillMinor', () => {
	it.each`
		version           | expected
		${'v22.0.5'}      | ${'22.0'}
		${'22.0.0'}       | ${'22.0'}
		${'v21.4.2'}      | ${'21.3'}
		${'v22.1.0-rc.1'} | ${null}
		${'v99.0.0'}      | ${null}
		${'master'}       | ${null}
	`('resolves $version to $expected', ({ version, expected }) => {
		expect(resolveSkillMinor(manifest, version)).toBe(expected);
	});

	it('resolves the manifest latest minor to a committed skill', () => {
		const minor = resolveSkillMinor(manifest, `${manifest.latest}.0`);

		expect(readdirSync(join(skillsRoot, skillDirName(minor)))).toContain('SKILL.md');
	});
});

describe('renderIndex', () => {
	const skillDir = join(skillsRoot, skillDirName(manifest.latest));
	const files = readdirSync(skillDir, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => relative(skillDir, join(entry.parentPath, entry.name)).split('\\').join('/'));
	const index = renderIndex(manifest.latest, files);
	const links = [...index.matchAll(/\]\(llms\/([^)]+)\)/g)].map(([, path]) => path);

	it('links only files that exist in the skill', () => {
		expect(links.filter((path) => !files.includes(path))).toEqual([]);
	});

	it('links the guide and each component entry once', () => {
		expect(links).toContain('SKILL.md');
		expect(links).toContain('references/components/button/button.md');
		expect(links).not.toContain('references/components/button/button.figma.md');
		expect(new Set(links).size).toBe(links.length);
	});
});
