const fs = require('fs');
const path = require('path');
const { getCountries } = require('libphonenumber-js');

const ROOT = path.join(__dirname, '..', '..');
const INPUT = path.join(ROOT, 'dist', 'web-components', 'browser');
const OUTPUT = path.join(ROOT, 'dist', 'web-components');

const ICON_FONT = path.join(ROOT, 'packages', 'icons', 'font', 'lucca-icons.woff2');

const CDN = 'https://cdn.lucca.fr';

// Set by the deploy workflow from the release tag
const VERSION = process.env.VERSION || 'dev';

const toDataUrl = (buffer) => `url(data:font/woff2;base64,${buffer.toString('base64')})`;

const readSource = (file) => fs.readFileSync(path.join(ROOT, 'packages', 'ng', file), 'utf8');
const quotedNames = (source) => [...source.matchAll(/'([\w-]+)'/g)].map(([, name]) => name);

/**
 * Images of the exposed components built from a name at runtime, which sandboxed pages cannot load from the CDN.
 */
function computedImageUrls() {
	const fancyIllustrations = quotedNames(/DIALOG_FANCY_ILLUSTRATION = \[([^\]]+)\]/.exec(readSource('dialog/dialog.type.ts'))[1]);
	return [
		...getCountries().map((country) => `${CDN}/assets/misc/flags/${country}.svg`),
		...['pdf', 'xls', 'xlsx', 'doc', 'csv', 'image', 'default'].map((icon) => `${CDN}/transverse/prisme/visuals/file-entry/${icon}.svg`),
		`${CDN}/transverse/prisme/visuals/fancy-dialog/background-bubbles.svg`,
		...fancyIllustrations.map((illustration) => `${CDN}/transverse/prisme/visuals/fancy-dialog/foreground-${illustration}.svg`),
		...quotedNames(readSource('bubble-illustration/bubble-illustration.ts')).map(
			(illustration) => `${CDN}/transverse/prisme/visuals/bubble-illustration/${illustration}.svg`,
		),
	];
}

async function fetchBuffer(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Cannot fetch ${url}: ${response.status}`);
	}
	return Buffer.from(await response.arrayBuffer());
}

async function build() {
	// Consumers may inline the bundle in a <script> tag: escape the sequences that would end it.
	// They only appear in string and regex literals, where the escaped forms are equivalent.
	const js = fs
		.readFileSync(path.join(INPUT, 'main.js'), 'utf8')
		.replaceAll('<!--', '\\x3C!--')
		.replace(/<\/script/gi, '<\\/script');

	let css = fs.readFileSync(path.join(INPUT, 'styles.css'), 'utf8');

	// Inline the fonts so the bundle does not depend on cdn.lucca.fr, which sandboxed pages cannot reach
	const iconFontSrc = /src:\s*url\([^)]*lucca-icons\.woff2\)\s*format\("woff2"\),\s*url\([^)]*lucca-icons\.woff\)\s*format\("woff"\)/;
	if (!iconFontSrc.test(css)) {
		throw new Error('Icon font declaration not found in styles.css');
	}
	css = css.replace(iconFontSrc, `src: ${toDataUrl(fs.readFileSync(ICON_FONT))} format("woff2")`);

	// Text fonts (SourceSans, LuccaSans) are not in the repository: fetch them from the CDN
	const textFontUrls = [...new Set(css.match(/url\(\/\/cdn\.lucca\.fr\/transverse\/fonts\/[^)]+\.woff2\)/g) ?? [])];
	for (const url of textFontUrls) {
		css = css.replaceAll(url, toDataUrl(await fetchBuffer(`https:${url.slice('url('.length, -1)}`)));
	}

	// SVG images, kept as text: the computed ones must all exist, the literal ones found in the bundle are embedded when available
	const computedUrls = computedImageUrls();
	const literalUrls = [...new Set([js, css].join('\n').match(/https:\/\/cdn\.lucca\.fr\/[\w./-]+\.svg/g) ?? [])].filter(
		(url) => !computedUrls.includes(url),
	);
	const images = {};
	await Promise.all([
		...computedUrls.map(async (url) => (images[url] = (await fetchBuffer(url)).toString('utf8'))),
		...literalUrls.map(async (url) => {
			try {
				images[url] = (await fetchBuffer(url)).toString('utf8');
			} catch (error) {
				console.warn(`Not embedded: ${error.message}`);
			}
		}),
	]);
	// Resolved in the stylesheet now, at runtime by the bundle (see src/images.ts) for the rest
	css = css.replace(/url\((https:\/\/cdn\.lucca\.fr\/[\w./-]+\.svg)\)/g, (match, url) =>
		images[url] ? `url(data:image/svg+xml;base64,${Buffer.from(images[url]).toString('base64')})` : match,
	);

	if (/<\/style/i.test(css)) {
		throw new Error('styles.css contains </style, it cannot be inlined');
	}

	const header = `/*! @lucca-front/web-components ${VERSION} */\n`;

	// The application builder emits top-level declarations: wrap them so the bundle runs as one classic script without leaking globals.
	// `PRISME_VERSION` and `PRISME_IMAGES` are read by the sources.
	fs.writeFileSync(
		path.join(OUTPUT, 'bundle.js'),
		`${header}(() => {\nconst PRISME_VERSION = ${JSON.stringify(VERSION)};\nconst PRISME_IMAGES = ${JSON.stringify(images).replaceAll('<', '\\u003c')};\n${js}\n})();\n`,
	);
	// `@charset` must stay the very first rule
	fs.writeFileSync(
		path.join(OUTPUT, 'bundle.css'),
		css.replace(/^(@charset "[^"]+";)?/, (charset) => `${charset}\n${header}`),
	);
	fs.writeFileSync(path.join(OUTPUT, 'version.txt'), `${VERSION}\n`);

	console.log(
		`Bundle ${VERSION} written to ${path.relative(ROOT, OUTPUT)}/bundle.{js,css} (${textFontUrls.length} text fonts, ${Object.keys(images).length} images inlined)`,
	);
}

build().catch((error) => {
	console.error(error);
	process.exit(1);
});
