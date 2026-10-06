import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '..', '..', '..');
const skillsRoot = join(root, '.github/skills/lucca-front');

const TARGETS = {
	storybook: { outDir: '.storybook/public', pack: false },
	npm: { outDir: 'dist/ng', pack: true },
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

/** llms.txt index (llmstxt.org) over the skill's files, given as POSIX paths relative to the skill folder. */
export function renderIndex(minor, files) {
	const link = (path) => `- [${path}](llms/${path})`;
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
	].join('\n');
}

function listFiles(dir) {
	return readdirSync(dir, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => relative(dir, join(entry.parentPath, entry.name)).split('\\').join('/'))
		.sort();
}

function currentVersion(manifest) {
	try {
		return execFileSync('git', ['describe', '--tags', '--exact-match', 'HEAD'], {
			cwd: root,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
	} catch {
		return `${manifest.latest}.0`;
	}
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
	const version = currentVersion(manifest);
	const minor = resolveSkillMinor(manifest, version);
	const skillDir = minor && join(skillsRoot, skillDirName(minor));
	if (!skillDir || !existsSync(join(skillDir, 'SKILL.md'))) {
		console.log(
			`::warning::[llms] no generated skill covers ${version} (.github/skills/lucca-front/_versions.json): ${target.outDir} ships no LLM documentation.`,
		);
		return;
	}

	mkdirSync(outDir, { recursive: true });
	cpSync(skillDir, join(outDir, 'llms'), { recursive: true });
	const files = listFiles(skillDir);
	writeFileSync(join(outDir, 'llms.txt'), renderIndex(minor, files));

	if (target.pack) {
		const packed = packedFiles(outDir);
		const missing = ['llms.txt', 'llms/SKILL.md'].filter((f) => !packed.includes(f));
		if (missing.length) {
			throw new Error(`${missing.join(', ')} written to ${target.outDir} but absent from the npm tarball, check "files" / .npmignore`);
		}
	}
	console.log(`[llms] ${version} → skill ${skillDirName(minor)} (${files.length} files) → ${target.outDir}/llms.txt + llms/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	publish(process.argv[2]);
}
