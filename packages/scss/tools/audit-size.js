/**
 * Audits the compiled+compressed size and the deprecation inventory of
 * @lucca-front/scss before vs after a change, to prove the deprecation-registry
 * refactor is size-neutral and that every legacy marker was migrated.
 *
 * Default (`full`) run:
 *   1. resolves the merge-base with origin/rc and checks it out into a temp worktree
 *   2. snapshots sizes (full bundle + every module) and the deprecation inventory of both trees
 *   3. writes scss-size-audit.md at the repo root and exits non-zero if any output changed bytes
 *
 * Usage:
 *   node packages/scss/tools/audit-size.js                 # full before/after audit
 *   node packages/scss/tools/audit-size.js --allow-diff    # don't fail on size differences
 */
const autoprefixer = require('autoprefixer');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const postcss = require('postcss');
const sass = require('sass');
const { pathToFileURL } = require('url');
const zlib = require('zlib');

const MAIN_ROOT = path.resolve(__dirname, '..', '..', '..');
const REPORT = path.join(MAIN_ROOT, 'scss-size-audit.md');

function git(args, cwd = MAIN_ROOT) {
	return execFileSync('git', args, { cwd, encoding: 'utf-8' }).trim();
}

// node_modules/@lucca-front/* are symlinks into the *main* checkout, so a plain
// loadPaths compile of a base-commit worktree would resolve @lucca-front/scss to
// HEAD sources. Pin those prefixes to the tree being measured.
function workspaceImporter(repoRoot) {
	const prefixes = {
		'@lucca-front/scss/': path.join(repoRoot, 'packages', 'scss'),
		'@lucca-front/icons/': path.join(repoRoot, 'packages', 'icons'),
	};
	return {
		findFileUrl(url) {
			for (const [prefix, dir] of Object.entries(prefixes)) {
				if (url.startsWith(prefix)) {
					return pathToFileURL(path.join(dir, url.slice(prefix.length)));
				}
			}
			return null;
		},
	};
}

function measure(css) {
	return {
		raw: Buffer.byteLength(css),
		gzip: zlib.gzipSync(Buffer.from(css), { level: 9 }).length,
		sha256: crypto.createHash('sha256').update(css).digest('hex'),
	};
}

async function snapshotSizes(repoRoot) {
	const opts = {
		style: 'compressed',
		loadPaths: [path.join(MAIN_ROOT, 'node_modules')],
		importers: [workspaceImporter(repoRoot)],
	};
	const src = path.join(repoRoot, 'packages', 'scss', 'src');
	const modules = {};

	// Full bundle — replicate build.js compileScss (compressed + autoprefixer) so
	// numbers match the shipped dist/scss/dist/lucca-front.min.css.
	const bundleInput = path.join(src, 'main-all.scss');
	const bundle = sass.compile(bundleInput, opts);
	const prefixed = await postcss([autoprefixer]).process(bundle.css, { from: bundleInput });
	modules['bundle (lucca-front.min.css)'] = measure(prefixed.css);

	// Maximal config — every $deprecated* branch on — proves gated u-* paths are neutral too.
	const maximal = sass.compileString(
		`@use '@lucca-front/scss/src/commons/config' with ($deprecatedSpacings: true, $deprecatedCardBoxMargin: true, $deprecatedUtilityPrefix: true, $palettesOtherProduct: 'all', $fontFamilyCursive: 'Caveat');\n@use '@lucca-front/scss/src/main-all';`,
		opts,
	);
	modules['bundle (maximal config)'] = measure(maximal.css);

	// Per module — plain compressed (autoprefixer is identical on both sides, so it
	// adds nothing to a delta and doubles the cost across 125 compiles).
	modules['commons (main.scss)'] = measure(sass.compile(path.join(src, 'main.scss'), opts).css);
	const componentsDir = path.join(src, 'components');
	for (const dirent of fs.readdirSync(componentsDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
		if (!dirent.isDirectory() || dirent.name.startsWith('_')) {
			continue;
		}
		const index = path.join(componentsDir, dirent.name, 'index.scss');
		if (fs.existsSync(index)) {
			modules[`components/${dirent.name}`] = measure(sass.compile(index, opts).css);
		}
	}
	return modules;
}

const DEPRECATION_RE = /deprecated/i;

// BEFORE: heuristic scan of legacy comment markers (the fuzziness being fixed).
function scanLegacyMarkers(repoRoot) {
	const srcDir = path.join(repoRoot, 'packages', 'scss', 'src');
	const markers = [];
	const walk = (dir) => {
		for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, dirent.name);
			if (dirent.isDirectory()) {
				walk(full);
			} else if (dirent.name.endsWith('.scss')) {
				const rel = path.relative(repoRoot, full).replace(/\\/g, '/');
				fs.readFileSync(full, 'utf-8').split('\n').forEach((line, i) => {
					const isComment = line.includes('//') || line.includes('/*');
					if (isComment && DEPRECATION_RE.test(line)) {
						markers.push({ file: rel, line: i + 1, text: line.trim() });
					}
				});
			}
		}
	};
	walk(srcDir);
	return markers;
}

// AFTER: exact registry entries, if the manifest exists in the tree.
function readManifest(repoRoot) {
	const file = path.join(repoRoot, 'packages', 'scss', 'css-api', 'deprecations.json');
	if (!fs.existsSync(file)) {
		return null;
	}
	return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function fmtBytes(n) {
	return n.toLocaleString('en-US');
}

function buildReport({ base, head, before, after, beforeMarkers, afterManifest }) {
	const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
	let identical = 0;
	let changed = 0;
	const rows = [];
	for (const key of keys) {
		const b = before[key];
		const a = after[key];
		if (b && a) {
			const same = b.sha256 === a.sha256;
			same ? identical++ : changed++;
			if (!same || process.argv.includes('--full')) {
				rows.push(`| \`${key}\` | ${fmtBytes(b.raw)} | ${fmtBytes(a.raw)} | ${a.raw - b.raw} | ${fmtBytes(b.gzip)} | ${fmtBytes(a.gzip)} | ${same ? '✅' : '⚠️ changed'} |`);
			}
		} else {
			changed++;
			rows.push(`| \`${key}\` | ${b ? fmtBytes(b.raw) : '—'} | ${a ? fmtBytes(a.raw) : '—'} | ${b && a ? a.raw - b.raw : 'n/a'} | ${b ? fmtBytes(b.gzip) : '—'} | ${a ? fmtBytes(a.gzip) : '—'} | ${b ? '➖ removed' : '➕ added'} |`);
		}
	}

	const out = [];
	out.push('# SCSS deprecation refactor — size & inventory audit', '');
	out.push(`- **Base** (before): \`${base}\``);
	out.push(`- **Head** (after): \`${head}\``);
	out.push('');
	out.push('## Compiled + compressed size', '');
	out.push(`**${identical}/${identical + changed} outputs are byte-identical** (sha256).`, '');
	out.push('| Module | Before (B) | After (B) | Δ raw | gzip before | gzip after | Status |');
	out.push('| --- | ---: | ---: | ---: | ---: | ---: | :---: |');
	out.push(...(rows.length ? rows : ['| _(all modules byte-identical; run with `--full` to list)_ | | | | | | |']));
	out.push('');

	// Deprecation inventory.
	out.push('## Deprecated elements — before vs after', '');
	out.push(`- **Before**: ${beforeMarkers.length} legacy comment markers found by heuristic scan (no single machine-readable source).`);
	out.push(`- **After**: ${afterManifest ? afterManifest.entries.length : 0} exact registry entries in \`deprecations.json\`.`, '');

	if (afterManifest) {
		const byKind = {};
		for (const e of afterManifest.entries) {
			byKind[e.kind] = (byKind[e.kind] || 0) + 1;
		}
		out.push('### After — registry entries by kind', '');
		out.push('| Kind | Count |', '| --- | ---: |');
		for (const [kind, count] of Object.entries(byKind).sort()) {
			out.push(`| ${kind} | ${count} |`);
		}
		out.push('');
		out.push('### After — full deprecated inventory', '');
		out.push('| Kind | Name | Replacement | Scope |', '| --- | --- | --- | --- |');
		for (const e of afterManifest.entries) {
			out.push(`| ${e.kind} | \`${e.name}\` | ${e.replacement ? `\`${e.replacement}\`` : '—'} | ${e.scope || ''} |`);
		}
		out.push('');
	}

	out.push('### Before — legacy comment markers', '');
	out.push('| File | Line | Marker |', '| --- | ---: | --- |');
	for (const m of beforeMarkers) {
		out.push(`| ${m.file} | ${m.line} | ${m.text.replace(/\|/g, '\\|')} |`);
	}
	out.push('');

	return { report: out.join('\n'), identical, changed };
}

async function main() {
	const base = git(['merge-base', 'HEAD', 'origin/rc']);
	const head = git(['rev-parse', 'HEAD']);
	const worktree = path.join(os.tmpdir(), `lf-audit-before-${base.slice(0, 8)}`);

	console.log(`Base (before): ${base}`);
	console.log(`Head (after):  ${head}`);

	let before;
	let beforeMarkers;
	try {
		if (fs.existsSync(worktree)) {
			git(['worktree', 'remove', '--force', worktree]);
		}
		git(['worktree', 'add', '--detach', worktree, base]);
		console.log('Measuring BEFORE...');
		before = await snapshotSizes(worktree);
		beforeMarkers = scanLegacyMarkers(worktree);
	} finally {
		try {
			git(['worktree', 'remove', '--force', worktree]);
		} catch (e) {
			console.warn(`Could not remove worktree ${worktree}: ${e.message}`);
		}
	}

	console.log('Measuring AFTER...');
	const after = await snapshotSizes(MAIN_ROOT);
	const afterManifest = readManifest(MAIN_ROOT);

	const { report, identical, changed } = buildReport({ base, head, before, after, beforeMarkers, afterManifest });
	fs.writeFileSync(REPORT, report);
	console.log(`\nWrote ${path.relative(MAIN_ROOT, REPORT)}`);
	console.log(`${identical} identical, ${changed} changed.`);

	if (changed > 0 && !process.argv.includes('--allow-diff')) {
		console.error('\nSize/hash differences detected. See the report. Pass --allow-diff to allow.');
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
