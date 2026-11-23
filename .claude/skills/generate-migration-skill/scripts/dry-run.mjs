#!/usr/bin/env node
// Runs a Lucca Front schematic in dry-run on a consumer project, from the schematics built locally in dist/ (`node build.js`).
// Used to simulate a migration skill before the version is published: nothing is written in the project.
// Usage: node .claude/skills/generate-migration-skill/scripts/dry-run.mjs --project <path> --schematic <name> [--dump <path fragment> --out <file>]
// Prints the schematic's logs, one line per file it would create or update, and DONE.
// --dump writes the would-be content of the first file whose path contains <path fragment> (a component, the schematic's report) to <file>.

import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const arg = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const project = arg('--project');
const schematic = arg('--schematic');
if (!project || !schematic) {
	console.error('Usage: dry-run.mjs --project <path> --schematic <name> [--dump <path fragment> --out <file>]');
	process.exit(2);
}

// The script lives in <lucca-front>/.claude/skills/generate-migration-skill/scripts.
const luccaFront = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const collection = join(luccaFront, 'dist/ng/schematics/collection.json');
const require = createRequire(join(luccaFront, 'package.json'));
const { NodeWorkflow } = require('@angular-devkit/schematics/tools');
const { logging } = require('@angular-devkit/core');

const logger = new logging.Logger('dry-run');
logger.subscribe((entry) => console.log(`${entry.level === 'warn' ? 'WARN ' : ''}${entry.message}`));

const workflow = new NodeWorkflow(resolve(project), { dryRun: true, force: false, resolvePaths: [luccaFront], schemaValidation: true });
let dumped = false;
workflow.reporter.subscribe((event) => {
	console.log(`${event.kind.toUpperCase()} ${event.path}`);
	const dump = arg('--dump');
	if (dump && !dumped && event.content && event.path.includes(dump)) {
		writeFileSync(arg('--out'), event.content);
		dumped = true;
	}
});

try {
	await workflow.execute({ collection, schematic, options: {}, logger, allowPrivate: true }).toPromise();
	console.log('DONE');
} catch (error) {
	console.error(`ERROR ${error.message}`);
	console.error(`Is ${collection} built? Run \`node build.js\` in lucca-front.`);
	process.exit(1);
}
