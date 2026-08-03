/**
 * Extracts the SCSS deprecation registry (packages/scss/src/commons/deprecated.scss)
 * to a committed JSON manifest that Storybook, CI and downstream tooling consume.
 *
 * The registry emits no CSS: we compile a synthetic entry point that turns on every
 * deprecation-gated branch, `@include deprecated.dump()`, and read the module-level map
 * back through a custom Sass function. No CSS parsing is involved.
 *
 * Usage:
 *   node packages/scss/css-api/extract-deprecations.js           # write deprecations.json
 *   node packages/scss/css-api/extract-deprecations.js --check   # fail if out of date
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sass = require('sass');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUTPUT = path.join(__dirname, 'deprecations.json');

// Maximal config: enable every $deprecated* branch so gated registrations run.
// If a new $deprecated* flag is added to commons/config.scss, add it here.
const CONFIG = `@use '@lucca-front/scss/src/commons/config' with (
	$deprecatedSpacings: true,
	$deprecatedCardBoxMargin: true,
	$deprecatedUtilityPrefix: true,
	$palettesOtherProduct: 'all',
	$fontFamilyCursive: 'Caveat'
);
@use '@lucca-front/scss/src/main-all';
`;

function toJs(value) {
	if (value === null || value.equals(sass.sassNull)) {
		return null;
	}
	if (value instanceof sass.SassString) {
		return value.text;
	}
	if (value instanceof sass.SassBoolean) {
		return value.value;
	}
	if (value instanceof sass.SassNumber) {
		return value.value;
	}
	if (value instanceof sass.SassMap) {
		const out = {};
		value.contents.forEach((v, k) => {
			out[toJs(k)] = toJs(v);
		});
		return out;
	}
	return value.toString();
}

function compile(source, functions = {}) {
	return sass.compileString(source, {
		style: 'compressed',
		loadPaths: [path.join(ROOT, 'node_modules')],
		functions,
	});
}

function extract() {
	let registry = null;
	const withDump = compile(`${CONFIG}@use '@lucca-front/scss/src/commons/deprecated';\n@include deprecated.dump();`, {
		'lf-dump-deprecations($registry)': (args) => {
			registry = toJs(args[0].assertMap('registry'));
			return sass.sassNull;
		},
	});

	// Reliability invariant: the registry mechanism must never change CSS output.
	const withoutDump = compile(CONFIG);
	if (withDump.css !== withoutDump.css) {
		throw new Error('deprecated.dump() altered CSS output — the registry must be output-neutral.');
	}

	if (!registry) {
		throw new Error('lf-dump-deprecations was never called — did deprecated.dump() run?');
	}

	const entries = Object.values(registry)
		.map(({ kind, name, replacement, note, since, scope }) => ({ kind, name, replacement, note, since, scope }))
		.sort((a, b) => a.scope.localeCompare(b.scope) || a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));

	return { version: 1, package: '@lucca-front/scss', entries };
}

function selfCheck(manifest) {
	const { entries } = manifest;
	const byKind = (kind) => entries.filter((e) => e.kind === kind);
	const find = (kind, name) => entries.find((e) => e.kind === kind && e.name === name);

	const problems = [];

	// Minimum counts — guard against a broken compile silently dropping registrations.
	const minimums = { class: 200, 'css-variable': 20, selector: 5, 'sass-api': 5 };
	for (const [kind, min] of Object.entries(minimums)) {
		const count = byKind(kind).length;
		if (count < min) {
			problems.push(`expected >= ${min} "${kind}" entries, found ${count}`);
		}
	}

	// Sentinel entries with exact replacements.
	const sentinels = [
		['class', 'pr-u-marginTop100', 'pr-u-marginBlockStart100'],
		['class', 'pr-u-textLeft', 'pr-u-textAlignStart'],
		['css-variable', '--commons-font-family', '--pr-t-font-family'],
	];
	for (const [kind, name, replacement] of sentinels) {
		const entry = find(kind, name);
		if (!entry) {
			problems.push(`missing sentinel ${kind} "${name}"`);
		} else if (entry.replacement !== replacement) {
			problems.push(`sentinel ${kind} "${name}" replacement is "${entry.replacement}", expected "${replacement}"`);
		}
	}
	if (!find('class', 'u-textLeft')) {
		problems.push('missing u- prefixed sentinel "u-textLeft"');
	}
	if (!find('selector', '.filterBarDeprecated')) {
		problems.push('missing wholly-deprecated component sentinel ".filterBarDeprecated"');
	}

	// A class/css-variable replacement must not itself be a deprecated name (chains must terminate).
	const deprecatedNames = new Set(entries.filter((e) => e.kind === 'class' || e.kind === 'css-variable').map((e) => `${e.kind}|${e.name}`));
	for (const entry of entries) {
		if ((entry.kind === 'class' || entry.kind === 'css-variable') && entry.replacement) {
			if (deprecatedNames.has(`${entry.kind}|${entry.replacement}`)) {
				problems.push(`${entry.kind} "${entry.name}" points at deprecated replacement "${entry.replacement}"`);
			}
		}
	}

	if (problems.length) {
		throw new Error(`deprecations self-check failed:\n  - ${problems.join('\n  - ')}`);
	}
}

function serialize(manifest) {
	return JSON.stringify(manifest, null, '\t') + '\n';
}

function main() {
	const manifest = extract();
	selfCheck(manifest);
	const json = serialize(manifest);

	if (process.argv.includes('--check')) {
		const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf-8') : '';
		if (current !== json) {
			const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 8);
			console.error(`deprecations.json is out of date (${hash(current)} != ${hash(json)}). Run: npm run scss:deprecations`);
			process.exit(1);
		}
		console.log(`deprecations.json is up to date (${manifest.entries.length} entries).`);
	} else {
		fs.writeFileSync(OUTPUT, json);
		console.log(`Wrote ${manifest.entries.length} deprecation entries to ${path.relative(ROOT, OUTPUT)}`);
	}
}

if (require.main === module) {
	main();
}

module.exports = { extract, selfCheck, serialize };
