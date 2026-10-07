import { readdirSync, readFileSync } from 'node:fs';
import { join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import {
	deployedSkillUrl,
	isRemoteOnly,
	RELATIVE_MD_PATH,
	renderIndex,
	resolveSkillMinor,
	rewriteRemoteLinks,
	skillDirName,
} from './publish-skill.mjs';

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

const skillDir = join(skillsRoot, skillDirName(manifest.latest));
const files = readdirSync(skillDir, { recursive: true, withFileTypes: true })
	.filter((entry) => entry.isFile())
	.map((entry) => relative(skillDir, join(entry.parentPath, entry.name)).split('\\').join('/'));
const remote = deployedSkillUrl('v22.0.5');

describe('renderIndex', () => {
	const localLinks = (index) => [...index.matchAll(/\]\(llms\/([^)]+)\)/g)].map(([, path]) => path);

	it('links only files that exist in the skill', () => {
		const links = localLinks(renderIndex(manifest.latest, files, { ref: 'master', linkRemoteOnly: false }));

		expect(links.filter((path) => !files.includes(path))).toEqual([]);
	});

	it('links the guide and each component entry once', () => {
		const links = localLinks(renderIndex(manifest.latest, files, { ref: 'master', linkRemoteOnly: false }));

		expect(links).toContain('SKILL.md');
		expect(links).toContain('references/components/button/button.md');
		expect(links).not.toContain('references/components/button/button.figma.md');
		expect(new Set(links).size).toBe(links.length);
	});

	it('links remote-only files on the deploy of the ref when they are not shipped', () => {
		const index = renderIndex(manifest.latest, files, { ref: 'v22.0.5', linkRemoteOnly: true });

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

	it('leaves every relative path of a shipped file of the latest skill on a shipped file', () => {
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
