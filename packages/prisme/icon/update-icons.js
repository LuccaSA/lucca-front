const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

function getDefaultSpriteUrl() {
	const componentSource = readFileSync(join(__dirname, 'icon-sprite.component.ts'), 'utf-8');
	const match = componentSource.match(/const ICON_SPRITE_URL = '([^']+)';/);
	if (!match) {
		throw new Error('Could not find ICON_SPRITE_URL in icon-sprite.component.ts');
	}
	return match[1];
}

const generatedWarning = `// *******************************************
// *** THIS FILE IS GENERATED, DO NOT EDIT ***
// *** The generator is packages/prisme/icon/update-icons.js ***
// *******************************************\n\n`;

function parseArgs(argv) {
	const args = {};
	for (const arg of argv) {
		const [, key, value] = arg.match(/^--([^=]+)=(.*)$/) ?? [];
		if (key) {
			args[key] = value;
		}
	}
	return args;
}

function kebabToCamelCase(kebabCase) {
	return kebabCase.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

async function getSpriteContent(args) {
	if (args.file) {
		return readFileSync(args.file, 'utf-8');
	}
	const url = args.url ?? getDefaultSpriteUrl();
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch sprite from ${url}: ${response.status} ${response.statusText}`);
	}
	return response.text();
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	const spriteContent = await getSpriteContent(args);

	const canonicalIcons = [...spriteContent.matchAll(/<symbol\s+id="([^"]+)"/g)].map((match) => kebabToCamelCase(match[1])).sort();

	require('ts-node').register({
		transpileOnly: true,
		skipProject: true,
		compilerOptions: { module: 'CommonJS', moduleResolution: 'node', target: 'ES2022', ignoreDeprecations: '6.0' },
	});
	const { ICON_ALIASES } = require('./icon-aliases.ts');

	const canonicalIconsSet = new Set(canonicalIcons);
	const orphanAliases = Object.entries(ICON_ALIASES).filter(([, target]) => !canonicalIconsSet.has(target));
	if (orphanAliases.length > 0) {
		throw new Error(
			`ICON_ALIASES points to icons that no longer exist in the sprite: ${orphanAliases.map(([alias, target]) => `'${alias}' -> '${target}'`).join(', ')}`,
		);
	}

	const aliasesByTarget = new Map();
	for (const [alias, target] of Object.entries(ICON_ALIASES)) {
		aliasesByTarget.set(target, [...(aliasesByTarget.get(target) ?? []), alias]);
	}

	// Group each canonical icon with its deprecated aliases, mirroring the previous IcoMoon-based generation.
	const icons = canonicalIcons.flatMap((icon) => [
		{ icon, deprecated: false },
		...(aliasesByTarget.get(icon) ?? []).sort().map((alias) => ({ icon: alias, deprecated: true })),
	]);

	const type = `${generatedWarning}export type LuccaIcon =\n\t| ${icons.map(({ icon }) => `'${icon}'`).join('\n\t| ')};\n`;
	writeFileSync(join(__dirname, 'icons.ts'), type);

	const list = `${generatedWarning}export const IconsList = [\n\t${icons.map(({ icon, deprecated }) => `{ icon: '${icon}', deprecated: ${deprecated} }`).join(',\n\t')},\n];\n`;
	writeFileSync(join(__dirname, '../../../stories/documentation/icons-list.ts'), list);

	console.log(
		`Wrote ${canonicalIcons.length} icons (+ ${icons.length - canonicalIcons.length} deprecated aliases) to icons.ts and icons-list.ts.`,
	);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
