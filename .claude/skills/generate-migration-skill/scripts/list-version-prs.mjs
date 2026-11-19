#!/usr/bin/env node
// Lists the PRs that ship for the first time in a Lucca Front minor, and flags those that may need a migration step.
// A PR merged on release/X.Y after the previous minor was cut, but already released in one of its patches, is left out:
// projects already have it before moving to X.Y.
// Usage: node .claude/skills/generate-migration-skill/scripts/list-version-prs.mjs --version 22.2 [--head origin/release/22.2] [--all]
// --all lists every PR, not only the flagged ones.

import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const arg = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const version = arg('--version');
if (!/^\d+\.\d+$/.test(version ?? '')) {
	console.error('Usage: list-version-prs.mjs --version <major.minor> [--head <ref>] [--all]');
	process.exit(2);
}

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const lines = (s) => (s ? s.split('\n') : []);
const prNumbers = (range) =>
	new Set(lines(git('log', '--no-merges', '--format=%s', range)).flatMap((s) => [...s.matchAll(/\(#(\d+)\)/g)].map((m) => m[1])));

const [major, minor] = version.split('.').map(Number);
const head = arg('--head') ?? `origin/release/${version}`;

// The previous minor: X.(Y-1), or the last minor of the previous major for X.0.
const tags = lines(git('tag', '--list', 'v*.*.*', '--sort=-v:refname')).filter((t) => /^v\d+\.\d+\.\d+$/.test(t));
const previous =
	minor > 0
		? `${major}.${minor - 1}`
		: tags
				.map((t) => t.slice(1).split('.'))
				.find(([M]) => Number(M) === major - 1)
				?.slice(0, 2)
				.join('.');
const previousTags = tags.filter((t) => t.startsWith(`v${previous}.`));
if (!previous || !previousTags.length) {
	console.error(`No release tag found for the previous minor (${previous ?? '?'}).`);
	process.exit(2);
}
const previousStart = `v${previous}.0`;
const previousLast = previousTags[0];

const shipped = prNumbers(`${previousStart}..${previousLast}`);
const candidates = [...prNumbers(`${previousStart}..${head}`)].filter((n) => !shipped.has(n));

// Signals of a change that consumers may have to act on.
const labelSignal = /breaking|deprecat|skull|boom/i;
const titleSignal = /deprecat|remov|renam|breaking|schematic|!:/i;
const bodySignal = /deprecat|removed|renamed|breaking|no longer|déprécié|supprimé|renommé/i;

const rows = candidates
	.map((n) => {
		const pr = JSON.parse(execFileSync('gh', ['pr', 'view', n, '--json', 'number,title,labels,files,body'], { encoding: 'utf8' }));
		const labels = pr.labels.map((l) => l.name);
		// The functional description: the first block, before the `-----` separator parsed by the bot.
		const description = (pr.body ?? '').split(/^-----/m)[0];
		const touchesSchematics = pr.files.some((f) => f.path.startsWith('packages/ng/schematics/') && !f.path.includes('/tests/'));
		const flags = [
			labels.some((l) => labelSignal.test(l)) && 'label',
			titleSignal.test(pr.title) && 'title',
			bodySignal.test(description) && 'description',
			touchesSchematics && 'schematic',
		].filter(Boolean);
		return { number: pr.number, title: pr.title, labels, flags };
	})
	.sort((a, b) => a.number - b.number);

const shown = args.includes('--all') ? rows : rows.filter((r) => r.flags.length);

console.log(`list-version-prs · ${version} · head ${head} · previous minor ${previous} (${previousStart} → ${previousLast})`);
console.log(
	`ℹ️  ${candidates.length} PR(s) new in ${version}, ${shipped.size} already shipped in ${previous}.x patches, ${rows.filter((r) => r.flags.length).length} flagged`,
);
console.log('');
for (const r of shown) {
	console.log(`#${r.number} ${r.title}${r.flags.length ? `  [${r.flags.join(', ')}]` : ''}`);
}
