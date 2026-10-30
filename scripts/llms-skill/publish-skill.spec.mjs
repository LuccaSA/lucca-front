import { readdirSync, readFileSync } from 'node:fs';
import { join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { deployedSkillUrl, isRemoteOnly, RELATIVE_MD_PATH, renderIndex, rewriteRemoteLinks, skillCovers } from './publish-skill.mjs';

const repoRoot = resolve(fileURLToPath(import.meta.url), '..', '..', '..');
const skillDir = join(repoRoot, '.github/skills/_lucca-front/llms');
const manifest = JSON.parse(readFileSync(join(repoRoot, '.github/skills/_lucca-front/versions.json'), 'utf8'));

describe('skillCovers', () => {
	const skill22 = { minor: '22.0' };
	const skill21 = { minor: '21.3', technicalMinors: { 21.4: { reason: 'compatibilité Angular 22' } } };

	it.each`
		skill      | version           | expected
		${skill22} | ${'v22.0.5'}      | ${true}
		${skill22} | ${'22.0.0'}       | ${true}
		${skill22} | ${'v22.1.0-rc.1'} | ${false}
		${skill22} | ${'v99.0.0'}      | ${false}
		${skill22} | ${'master'}       | ${false}
		${skill21} | ${'v21.4.2'}      | ${true}
		${skill21} | ${'v21.3.1'}      | ${true}
	`('$version against the $skill.minor skill: $expected', ({ skill, version, expected }) => {
		expect(skillCovers(skill, version)).toBe(expected);
	});

	it('is given a manifest whose minor the committed skill documents', () => {
		expect(skillCovers(manifest, `${manifest.minor}.0`)).toBe(true);
		expect(readdirSync(skillDir)).toContain('SKILL.md');
	});
});

const files = readdirSync(skillDir, { recursive: true, withFileTypes: true })
	.filter((entry) => entry.isFile())
	.map((entry) => relative(skillDir, join(entry.parentPath, entry.name)).split('\\').join('/'));
const remote = deployedSkillUrl('v22.0.5');

describe('renderIndex', () => {
	const localLinks = (index) => [...index.matchAll(/\]\(llms\/([^)]+)\)/g)].map(([, path]) => path);

	it('links only files that exist in the skill', () => {
		const links = localLinks(renderIndex(manifest.minor, files, { ref: 'master', linkRemoteOnly: false }));

		expect(links.filter((path) => !files.includes(path))).toEqual([]);
	});

	it('links the guide and each component entry once', () => {
		const links = localLinks(renderIndex(manifest.minor, files, { ref: 'master', linkRemoteOnly: false }));

		expect(links).toContain('SKILL.md');
		expect(links).toContain('references/components/button/button.md');
		expect(links).not.toContain('references/components/button/button.figma.md');
		expect(new Set(links).size).toBe(links.length);
	});

	it('links remote-only files on the deploy of the ref when they are not shipped', () => {
		const index = renderIndex(manifest.minor, files, { ref: 'v22.0.5', linkRemoteOnly: true });

		expect(localLinks(index).filter(isRemoteOnly)).toEqual([]);
		expect(index).toContain(`](${remote}/references/documentation/`);
		expect(index).toContain('](https://lucca-front.lucca.io/v22.0.5/storybook/)');
		expect(index).toContain('](https://prisme.lucca.io)');
	});
});

describe('rewriteRemoteLinks', () => {
	it.each`
		file                                        | content                                                | expected
		${'references/components/button/button.md'} | ${'[Figma](./button.figma.md)'}                        | ${`[Figma](${remote}/references/components/button/button.figma.md)`}
		${'references/components/button/button.md'} | ${'[Code](./button.component.md)'}                     | ${'[Code](./button.component.md)'}
		${'SKILL.md'}                               | ${'`./references/documentation/<dossier>/<slug>.md`'}  | ${`\`${remote}/references/documentation/<dossier>/<slug>.md\``}
		${'SKILL.md'}                               | ${'`./references/components/<slug>/<slug>.design.md`'} | ${`\`${remote}/references/components/<slug>/<slug>.design.md\``}
		${'SKILL.md'}                               | ${'`./references/tools/<slug>.md`'}                    | ${'`./references/tools/<slug>.md`'}
	`('rewrites $content in $file', ({ file, content, expected }) => {
		expect(rewriteRemoteLinks(content, file, remote)).toBe(expected);
	});

	it('leaves every relative path of a shipped file of the committed skill on a shipped file', () => {
		const shipped = files.filter((file) => !isRemoteOnly(file));
		const dangling = shipped
			.filter((file) => file.endsWith('.md'))
			.flatMap((file) =>
				[...rewriteRemoteLinks(readFileSync(join(skillDir, file), 'utf8'), file, remote).matchAll(RELATIVE_MD_PATH)]
					.map(([path]) => posix.join(posix.dirname(file), path))
					.filter((target) => !target.includes('<') && !shipped.includes(target))
					.map((target) => `${file} → ${target}`),
			);

		expect(dangling).toEqual([]);
	});
});
