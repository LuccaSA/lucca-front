import { execFileSync } from 'node:child_process';
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '..', '..', '..');
const skillsRoot = join(root, '.github/skills/lucca-front');

export const STORYBOOK_URL = 'https://lucca-front.lucca.io';
export const PRISME_URL = 'https://prisme.lucca.io';

const TARGETS = {
	storybook: { outDir: '.storybook/public', pack: false, linkRemoteOnly: false },
	npm: { outDir: 'dist/ng', pack: true, linkRemoteOnly: true },
};

/** Documented minor whose skill covers `version` (a technical minor resolves to the minor covering it), or null. */
export function resolveSkillMinor(manifest, version) {
	const minor = /^v?(\d+\.\d+)\./.exec(version)?.[1];
	if (!minor) {
		return null;
	}
	if (manifest.minors[minor]) {
		return minor;
	}
	return Object.keys(manifest.minors).find((key) => manifest.minors[key].technicalMinors?.[minor]) ?? null;
}

export function skillDirName(minor) {
	return `lucca-front-${minor.replace('.', '-')}`;
}

/** Design, Figma and UX-writing content follows ZeroHeight and Figma, not the code version: the npm package links it on the deploy. */
export function isRemoteOnly(path) {
	return /\.(design|figma)\.md$/.test(path) || path.startsWith('references/documentation/');
}

export function deployedSkillUrl(ref) {
	return `${STORYBOOK_URL}/${ref}/storybook/llms`;
}

export const RELATIVE_MD_PATH = /(?<![\w./])(?:\.\.?\/)+[^\s`)'"\]]+\.md/g;

/** Points every relative path of a skill file (`fileRel`, relative to the skill folder) that resolves to a remote-only file at `remoteBase`. */
export function rewriteRemoteLinks(content, fileRel, remoteBase) {
	const dir = posix.dirname(fileRel);
	return content.replace(RELATIVE_MD_PATH, (match) => {
		const resolved = posix.join(dir, match);
		return isRemoteOnly(resolved) ? `${remoteBase}/${resolved}` : match;
	});
}

/** llms.txt index (llmstxt.org) over the skill's files, given as POSIX paths relative to the skill folder. */
export function renderIndex(minor, files, { ref, linkRemoteOnly }) {
	const href = (path) => (linkRemoteOnly && isRemoteOnly(path) ? `${deployedSkillUrl(ref)}/${path}` : `llms/${path}`);
	const link = (path) => `- [${path}](${href(path)})`;
	const components = files.filter((f) => /^references\/components\/([^/]+)\/\1\.md$/.test(f));
	const section = (title, prefix) => {
		const entries = files.filter((f) => f.startsWith(prefix));
		return entries.length ? [`## ${title}`, '', ...entries.map(link), ''] : [];
	};
	return [
		`# Lucca Front ${minor}`,
		'',
		`> Documentation of Lucca Front ${minor} (@lucca-front/ng, @lucca-front/scss, Prisme design system), written in French. Read SKILL.md first: it resolves the installed patch and routes to the references below.`,
		'',
		'## Guide',
		'',
		link('SKILL.md'),
		'',
		'## Components',
		'',
		...components.map(link),
		'',
		...section('Documentation', 'references/documentation/'),
		...section('Tools', 'references/tools/'),
		...section('Types', 'references/types/'),
		...section('Migrations', 'references/migrations.md'),
		...section('Patch fixes', 'fixes/'),
		'## Online',
		'',
		`- [Storybook](${STORYBOOK_URL}/${ref}/storybook/): components and stories at this version`,
		`- [Prisme](${PRISME_URL}): design system reference (ZeroHeight)`,
		'',
	].join('\n');
}

function listFiles(dir) {
	return readdirSync(dir, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => relative(dir, join(entry.parentPath, entry.name)).split('\\').join('/'))
		.sort();
}

function currentTag() {
	try {
		return execFileSync('git', ['describe', '--tags', '--exact-match', 'HEAD'], {
			cwd: root,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
	} catch {
		return null;
	}
}

function copyCodeOnly(skillDir, outDir, files, remoteBase) {
	const shipped = files.filter((f) => !isRemoteOnly(f));
	for (const file of shipped) {
		const dest = join(outDir, file);
		mkdirSync(dirname(dest), { recursive: true });
		if (file.endsWith('.md')) {
			writeFileSync(dest, rewriteRemoteLinks(readFileSync(join(skillDir, file), 'utf8'), file, remoteBase));
		} else {
			copyFileSync(join(skillDir, file), dest);
		}
	}
	return shipped.length;
}

function packedFiles(distDir) {
	const out = execFileSync('npm', ['pack', '--dry-run', '--json'], { cwd: distDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
	return JSON.parse(out)[0].files.map((f) => f.path);
}

function publish(targetName) {
	const target = TARGETS[targetName];
	if (!target) {
		throw new Error(`Unknown target "${targetName}", expected one of: ${Object.keys(TARGETS).join(', ')}`);
	}
	const outDir = join(root, target.outDir);
	if (target.pack && !existsSync(join(outDir, 'package.json'))) {
		throw new Error(`${target.outDir}/package.json not found, run the ng-packagr build first`);
	}
	rmSync(join(outDir, 'llms.txt'), { force: true });
	rmSync(join(outDir, 'llms'), { recursive: true, force: true });

	const manifest = JSON.parse(readFileSync(join(skillsRoot, '_versions.json'), 'utf8'));
	const tag = currentTag();
	const ref = tag ?? 'master';
	const version = tag ?? `${manifest.latest}.0`;
	const minor = resolveSkillMinor(manifest, version);
	const skillDir = minor && join(skillsRoot, skillDirName(minor));
	if (!skillDir || !existsSync(join(skillDir, 'SKILL.md'))) {
		console.log(
			`::warning::[llms] no generated skill covers ${version} (.github/skills/lucca-front/_versions.json): ${target.outDir} ships no LLM documentation.`,
		);
		return;
	}

	const files = listFiles(skillDir);
	mkdirSync(outDir, { recursive: true });
	let shipped = files.length;
	if (target.linkRemoteOnly) {
		shipped = copyCodeOnly(skillDir, join(outDir, 'llms'), files, deployedSkillUrl(ref));
	} else {
		cpSync(skillDir, join(outDir, 'llms'), { recursive: true });
	}
	writeFileSync(join(outDir, 'llms.txt'), renderIndex(minor, files, { ref, linkRemoteOnly: target.linkRemoteOnly }));

	if (target.pack) {
		const packed = packedFiles(outDir);
		const missing = ['llms.txt', 'llms/SKILL.md'].filter((f) => !packed.includes(f));
		if (missing.length) {
			throw new Error(`${missing.join(', ')} written to ${target.outDir} but absent from the npm tarball, check "files" / .npmignore`);
		}
	}
	console.log(
		`[llms] ${version} → skill ${skillDirName(minor)} (${shipped}/${files.length} files shipped) → ${target.outDir}/llms.txt + llms/`,
	);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	publish(process.argv[2]);
}
