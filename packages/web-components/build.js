const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const INPUT = path.join(ROOT, 'dist', 'web-components', 'browser');
const OUTPUT = path.join(ROOT, 'dist', 'web-components');

const ICON_FONT = path.join(ROOT, 'packages', 'icons', 'font', 'lucca-icons.woff2');

// Set by the deploy workflow from the release tag
const VERSION = process.env.VERSION || 'dev';

const toDataUrl = (buffer) => `url(data:font/woff2;base64,${buffer.toString('base64')})`;

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
		const href = `https:${url.slice('url('.length, -1)}`;
		const response = await fetch(href);
		if (!response.ok) {
			throw new Error(`Cannot fetch ${href}: ${response.status}`);
		}
		css = css.replaceAll(url, toDataUrl(Buffer.from(await response.arrayBuffer())));
	}

	if (/<\/style/i.test(css)) {
		throw new Error('styles.css contains </style, it cannot be inlined');
	}

	const header = `/*! @lucca-front/web-components ${VERSION} */\n`;

	// The application builder emits top-level declarations: wrap them so the bundle runs as one classic script without leaking globals.
	// `PRISME_VERSION` is read by main.ts.
	fs.writeFileSync(path.join(OUTPUT, 'bundle.js'), `${header}(() => {\nconst PRISME_VERSION = ${JSON.stringify(VERSION)};\n${js}\n})();\n`);
	// `@charset` must stay the very first rule
	fs.writeFileSync(
		path.join(OUTPUT, 'bundle.css'),
		css.replace(/^(@charset "[^"]+";)?/, (charset) => `${charset}\n${header}`),
	);
	fs.writeFileSync(path.join(OUTPUT, 'version.txt'), `${VERSION}\n`);

	console.log(`Bundle ${VERSION} written to ${path.relative(ROOT, OUTPUT)}/bundle.{js,css} (${textFontUrls.length} text fonts inlined)`);
}

build().catch((error) => {
	console.error(error);
	process.exit(1);
});
