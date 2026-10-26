#!/usr/bin/env node
// Before/after captures of Storybook stories from two deployed previews (e.g. master and PR-<n>).
// Both captures share the same clip, so they can be compared side by side; identical renders are flagged.
//
// List candidate stories:  node visual-proof.mjs --list <previewUrl> <keyword>...
// Capture:                 node visual-proof.mjs --after <previewUrl> [--before <previewUrl>] --out <dir> <storyId>...
//
// <previewUrl> is a Storybook root, e.g. https://pub-….r2.dev/PR-5557 (no trailing /index.html).

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { contextOptions, openStory, trimPreviewUrl as trim } from './lib/storybook.mjs';

const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args.splice(args.indexOf(name), 2)[1] : undefined);

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
const hover = option('--hover'); // CSS selector hovered before the capture
const touch = args.includes('--touch') ? Boolean(args.splice(args.indexOf('--touch'), 1)) : false; // touch device: (hover: none), (pointer: coarse)
if (!after || !out || !args.length) {
	console.error(
		'Usage: visual-proof.mjs --after <previewUrl> [--before <previewUrl>] --out <dir> [--hover <selector>] [--touch] <storyId>...',
	);
	process.exit(2);
}
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext(contextOptions({ touch }));
const results = [];
try {
	for (const id of args) {
		const sides = before ? { before, after } : { after };
		const opened = await Promise.all(Object.entries(sides).map(async ([side, url]) => [side, await openStory(context, url, id)]));
		const pages = Object.fromEntries(opened);
		const result = { id, files: {} };
		if (hover) {
			// A hover that does not happen would silently capture the resting state: fail the story instead
			const failures = (
				await Promise.all(
					Object.entries(pages).map(([side, p]) =>
						p
							?.hover(hover, { timeout: 5000 })
							.then(() => null)
							.catch(() => side),
					),
				)
			).filter(Boolean);
			if (failures.length) {
				await Promise.all(Object.values(pages).map((p) => p?.close()));
				results.push({ ...result, error: `hover "${hover}" failed (${failures.join(', ')})` });
				continue;
			}
		}
		const boxes = await Promise.all(Object.values(pages).map((p) => (p ? contentBox(p) : null)));
		const clip = union(boxes.filter(Boolean));
		for (const [side, page] of Object.entries(pages)) {
			if (!page) {
				result.files[side] = null;
				continue;
			}
			const path = join(out, `${id}--${side}.png`);
			result.files[side] = { path, buffer: await page.screenshot({ path, clip, fullPage: true, animations: 'disabled' }) };
			await page.close();
		}
		const [b, a] = [result.files.before?.buffer, result.files.after?.buffer];
		result.identical = Boolean(b && a && b.equals(a));
		results.push(result);
	}
} finally {
	await browser.close();
}

for (const r of results) {
	if (r.error) {
		console.log(`❌ ${r.error} ${r.id}`);
		continue;
	}
	const files = Object.entries(r.files).map(([side, f]) => `${side}: ${f ? f.path : 'story not found'}`);
	const status = !r.files.after ? '❌ not found' : r.identical ? '⚠️  identical' : '✅';
	console.log(`${status} ${r.id}\n   ${files.join('\n   ')}`);
}
writeFileSync(
	join(out, 'captures.json'),
	JSON.stringify(
		results.map(({ id, identical, error, files }) => ({
			id,
			identical,
			error,
			files: Object.fromEntries(Object.entries(files).map(([s, f]) => [s, f?.path ?? null])),
		})),
		null,
		'\t',
	),
);

// Union of what is actually painted (text, leaf elements, backgrounds, borders, shadows) — not full-width wrappers.
// Overlays (tooltips, dropdowns, dialogs) are rendered by the CDK outside #storybook-root: they are measured too.
function contentBox(page) {
	return page.evaluate(() => {
		const r = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
		const add = (b) => {
			if (!b.width || !b.height) return;
			r.x1 = Math.min(r.x1, b.left + scrollX);
			r.y1 = Math.min(r.y1, b.top + scrollY);
			r.x2 = Math.max(r.x2, b.right + scrollX);
			r.y2 = Math.max(r.y2, b.bottom + scrollY);
		};
		for (const root of document.querySelectorAll('#storybook-root, .cdk-overlay-container')) {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
			while (walker.nextNode()) {
				const node = walker.currentNode;
				if (node.nodeType === Node.TEXT_NODE) {
					if (!node.textContent.trim()) continue;
					const range = document.createRange();
					range.selectNodeContents(node);
					for (const b of range.getClientRects()) add(b);
					continue;
				}
				// The backdrop covers the whole viewport: measuring it would undo the crop
				if (node.classList.contains('cdk-overlay-backdrop')) continue;
				const s = getComputedStyle(node);
				if (s.display === 'none' || s.visibility === 'hidden') continue;
				const border = ['Top', 'Right', 'Bottom', 'Left'].some(
					(side) => parseFloat(s[`border${side}Width`]) > 0 && s[`border${side}Style`] !== 'none',
				);
				// Text is measured through its text nodes; an empty leaf (live region, positioning box) paints nothing.
				// Icons draw through ::before/::after content, media and form controls through their own box.
				const pseudo = ['::before', '::after'].some((p) => !['none', 'normal'].includes(getComputedStyle(node, p).content));
				const replaced = /^(IMG|SVG|svg|VIDEO|CANVAS|INPUT|TEXTAREA|SELECT|BUTTON)$/.test(node.tagName);
				const painted =
					pseudo ||
					replaced ||
					border ||
					s.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
					s.backgroundImage !== 'none' ||
					s.boxShadow !== 'none';
				if (painted) add(node.getBoundingClientRect());
			}
		}
		return Number.isFinite(r.x1) ? r : null;
	});
}

function union(boxes) {
	const pad = 16;
	if (!boxes.length) return { x: 0, y: 0, width: 1280, height: 800 };
	const x1 = Math.max(0, Math.min(...boxes.map((b) => b.x1)) - pad);
	const y1 = Math.max(0, Math.min(...boxes.map((b) => b.y1)) - pad);
	const x2 = Math.max(...boxes.map((b) => b.x2)) + pad;
	const y2 = Math.max(...boxes.map((b) => b.y2)) + pad;
	return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}
