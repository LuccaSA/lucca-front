#!/usr/bin/env node
// Bumps Lucca Front in consumer repos through draft pull requests, starts their QA Webservice run once
// their front CI is green, and closes them once the report is done.
//
// Usage:
//   node .claude/skills/bump-qa/scripts/bump-qa.mjs open <version> [--repos A,B] [--dry-run]
//   node .claude/skills/bump-qa/scripts/bump-qa.mjs status <version> [--repos A,B] [--trigger] [--json]
//   node .claude/skills/bump-qa/scripts/bump-qa.mjs close <version> [--repos A,B]
//
// Exit codes: 0 done; 3 (status only) a QA run is not finished yet; 1 usage error or a repo failed.
// Needs `gh` authenticated with push rights on the repos, `git` set to sign commits, and npm access to
// the private @lucca packages of the repos (the lockfile is resolved with `npm install --package-lock-only`).

import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { branchName, bumpPackageJson, classify, declaredPackages, DEFAULT_REPOS, dropFromLock, isVersion, major } from './lib.mjs';

const ORG = 'LuccaSA';
const LABEL = ':hammer: Technical';

const { values, positionals } = parseArgs({
	allowPositionals: true,
	options: {
		repos: { type: 'string' },
		'dry-run': { type: 'boolean' },
		trigger: { type: 'boolean' },
		json: { type: 'boolean' },
	},
});
const [command, version] = positionals;

if (!['open', 'status', 'close'].includes(command) || !isVersion(version ?? '')) {
	console.error('Usage: bump-qa.mjs (open|status|close) <version> [--repos A,B] [--dry-run] [--trigger] [--json]');
	console.error('<version> is a published version of @lucca-front/ng, such as 22.2.0 or 22.2.0-rc.1.');
	process.exit(1);
}
const repos = values.repos
	? values.repos
			.split(',')
			.map((r) => r.trim())
			.filter(Boolean)
	: DEFAULT_REPOS;
const branch = branchName(version);

function run(cmd, args, { cwd, allowFail = false } = {}) {
	const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
	if (r.error) throw new Error(`${cmd} could not start: ${r.error.message}`);
	if (r.status !== 0 && !allowFail) {
		const output = (r.stderr || r.stdout).trim().split('\n').slice(-15).join('\n');
		throw new Error(`${cmd} ${args.join(' ')} exited with ${r.status}\n${output}`);
	}
	return { status: r.status, stdout: r.stdout.trim(), stderr: r.stderr.trim() };
}

const gh = (...args) => run('gh', args).stdout;
const openPr = (repo) =>
	JSON.parse(gh('pr', 'list', '--repo', `${ORG}/${repo}`, '--head', branch, '--state', 'open', '--json', 'number,url'))[0];

if (command === 'open') process.exit(open());
if (command === 'status') process.exit(status());
process.exit(close());

function open() {
	const missing = ['@lucca-front/ng', '@lucca-front/scss', '@lucca-front/icons', '@lucca/prisme'].filter(
		(name) => run('npm', ['view', `${name}@${version}`, 'version'], { allowFail: true }).stdout !== version,
	);
	if (missing.length) {
		console.error(`${version} is not published for ${missing.join(', ')}: the QA installs from the registry.`);
		return 1;
	}
	let failed = false;
	for (const repo of repos) {
		try {
			console.log(`${repo}: ${openOne(repo)}`);
		} catch (error) {
			failed = true;
			console.log(`${repo}: ❌ ${error.message}`);
		}
	}
	return failed ? 1 : 0;
}

function openOne(repo) {
	const existing = openPr(repo);
	if (existing) return `⏭️  already open: ${existing.url}`;
	if (run('gh', ['api', `repos/${ORG}/${repo}/branches/${branch}`], { allowFail: true }).status === 0) {
		return `⏭️  branch ${branch} exists without an open pull request: delete it or reopen its pull request`;
	}
	const base = gh('repo', 'view', `${ORG}/${repo}`, '--json', 'defaultBranchRef', '-q', '.defaultBranchRef.name');
	const dir = mkdtempSync(path.join(tmpdir(), `bump-qa-${repo}-`));
	try {
		run('gh', ['repo', 'clone', `${ORG}/${repo}`, dir, '--', '--depth', '1', '--branch', base, '--quiet']);
		const files = run('git', ['ls-files', '*package.json'], { cwd: dir }).stdout.split('\n').filter(Boolean);
		const targets = files.filter((file) => declaredPackages(readFileSync(path.join(dir, file), 'utf8')).length);
		if (!targets.length) return `⏭️  no Lucca Front package declared on ${base}`;

		for (const file of targets) {
			const ng = declaredPackages(readFileSync(path.join(dir, file), 'utf8')).find((p) => p.name === '@lucca-front/ng');
			if (ng && major(ng.range) !== major(version)) {
				return `⏭️  ${file} is on @lucca-front/ng ${ng.range}: a major upgrade is a migration, not a bump`;
			}
		}

		const changed = [];
		for (const file of targets) {
			const { text, changed: hasChanged } = bumpPackageJson(readFileSync(path.join(dir, file), 'utf8'), version);
			if (!hasChanged) continue;
			writeFileSync(path.join(dir, file), text);
			changed.push(file);
			const folder = path.join(dir, path.dirname(file));
			const lock = path.join(folder, 'package-lock.json');
			if (existsSync(lock)) {
				writeFileSync(lock, dropFromLock(readFileSync(lock, 'utf8')).text);
				// Peer conflicts with the repo's other dependencies surface here, before anything is pushed.
				run('npm', ['install', '--package-lock-only', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: folder });
			}
		}
		if (!changed.length) return `⏭️  already on ${version}`;

		const stat = run('git', ['diff', '--stat'], { cwd: dir }).stdout.split('\n').pop().trim();
		if (values['dry-run']) return `🔍 would bump ${changed.join(', ')} on ${base} (${stat})`;

		run('git', ['switch', '--quiet', '-c', branch], { cwd: dir });
		run('git', ['add', '--all'], { cwd: dir });
		run('git', ['commit', '--quiet', '-S', '-m', `chore(deps): update lucca-front to ${version}`], { cwd: dir });
		run('git', ['push', '--quiet', '-u', 'origin', branch], { cwd: dir });
		const body = [
			'## Description',
			'',
			`Montée de Lucca Front en ${version} pour faire tourner la QA de ce dépôt sur cette version avant sa diffusion. Cette PR draft est ouverte par le skill \`bump-qa\` de lucca-front, et fermée une fois le rapport de QA fait.`,
			'',
			'-----',
			'',
		].join('\n');
		const url = gh(
			'pr',
			'create',
			'--repo',
			`${ORG}/${repo}`,
			'--draft',
			'--base',
			base,
			'--head',
			branch,
			'--title',
			`chore(deps): update lucca-front to ${version}`,
			'--body',
			body,
			'--label',
			LABEL,
		);
		return `✅ ${url} (${changed.join(', ')})`;
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

function status() {
	const rows = [];
	let failed = false;
	for (const repo of repos) {
		try {
			rows.push({ repo, ...statusOne(repo) });
		} catch (error) {
			failed = true;
			rows.push({ repo, error: error.message });
		}
	}
	const pending = rows.some((r) => r.pr && r.qa !== 'done');
	if (values.json) {
		console.log(JSON.stringify(rows, null, 2));
	} else {
		console.log(`## Lucca Front ${version}: QA of the bump pull requests\n`);
		console.log('| Repo | Pull request | front / ci | QA | dd run |');
		console.log('|---|---|---|---|---|');
		for (const r of rows) {
			if (r.error) console.log(`| ${r.repo} | ❌ ${r.error.split('\n')[0]} | | | |`);
			else if (!r.pr) console.log(`| ${r.repo} | none | | | |`);
			else {
				const front = r.front === 'fail' ? `fail ([job](${r.frontLink}))` : r.front;
				const qa = r.justTriggered ? 'triggered now (🎮)' : r.qa === 'done' ? `done, ${r.qaBucket}` : r.qa;
				const run = r.qaRun ? `[${r.qaRun}](https://dd.lucca.tech/qa/run/${r.qaRun}/overview)` : '';
				console.log(`| ${r.repo} | ${r.pr.url} | ${front} | ${qa} | ${run} |`);
			}
		}
	}
	if (failed) return 1;
	return pending ? 3 : 0;
}

function statusOne(repo) {
	const pr = openPr(repo);
	if (!pr) return {};
	const target = ['--repo', `${ORG}/${repo}`];
	// `gh pr checks` exits 8 while a check is pending and 1 when one fails: its JSON is still complete.
	const out = run('gh', ['pr', 'checks', String(pr.number), ...target, '--json', 'name,bucket,link,startedAt'], { allowFail: true });
	const checks = out.stdout.startsWith('[') ? JSON.parse(out.stdout) : [];
	const comments = JSON.parse(gh('pr', 'view', String(pr.number), ...target, '--json', 'comments', '-q', '.comments'));
	const state = classify({ checks, comments });
	if (values.trigger && state.canTrigger) {
		gh('pr', 'comment', String(pr.number), ...target, '--body', '🎮');
		return { pr, ...state, triggered: true, qa: 'queued', justTriggered: true };
	}
	return { pr, ...state };
}

function close() {
	let failed = false;
	for (const repo of repos) {
		try {
			const pr = openPr(repo);
			if (!pr) {
				console.log(`${repo}: ⏭️  no open pull request on ${branch}`);
				continue;
			}
			gh(
				'pr',
				'close',
				String(pr.number),
				'--repo',
				`${ORG}/${repo}`,
				'--delete-branch',
				'--comment',
				'QA report done: closed by bump-qa.',
			);
			console.log(`${repo}: ✅ closed ${pr.url} and deleted ${branch}`);
		} catch (error) {
			failed = true;
			console.log(`${repo}: ❌ ${error.message}`);
		}
	}
	return failed ? 1 : 0;
}
