#!/usr/bin/env node
// Replays a bug in a real browser: the scenario must reproduce it on the "before" preview and no longer on the "after" one.
// Covers what specs on happy-dom cannot reproduce (focus, keyboard, overlays, hover, real layout, Storybook lifecycle).
//
// Usage: node bug-repro.mjs --after <previewUrl> [--before <previewUrl>] --story <storyId> --scenario <file.mjs> [--touch] [--video <dir>]
//
// The scenario is an ES module whose default export receives { page, consoleErrors, settle } once the story is rendered
// (`settle()` finishes CSS transitions before reading computed styles),
// acts on it, and returns { reproduced: boolean, detail: string } — `detail` says what was observed, on both sides.
// Exit code: 0 when the bug is reproduced before and not after, 1 otherwise.

import { mkdirSync, renameSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { contextOptions, openStory, trimPreviewUrl } from './lib/storybook.mjs';

const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args.splice(args.indexOf(name), 2)[1] : undefined);
const after = trimPreviewUrl(option('--after'));
const before = trimPreviewUrl(option('--before'));
const story = option('--story');
const scenarioFile = option('--scenario');
const video = option('--video');
const touch = args.includes('--touch');
if (!after || !story || !scenarioFile) {
	console.error(
		'Usage: bug-repro.mjs --after <previewUrl> [--before <previewUrl>] --story <storyId> --scenario <file.mjs> [--touch] [--video <dir>]',
	);
	process.exit(2);
}

const { default: scenario } = await import(pathToFileURL(resolve(scenarioFile)).href);
if (video) mkdirSync(video, { recursive: true });

const browser = await chromium.launch();
const results = {};
try {
	for (const [side, url] of Object.entries(before ? { before, after } : { after })) {
		results[side] = await replay(side, url);
	}
} finally {
	await browser.close();
}

for (const [side, r] of Object.entries(results)) {
	const state = r.error ? `❌ scenario failed: ${r.error}` : r.reproduced ? 'bug reproduced' : 'bug not reproduced';
	console.log(`${side}: ${state}${r.detail ? ` — ${r.detail}` : ''}${r.video ? `\n   video: ${r.video}` : ''}`);
}

const [b, a] = [results.before, results.after];
let verdict;
if (a.error || b?.error) verdict = '❌ The scenario could not run: fix it before concluding';
else if (a.reproduced) verdict = '❌ The bug is still reproduced with the fix';
else if (!b) verdict = 'ℹ️  Not reproduced with the fix, but no "before" to compare: this proves nothing on its own';
else if (!b.reproduced) verdict = '⚠️  The scenario does not reproduce the bug without the fix: it proves nothing';
else verdict = '✅ Reproduced without the fix, no longer with it';
console.log(`\n${verdict}`);
process.exit(verdict.startsWith('✅') ? 0 : 1);

// Runs the scenario on one preview, in its own context so that each side gets its own video.
async function replay(side, url) {
	const context = await browser.newContext({
		...contextOptions({ touch }),
		...(video ? { recordVideo: { dir: video, size: { width: 1280, height: 800 } } } : {}),
	});
	const consoleErrors = [];
	context.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()));
	context.on('weberror', (error) => consoleErrors.push(String(error.error())));
	const result = {};
	try {
		const page = await openStory(context, url, story);
		if (!page) return { error: `story ${story} not found` };
		const outcome = await Promise.race([
			scenario({ page, consoleErrors, settle: () => settle(page) }),
			new Promise((_, reject) => setTimeout(() => reject(new Error('timed out after 30 s')), 30000)),
		]);
		Object.assign(result, { reproduced: Boolean(outcome?.reproduced), detail: outcome?.detail });
		result.videoPath = await page.video()?.path();
	} catch (error) {
		result.error = String(error.message ?? error).split('\n')[0];
	} finally {
		await context.close(); // flushes the video
	}
	if (result.videoPath) {
		result.video = join(video, `${story}--${side}.webm`);
		renameSync(result.videoPath, result.video);
		delete result.videoPath;
	}
	return result;
}

// Finishes running CSS transitions and animations, so that computed styles read their end state.
function settle(page) {
	return page.evaluate(() => document.getAnimations().forEach((animation) => animation.finish()));
}
