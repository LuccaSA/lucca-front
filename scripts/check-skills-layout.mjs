// Checks what `apm audit` does not cover, from the repository root, with the APM CLI on the PATH.
// - .claude/skills/, .claude/rules/ and .github/instructions/ are deployed from .apm/: a file that apm.lock.yaml does not
//   list was written by hand and would be lost on the next `apm install`, while `apm audit` stays green.
// - .github/skills/ is what applications install: each skill needs an apm.yml and a line in the README,
//   and must install with APM the way an application would.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';

const root = process.cwd();
const published = join(root, '.github/skills');
const errors = [];

const lock = readFileSync(join(root, 'apm.lock.yaml'), 'utf8');
const deployed = new Set(
	(lock.match(/^local_deployed_files:\n((?:- .*\n)+)/m)?.[1] ?? '')
		.split('\n')
		.filter(Boolean)
		.map((line) => line.slice(2).trim()),
);
const listFiles = (dir) =>
	existsSync(join(root, dir))
		? readdirSync(join(root, dir), { recursive: true, withFileTypes: true })
				.filter((entry) => !entry.isDirectory())
				.map((entry) => relative(root, join(entry.parentPath, entry.name)))
		: [];
for (const file of ['.claude/skills', '.claude/rules', '.github/instructions'].flatMap(listFiles)) {
	if (!deployed.has(file)) {
		errors.push(`${file} is not deployed by APM: write it under .apm/ and run \`apm install\`.`);
	}
}

// A published skill is a folder holding a SKILL.md, at any depth (deprecated-components/textfield).
// _lucca-front/ is the generated documentation shipped in the npm package, never installed with APM.
const skillDirs = [];
const walk = (dir) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.name === '_lucca-front') {
			continue;
		}
		const path = join(dir, entry.name);
		if (existsSync(join(path, 'SKILL.md'))) {
			skillDirs.push(path);
		} else {
			walk(path);
		}
	}
};
walk(published);

const readme = readFileSync(join(published, 'README.md'), 'utf8');
const deployedNames = [];
for (const dir of skillDirs) {
	const path = relative(published, dir);
	const manifest = join(dir, 'apm.yml');
	if (!existsSync(manifest)) {
		errors.push(`.github/skills/${path} has no apm.yml (name, version, description).`);
	} else {
		const content = readFileSync(manifest, 'utf8');
		const missing = ['name', 'version', 'description'].filter((field) => !new RegExp(`^${field}:\\s*\\S`, 'm').test(content));
		if (missing.length > 0) {
			errors.push(`.github/skills/${path}/apm.yml lacks ${missing.join(', ')}.`);
		}
		deployedNames.push(content.match(/^name:\s*['"]?([^'"\s]+)/m)?.[1]);
	}
	if (!readme.includes(`(${path}/SKILL.md)`)) {
		errors.push(`.github/skills/${path} has no line in .github/skills/README.md.`);
	}
}

if (errors.length === 0) {
	const app = mkdtempSync(join(tmpdir(), 'lf-skills-'));
	const deps = skillDirs.map((dir) => `    - path: ${resolve(dir)}`).join('\n');
	writeFileSync(join(app, 'apm.yml'), `name: app\nversion: 1.0.0\ntargets:\n  - claude\ndependencies:\n  apm:\n${deps}\n  mcp: []\n`);
	try {
		execFileSync('apm', ['install'], { cwd: app, stdio: 'pipe' });
	} catch (error) {
		errors.push(`apm install of the published skills failed:\n${`${error.stdout ?? ''}${error.stderr ?? ''}` || error.message}`);
	}
	for (const name of deployedNames) {
		if (!existsSync(join(app, '.claude/skills', name, 'SKILL.md'))) {
			errors.push(`apm install did not deploy .claude/skills/${name}/SKILL.md in a blank project.`);
		}
	}
}

if (errors.length > 0) {
	console.error(errors.join('\n'));
	process.exit(1);
}
console.log(`${skillDirs.length} published skills install with APM; every file of .claude/skills/, .claude/rules/ and .github/instructions/ is deployed from .apm/.`);
