import * as fontkit from 'fontkit';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import postcss from 'postcss';
import * as sass from 'sass';
import { characterSets, languagePangrams } from '../../stories/qa/typography/typography-fonts-content';

interface FontFace {
	family: string;
	weight: number;
	style: 'normal' | 'italic';
	url: string;
}

function readFontFaces(): FontFace[] {
	const result = sass.compileString(
		`
			@use '@lucca-front/scss/src/commons/base';
			@include base.base;
		`,
		{ loadPaths: ['.', 'node_modules'] },
	);

	const root = postcss.parse(result.css);
	const faces: FontFace[] = [];

	root.walkAtRules('font-face', (rule) => {
		const decl: Record<string, string> = {};
		rule.walkDecls((d) => {
			decl[d.prop] = d.value;
		});

		const urlMatch = decl.src?.match(/url\(["']?(.*?)["']?\)/);
		if (!urlMatch) {
			return;
		}

		faces.push({
			family: decl['font-family']?.replace(/^["']|["']$/g, ''),
			weight: Number(decl['font-weight']),
			style: decl['font-style'] === 'italic' ? 'italic' : 'normal',
			url: urlMatch[1].startsWith('//') ? `https:${urlMatch[1]}` : urlMatch[1],
		});
	});

	return faces;
}

function collectCorpusCharacters(): string[] {
	const characters = new Set<string>();

	const collect = (text: string, label?: string) => {
		for (const character of Array.from(text.normalize('NFC'))) {
			if (character === ' ' && label !== 'Spaces') {
				continue;
			}
			characters.add(character);
		}
	};

	for (const pangram of languagePangrams) {
		collect(pangram.lowercase);
		collect(pangram.lowercase.toLocaleUpperCase(pangram.lang));
	}
	for (const set of characterSets) {
		collect(set.text, set.label);
	}

	return [...characters];
}

async function fetchCoveredCodePoints(url: string): Promise<Set<number> | null> {
	const response = await fetch(url);
	if (!response.ok) {
		console.warn(`  ! ${url} -> HTTP ${response.status}, skipping`);
		return null;
	}
	const buffer = Buffer.from(await response.arrayBuffer());
	const font = fontkit.create(buffer);
	return new Set(font.characterSet);
}

async function main(): Promise<void> {
	const corpus = collectCorpusCharacters();
	const fontFaces = readFontFaces();

	const facesByVariant = new Map<string, FontFace[]>();
	for (const face of fontFaces) {
		const key = `${face.family}-${face.weight}-${face.style}`;
		facesByVariant.set(key, [...(facesByVariant.get(key) ?? []), face]);
	}

	const missingByVariant: Record<string, string[]> = {};

	for (const [key, faces] of facesByVariant) {
		const covered = new Set<number>();

		for (const face of faces) {
			const codePoints = await fetchCoveredCodePoints(face.url);
			codePoints?.forEach((codePoint) => covered.add(codePoint));
		}

		const missing = corpus.filter((character) => !covered.has(character.codePointAt(0) ?? 0));
		missingByVariant[key] = missing;
		console.log(`${key}: ${missing.length} / ${corpus.length} corpus characters missing (${faces.length} font file(s))`);
	}

	const allMissing = [...new Set(Object.values(missingByVariant).flat())].sort((a, b) => (a.codePointAt(0) ?? 0) - (b.codePointAt(0) ?? 0));

	const generatedWarning = `// *****************************************************************\n// *** THIS FILE IS GENERATED, DO NOT EDIT ***\n// *** Run \`npm run typography:update-font-coverage\` to regenerate ***\n// *****************************************************************\n\n`;

	const entries = Object.entries(missingByVariant)
		.map(([key, missing]) => `\t${JSON.stringify(key)}: ${JSON.stringify(missing)},`)
		.join('\n');

	const output = `${generatedWarning}export type TypographyFontFamily = 'SourceSans' | 'LuccaSans';

const missingCharactersByVariant: Record<string, string[]> = {
${entries}
};

export function getMissingCharacters(family: TypographyFontFamily, weight: number, style: 'normal' | 'italic' = 'normal'): ReadonlySet<string> {
	return new Set(missingCharactersByVariant[\`\${family}-\${weight}-\${style}\`] ?? []);
}

export const allMissingCharacters: string[] = ${JSON.stringify(allMissing)};
`;

	const outputPath = join(__dirname, '../../stories/qa/typography/typography-font-coverage.generated.ts');
	writeFileSync(outputPath, output);
	console.log(`Written to ${outputPath}`);
}

main().catch((error) => {
	console.error('Failed to generate typography font coverage:', error);
	process.exitCode = 1;
});
