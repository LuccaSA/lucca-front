const { execFileSync } = require('child_process');
const { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } = require('fs');
const { tmpdir } = require('os');
const { basename, join } = require('path');

const generatedWarning = `// *******************************************
// *** THIS FILE IS GENERATED, DO NOT EDIT ***
// *** The generator is packages/prisme/icon/update-icons.js ***
// *******************************************\n\n`;

const SOURCE_REPO_URL = 'https://github.com/LuccaSA/cdn.lucca.fr.git';
const SOURCE_ICONS_PATH = 'files/transverse/prisme/icons/svg';

function kebabToCamelCase(kebabCase) {
	return kebabCase.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function svgToSymbol(name, svg) {
	const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
	if (!viewBox) {
		throw new Error(`Icon "${name}" has no viewBox`);
	}
	const inner = svg
		.replace(/<!--.*?-->/s, '')
		.replace(/<svg[^>]*>/, '')
		.replace(/<\/svg>\s*$/, '')
		.trim();
	return `\t<symbol id="${name}" viewBox="${viewBox}" fill="currentColor">\n\t\t${inner}\n\t</symbol>`;
}

function getSpriteContentFromSource() {
	const cloneDir = mkdtempSync(join(tmpdir(), 'lucca-front-cdn-source-'));
	try {
		console.log(`Cloning ${SOURCE_REPO_URL}...`);
		execFileSync('git', ['clone', '--depth', '1', '--progress', SOURCE_REPO_URL, cloneDir], { stdio: ['ignore', 'ignore', 'inherit'] });
		const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: cloneDir, encoding: 'utf-8' }).trim();

		const iconsDir = join(cloneDir, SOURCE_ICONS_PATH);
		const names = readdirSync(iconsDir)
			.filter((file) => file.endsWith('.svg') && file !== 'sprite.svg')
			.map((file) => basename(file, '.svg'));

		const symbols = names.map((name) => svgToSymbol(name, readFileSync(join(iconsDir, `${name}.svg`), 'utf-8')));

		console.log(`Built sprite from ${symbols.length} icons cloned from ${SOURCE_REPO_URL}@${sha} (bypassing the CDN).`);
		return `<svg xmlns="http://www.w3.org/2000/svg">\n\t<defs>\n${symbols.join('\n')}\n\t</defs>\n</svg>\n`;
	} finally {
		rmSync(cloneDir, { recursive: true, force: true });
	}
}

async function main() {
	const spriteContent = getSpriteContentFromSource();

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

	const icons = canonicalIcons.flatMap((icon) => [
		{ icon, deprecated: false },
		...(aliasesByTarget.get(icon) ?? []).sort().map((alias) => ({ icon: alias, deprecated: true })),
	]);

	const type = `${generatedWarning}export type LuccaIcon =\n\t| ${icons.map(({ icon }) => `'${icon}'`).join('\n\t| ')}\n\t| (string & {});\n`;
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
