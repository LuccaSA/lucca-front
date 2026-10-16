#!/usr/bin/env node
/**
 * Loads one or more URLs of a served app in headless Chromium and reports console errors
 * and uncaught exceptions (NG0800, NullInjectorError…), which `ng build` and `tsc` do not catch.
 *
 * Requires `playwright` resolvable from the workspace (`npx playwright install chromium` once).
 *
 * Usage:
 *   node check-console.mjs <url> [<url>…] [--storage-state <auth.json>] [--wait <ms>]
 *
 * Exit code 1 when at least one error was captured.
 */
import { createRequire } from 'node:module';
import { join } from 'node:path';

const args = process.argv.slice(2);
const valueOf = (name) => {
	const i = args.indexOf(name);
	return i >= 0 ? args[i + 1] : undefined;
};
const storageState = valueOf('--storage-state');
const wait = Number(valueOf('--wait') ?? 2000);
const urls = args.filter((arg, i) => !arg.startsWith('--') && !['--storage-state', '--wait'].includes(args[i - 1]));

if (!urls.length) {
	console.error('Usage: node check-console.mjs <url> [<url>…] [--storage-state <auth.json>] [--wait <ms>]');
	process.exit(2);
}

let chromium;
try {
	({ chromium } = createRequire(join(process.cwd(), 'package.json'))('playwright'));
} catch {
	console.error('playwright not found: run `npm i -D playwright && npx playwright install chromium` (or use npx -p playwright).');
	process.exit(2);
}

const browser = await chromium.launch();
const context = await browser.newContext(storageState ? { storageState } : {});
let total = 0;

for (const url of urls) {
	const page = await context.newPage();
	const errors = [];
	page.on('console', (msg) => msg.type() === 'error' && errors.push(`console: ${msg.text()}`));
	page.on('pageerror', (error) => errors.push(`uncaught: ${error.message}`));
	try {
		await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
		await page.waitForTimeout(wait);
	} catch (error) {
		errors.push(`navigation: ${error.message}`);
	}
	total += errors.length;
	console.log(`\n${errors.length ? '✗' : '✓'} ${url} (final URL: ${page.url()})`);
	errors.forEach((e) => console.log(`  - ${e}`));
	await page.close();
}

await browser.close();
process.exit(total ? 1 : 0);
