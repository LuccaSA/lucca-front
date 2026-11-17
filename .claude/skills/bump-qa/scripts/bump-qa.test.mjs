// Tests of bump-qa: the pure helpers directly, `status` and `close` from outside with a stub `gh` on PATH.
// Run: node --test .claude/skills/bump-qa/scripts/bump-qa.test.mjs
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { bumpPackageJson, classify, declaredPackages, dropFromLock, isQaTrigger, isVersion, major, qaRunId } from './lib.mjs';

const SCRIPT = path.join(import.meta.dirname, 'bump-qa.mjs');

describe('bumpPackageJson', () => {
	const procurement =
		'{\n\t"dependencies": {\n\t\t"@lucca-front/icons": "~22.1.1",\n\t\t"@lucca-front/ng": "~22.1.1",\n\t\t"@lucca/cdk": "^10.9.2"\n\t}\n}\n';

	it('keeps the range prefix of each package and every other byte', () => {
		const { text, changed } = bumpPackageJson(procurement, '22.2.0');
		assert.equal(changed, true);
		assert.equal(text, procurement.replaceAll('~22.1.1', '~22.2.0'));
	});

	it('bumps exact versions and @lucca/prisme', () => {
		const { text } = bumpPackageJson('{ "@lucca-front/scss": "22.1.2", "@lucca/prisme": "22.1.2" }', '22.2.0-rc.1');
		assert.equal(text, '{ "@lucca-front/scss": "22.2.0-rc.1", "@lucca/prisme": "22.2.0-rc.1" }');
	});

	it('leaves an overrides entry, which is an object, untouched', () => {
		const engagement = '{ "@lucca-front/ng": "20.2.0", "overrides": { "@lucca-front/ng": { "date-fns": "$date-fns" } } }';
		const { text } = bumpPackageJson(engagement, '20.3.0');
		assert.equal(text, engagement.replace('"20.2.0"', '"20.3.0"'));
	});

	it('reports no change when the file is already on the version', () => {
		assert.equal(bumpPackageJson('{ "@lucca-front/ng": "~22.2.0" }', '22.2.0').changed, false);
	});

	it('does not touch a package whose name only starts like a Lucca Front one', () => {
		const text = '{ "@lucca-front/ng-extra": "1.0.0", "@lucca/prisme-tokens": "1.0.0" }';
		assert.equal(bumpPackageJson(text, '22.2.0').changed, false);
	});
});

describe('dropFromLock', () => {
	it('removes the Lucca Front packages at any depth, and nothing else', () => {
		const lock = {
			lockfileVersion: 3,
			packages: {
				'': { dependencies: { '@lucca-front/ng': '~22.1.1' } },
				'node_modules/@lucca-front/ng': { version: '22.1.1' },
				'node_modules/@lucca/prisme': { version: '22.1.1' },
				'node_modules/@lucca/cleemy-front/node_modules/@lucca-front/icons': { version: '22.1.0' },
				'node_modules/@lucca/prisme-tokens': { version: '1.0.0' },
				'node_modules/@lucca/cdk': { version: '10.9.2' },
			},
		};
		const { text, removed } = dropFromLock(JSON.stringify(lock));
		assert.equal(removed, 3);
		assert.deepEqual(Object.keys(JSON.parse(text).packages), ['', 'node_modules/@lucca/prisme-tokens', 'node_modules/@lucca/cdk']);
	});
});

describe('helpers', () => {
	it('lists the declared Lucca Front packages with their range', () => {
		assert.deepEqual(declaredPackages('{ "@lucca-front/ng": "~22.1.1", "@lucca/cdk": "^10" }'), [
			{ name: '@lucca-front/ng', range: '~22.1.1' },
		]);
	});

	it('accepts published and pre-release versions only', () => {
		assert.equal(isVersion('22.2.0'), true);
		assert.equal(isVersion('22.2.0-rc.1'), true);
		assert.equal(isVersion('22.2'), false);
		assert.equal(isVersion('v22.2.0'), false);
	});

	it('reads the major through a range prefix', () => assert.equal(major('~22.1.1'), 22));

	it('reads the dd run of a QA Webservice check', () => {
		assert.equal(qaRunId('https://dd.lucca.tech/qa/run/82348/e2e'), 82348);
		assert.equal(qaRunId('https://github.com/LuccaSA/Figgo/actions/runs/1/job/2'), undefined);
	});

	it('recognises the QA trigger comments, and not a mention of the QA', () => {
		assert.equal(isQaTrigger('🎮'), true);
		assert.equal(isQaTrigger('Play test please'), true);
		assert.equal(isQaTrigger('The QA failed on the video game page'), false);
	});
});

describe('classify', () => {
	const front = (bucket, startedAt = '2026-11-17T10:00:00Z') => ({ name: 'front / ci', bucket, startedAt, link: 'job' });

	it('triggers only once the front CI is green', () => {
		assert.equal(classify({ checks: [front('pending')], comments: [] }).canTrigger, false);
		assert.equal(classify({ checks: [front('fail')], comments: [] }).canTrigger, false);
		assert.equal(classify({ checks: [], comments: [] }).front, 'missing');
		assert.equal(classify({ checks: [front('pass')], comments: [] }).canTrigger, true);
	});

	it('does not trigger twice', () => {
		const state = classify({ checks: [front('pass')], comments: [{ body: '🎮' }] });
		assert.equal(state.canTrigger, false);
		assert.equal(state.qa, 'queued');
	});

	it('takes the latest run of a check', () => {
		const state = classify({ checks: [front('fail', '2026-11-17T09:00:00Z'), front('pass', '2026-11-17T10:00:00Z')], comments: [] });
		assert.equal(state.front, 'pass');
	});

	it('follows the QA Webservice check to its end', () => {
		const qa = (bucket) => ({ name: 'QA Webservice', bucket, link: 'https://dd.lucca.tech/qa/run/82348/e2e' });
		const comments = [{ body: '🎮' }];
		assert.equal(classify({ checks: [front('pass'), qa('pending')], comments }).qa, 'running');
		const done = classify({ checks: [front('pass'), qa('fail')], comments });
		assert.deepEqual([done.qa, done.qaBucket, done.qaRun], ['done', 'fail', 82348]);
	});
});

/** Runs the script with a stub `gh` answering from `answers` (first matching prefix wins) and logging its calls. */
function runScript(args, answers) {
	const dir = mkdtempSync(path.join(tmpdir(), 'bump-qa-test-'));
	const log = path.join(dir, 'calls.log');
	writeFileSync(path.join(dir, 'answers.json'), JSON.stringify(answers));
	const stub = `#!/usr/bin/env node
const fs = require('node:fs');
const args = process.argv.slice(2).join(' ');
fs.appendFileSync(${JSON.stringify(log)}, args + '\\n');
const answers = JSON.parse(fs.readFileSync(${JSON.stringify(path.join(dir, 'answers.json'))}, 'utf8'));
const hit = answers.find(([prefix]) => args.startsWith(prefix));
if (!hit) { process.stderr.write('unexpected gh ' + args); process.exit(99); }
process.stdout.write(hit[1]);
process.exit(hit[2] ?? 0);
`;
	writeFileSync(path.join(dir, 'gh'), stub);
	chmodSync(path.join(dir, 'gh'), 0o755);
	const r = spawnSync(process.execPath, [SCRIPT, ...args], {
		encoding: 'utf8',
		env: { ...process.env, PATH: `${dir}${path.delimiter}${process.env.PATH}` },
	});
	let calls = [];
	try {
		calls = readFileSync(log, 'utf8').trim().split('\n');
	} catch {
		// no gh call
	}
	return { ...r, calls };
}

const PR = (repo) => [
	`pr list --repo LuccaSA/${repo} --head chore/lucca-front-22.2.0`,
	JSON.stringify([{ number: 7, url: `https://github.com/LuccaSA/${repo}/pull/7` }]),
];
const NO_PR = (repo) => [`pr list --repo LuccaSA/${repo} --head chore/lucca-front-22.2.0`, '[]'];
const CHECKS = (repo, checks, exit = 0) => [`pr checks 7 --repo LuccaSA/${repo}`, JSON.stringify(checks), exit];
const COMMENTS = (repo, comments) => [`pr view 7 --repo LuccaSA/${repo} --json comments`, JSON.stringify(comments)];

describe('status', () => {
	it('posts the 🎮 with --trigger once the front CI is green, and reports a QA not finished (exit 3)', () => {
		const r = runScript(
			['status', '22.2.0', '--repos', 'Figgo', '--trigger'],
			[
				PR('Figgo'),
				CHECKS('Figgo', [{ name: 'front / ci', bucket: 'pass', startedAt: '1' }]),
				COMMENTS('Figgo', []),
				['pr comment 7 --repo LuccaSA/Figgo --body 🎮', ''],
			],
		);
		assert.equal(r.status, 3);
		assert.ok(r.calls.includes('pr comment 7 --repo LuccaSA/Figgo --body 🎮'));
		assert.match(r.stdout, /triggered now/);
	});

	it('does not post the 🎮 without --trigger', () => {
		const r = runScript(
			['status', '22.2.0', '--repos', 'Figgo'],
			[PR('Figgo'), CHECKS('Figgo', [{ name: 'front / ci', bucket: 'pass', startedAt: '1' }]), COMMENTS('Figgo', [])],
		);
		assert.equal(
			r.calls.some((c) => c.startsWith('pr comment')),
			false,
		);
	});

	it('does not post the 🎮 on a failed front CI, and links the job', () => {
		const r = runScript(
			['status', '22.2.0', '--repos', 'Figgo', '--trigger'],
			[
				PR('Figgo'),
				CHECKS('Figgo', [{ name: 'front / ci', bucket: 'fail', startedAt: '1', link: 'https://ci/job/1' }], 1),
				COMMENTS('Figgo', []),
			],
		);
		assert.equal(
			r.calls.some((c) => c.startsWith('pr comment')),
			false,
		);
		assert.match(r.stdout, /fail \(\[job\]\(https:\/\/ci\/job\/1\)\)/);
	});

	it('exits 0 once every QA is done, with the dd run of each', () => {
		const r = runScript(
			['status', '22.2.0', '--repos', 'Figgo,Talent.Training', '--json'],
			[
				PR('Figgo'),
				CHECKS(
					'Figgo',
					[
						{ name: 'front / ci', bucket: 'pass', startedAt: '1' },
						{ name: 'QA Webservice', bucket: 'fail', startedAt: '2', link: 'https://dd.lucca.tech/qa/run/90001/e2e' },
					],
					1,
				),
				COMMENTS('Figgo', [{ body: '🎮' }]),
				NO_PR('Talent.Training'),
			],
		);
		assert.equal(r.status, 0, r.stderr);
		const rows = JSON.parse(r.stdout);
		assert.deepEqual(
			rows.map((row) => [row.repo, row.qaRun]),
			[
				['Figgo', 90001],
				['Talent.Training', undefined],
			],
		);
	});

	it('keeps going when gh answers no check yet', () => {
		const r = runScript(['status', '22.2.0', '--repos', 'Figgo'], [PR('Figgo'), CHECKS('Figgo', [], 1), COMMENTS('Figgo', [])]);
		assert.equal(r.status, 3);
		assert.match(r.stdout, /\| missing \|/);
	});
});

describe('close and usage', () => {
	it('closes the open pull request and deletes its branch', () => {
		const r = runScript(
			['close', '22.2.0', '--repos', 'Figgo,Poplee.Talent'],
			[PR('Figgo'), NO_PR('Poplee.Talent'), ['pr close 7 --repo LuccaSA/Figgo --delete-branch', '']],
		);
		assert.equal(r.status, 0, r.stdout);
		assert.match(r.stdout, /Figgo: ✅ closed/);
		assert.match(r.stdout, /Poplee.Talent: ⏭️ {2}no open pull request/);
	});

	it('refuses a version that is not a full version', () => {
		const r = runScript(['open', '22.2'], []);
		assert.equal(r.status, 1);
		assert.deepEqual(r.calls, []);
	});
});
