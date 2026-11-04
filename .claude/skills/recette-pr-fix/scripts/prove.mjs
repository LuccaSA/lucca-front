#!/usr/bin/env node
// Proof of a fix on a Storybook story of two deployed previews (e.g. master and PR-<n>).
// A scenario puts the story in the state of the fix, then every proof is collected in that state on both sides —
// capture, observed values, axe audit, console errors, optional video — and the proofs that differ are reported.
// Whatever the fix changes (painting, cursor, ARIA, focus, behavior), at least one of them can show it.
//
// List candidate stories:  node prove.mjs --list <previewUrl> <keyword>...
// Prove:                   node prove.mjs --after <previewUrl> [--before <previewUrl>] --out <dir> --story <storyId>
//                            [--scenario <file.mjs>] [--name <state>] [--hover <selector>] [--touch] [--video] [--control]
//
// The scenario is an ES module whose default export receives { page, settle } once the story is rendered, acts on it,
// and may return { observed: { <label>: <value> }, reproduced: <the bug happened>, detail: '<what was observed>' }.
// Without a scenario, the story is proved at rest (or hovered, with --hover).
// --control marks a control case: the state must stay unchanged by the fix.
// Exit code: 0 when the verdict is ✅, 1 otherwise.

import { mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { auditA11y, diffA11y, summarize } from './lib/a11y.mjs';
import { contentBox, union } from './lib/capture.mjs';
import { contextOptions, openStory, settle, trimPreviewUrl as trim } from './lib/storybook.mjs';

const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args.splice(args.indexOf(name), 2)[1] : undefined);
const flag = (name) => (args.includes(name) ? Boolean(args.splice(args.indexOf(name), 1)) : false);

const list = trim(option('--list'));
if (list) {
	const index = await (await fetch(`${list}/index.json`)).json();
	const keywords = args.map((k) => k.toLowerCase().replace(/[^a-z0-9]/g, ''));
	const matches = Object.values(index.entries).filter(
		(e) =>
			e.type === 'story' &&
			keywords.some(
				(k) =>
					e.id.replace(/[^a-z0-9]/g, '').includes(k) ||
					e.importPath
						.toLowerCase()
						.replace(/[^a-z0-9/]/g, '')
						.includes(k),
			),
	);
	for (const e of matches) console.log(`${e.id}\t${e.title} / ${e.name}`);
	if (!matches.length) console.log(`No story matches ${args.join(', ')}`);
	process.exit(0);
}

const after = trim(option('--after'));
const before = trim(option('--before'));
const out = option('--out');
const story = option('--story');
const scenarioFile = option('--scenario');
const name = option('--name');
const hover = option('--hover'); // CSS selector hovered before the scenario
const touch = flag('--touch'); // touch device: (hover: none), (pointer: coarse)
const video = flag('--video');
const control = flag('--control');
if (!after || !out || !story) {
	console.error(
		'Usage: prove.mjs --after <previewUrl> [--before <previewUrl>] --out <dir> --story <storyId> [--scenario <file.mjs>] [--name <state>] [--hover <selector>] [--touch] [--video] [--control]',
	);
	process.exit(2);
}
mkdirSync(out, { recursive: true });
const scenario = scenarioFile ? (await import(pathToFileURL(resolve(scenarioFile)).href)).default : null;
const label = name ? `${story}--${name}` : story;

const browser = await chromium.launch();
const sides = {};
try {
	// Both sides stay open until the capture: they share the same clip
	const opened = await Promise.all(
		Object.entries(before ? { before, after } : { after }).map(async ([side, url]) => [side, await enter(url)]),
	);
	Object.assign(sides, Object.fromEntries(opened));
	const ready = Object.values(sides).filter((s) => s.page);
	const clip = union((await Promise.all(ready.map((s) => contentBox(s.page)))).filter(Boolean));
	for (const [side, s] of Object.entries(sides)) {
		if (!s.page) continue;
		const path = join(out, `${label}--${side}.png`);
		// The tap highlight is painted by the browser, not by the story: it would differ by timing alone
		const style = '* { -webkit-tap-highlight-color: transparent !important; }';
		s.capture = { path, buffer: await s.page.screenshot({ path, clip, fullPage: true, animations: 'disabled', style }) };
		s.a11y = await auditA11y(s.page).catch((error) => ({ error: firstLine(error) }));
	}
} finally {
	for (const [side, s] of Object.entries(sides)) await close(side, s);
	await browser.close();
}

// Opens the story in its own context (one video per side), then puts it in the state of the fix.
async function enter(url) {
	const context = await browser.newContext({
		...contextOptions({ touch }),
		...(video ? { recordVideo: { dir: out, size: { width: 1280, height: 800 } } } : {}),
	});
	const consoleErrors = [];
	context.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()));
	context.on('weberror', (error) => consoleErrors.push(String(error.error())));
	const s = { context, consoleErrors };
	try {
		s.page = await openStory(context, url, story);
		if (!s.page) return { ...s, error: 'story not found' };
		// A violation the base already has at rest is not the fix's doing, even when the fix brings that state back
		s.a11yRest = await auditA11y(s.page).catch(() => []);
		// A hover that does not happen would silently prove the resting state: fail instead
		if (hover) await s.page.hover(hover, { timeout: 5000 }).catch(() => Promise.reject(new Error(`hover "${hover}" failed`)));
		const outcome = scenario
			? await Promise.race([
					scenario({ page: s.page, settle: () => settle(s.page) }),
					new Promise((_, reject) => setTimeout(() => reject(new Error('scenario timed out after 30 s')), 30000)),
				])
			: undefined;
		await settle(s.page);
		return { ...s, observed: outcome?.observed ?? {}, reproduced: outcome?.reproduced, detail: outcome?.detail };
	} catch (error) {
		return { ...s, page: null, error: firstLine(error) };
	}
}

async function close(side, s) {
	const videoPath = video && s.page ? await s.page.video()?.path() : undefined;
	await s.context.close(); // flushes the video
	if (videoPath) {
		s.video = join(out, `${label}--${side}.webm`);
		renameSync(videoPath, s.video);
	}
}

// Report: one line per proof, then the verdict
const { before: b, after: a } = sides;
const failed = Object.entries(sides).filter(([, s]) => s.error);
const lines = [];
const proofs = {};
if (!failed.length) {
	proofs.image = b ? (b.capture.buffer.equals(a.capture.buffer) ? 'identical' : 'differs') : 'no comparison';
	lines.push(
		`image: ${proofs.image}\n      ${Object.entries(sides)
			.map(([side, s]) => `${side}: ${s.capture.path}`)
			.join('\n      ')}`,
	);

	const keys = [...new Set([...Object.keys(b?.observed ?? {}), ...Object.keys(a.observed)])];
	proofs.observed = Object.fromEntries(keys.map((k) => [k, { before: b?.observed[k], after: a.observed[k] }]));
	const changed = keys.filter((k) => b && JSON.stringify(b.observed[k]) !== JSON.stringify(a.observed[k]));
	for (const k of keys) {
		const value = (v) => JSON.stringify(v) ?? 'undefined';
		lines.push(
			`observed ${k}: ${!b ? value(a.observed[k]) : changed.includes(k) ? `${value(b.observed[k])} → ${value(a.observed[k])}` : `${value(a.observed[k])} (unchanged)`}`,
		);
	}
	proofs.changed = changed;

	if (scenario && (a.reproduced !== undefined || b?.reproduced !== undefined)) {
		const side = (s) => (s.reproduced ? 'reproduced' : 'not reproduced') + (s.detail ? ` (${s.detail})` : '');
		lines.push(`replay: ${b ? `before ${side(b)} · ` : ''}after ${side(a)}`);
	}

	lines.push(`a11y: ${a11yLine(b && { state: b.a11y, rest: b.a11yRest }, a.a11y)}`);

	const newErrors = a.consoleErrors.filter((e) => !b?.consoleErrors.includes(e));
	proofs.newConsoleErrors = newErrors;
	lines.push(
		`console: ${newErrors.length ? `⚠️  ${newErrors.length} new error(s): ${newErrors.slice(0, 3).join(' | ')}` : 'no new error'}`,
	);
	if (video)
		lines.push(
			`video:\n      ${Object.entries(sides)
				.map(([side, s]) => `${side}: ${s.video}`)
				.join('\n      ')}`,
		);
}

const verdict = verdictOf();
console.log(`${verdict} — ${label}${control ? ' (control)' : ''}`);
for (const [side, s] of failed) console.log(`   ${side}: ${s.error}`);
for (const line of lines) console.log(`   ${line}`);

writeFileSync(
	join(out, `${label}.json`),
	JSON.stringify(
		{
			story,
			name,
			control,
			options: { hover, touch, scenario: scenarioFile },
			verdict,
			proofs,
			a11y: b?.a11y && a?.a11y && !b.a11y.error && !a.a11y.error ? a11yDiff({ state: b.a11y, rest: b.a11yRest }, a.a11y) : a?.a11y,
			files: Object.fromEntries(Object.entries(sides).map(([side, s]) => [side, { image: s.capture?.path, video: s.video }])),
		},
		null,
		'\t',
	),
);
process.exit(verdict.startsWith('✅') ? 0 : 1);

function verdictOf() {
	if (failed.length) return '❌ Could not prove';
	if (!b) return 'ℹ️  No "before" to compare: the values alone prove nothing';
	if (a.reproduced !== undefined || b.reproduced !== undefined) {
		if (a.reproduced) return '❌ The bug is still reproduced with the fix';
		if (!b.reproduced) return '⚠️  The scenario does not reproduce the bug without the fix: it proves nothing';
		return '✅ Reproduced without the fix, no longer with it';
	}
	const differs = proofs.image === 'differs' || proofs.changed.length > 0;
	if (control) return differs ? '⚠️  The control case changed' : '✅ Unchanged, as expected';
	return differs
		? `✅ Differs: ${[proofs.image === 'differs' && 'image', ...proofs.changed].filter(Boolean).join(', ')}`
		: '⚠️  No observable difference: change the state or observe something else';
}

// Only what the change adds or fixes matters: violations already on the base are not the fix's doing.
function a11yLine(before, after) {
	if (after?.error || before?.state.error) return `ℹ️  audit failed: ${after?.error ?? before.state.error}`;
	if (!before) return `ℹ️  ${after.length ? `${after.length} violation(s): ${summarize(after)}` : 'no violation'} (no "before" to compare)`;
	const { added, fixed, existing } = a11yDiff(before, after);
	const parts = [];
	if (added.length) parts.push(`⚠️  ${added.length} new: ${summarize(added)}`);
	if (fixed.length) parts.push(`✅ ${fixed.length} fixed: ${summarize(fixed)}`);
	if (!added.length && !fixed.length) parts.push('✅ no new violation');
	if (existing.length) parts.push(`${existing.length} already on the base`);
	return parts.join(' · ');
}

// Added: absent from the base in this state and at rest. Fixed: present on the base in this state only.
function a11yDiff(before, after) {
	const { added, existing } = diffA11y([...before.state, ...before.rest], after);
	return { added, fixed: diffA11y(before.state, after).fixed, existing };
}

function firstLine(error) {
	return String(error.message ?? error).split('\n')[0];
}
