const autoprefixer = require('autoprefixer');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const postcss = require('postcss');
const sass = require('sass');
const ts = require('typescript');

const ROOT = __dirname;

const ICONS = path.join(ROOT, 'packages', 'icons');
const SCSS = path.join(ROOT, 'packages', 'scss');
const SCHEMATICS = path.join(ROOT, 'packages', 'ng', 'schematics');

const OUTPUT = path.join(ROOT, 'dist');
const OUTPUT_SCSS = path.join(OUTPUT, 'scss');
const OUTPUT_ICONS = path.join(OUTPUT, 'icons');
const OUTPUT_SCHEMATICS = path.join(OUTPUT, 'ng', 'schematics');

runTask('Lucca Front compilation', async () => {
	// Clean dist directories
	await runTask('Clean dist directories', () => {
		removeDirectory(OUTPUT_SCSS);
		removeDirectory(OUTPUT_ICONS);
		removeDirectory(OUTPUT_SCHEMATICS);
	});

	/**
	 *    _____  _____  _____ _____
	 *   / ____|/ ____|/ ____/ ____|
	 *  | (___ | |    | (___| (___
	 *   \___ \| |     \___ \\___ \
	 *   ____) | |____ ____) |___) |
	 *  |_____/ \_____|_____/_____/
	 */
	const lfScssInput = path.join(SCSS, 'src', 'main-all.scss');
	const lfScssOutput = path.join(OUTPUT_SCSS, 'dist', 'lucca-front.min.css');
	await runTask('@lucca-front/scss compilation', () => compileScss(lfScssInput, lfScssOutput));
	await runTask('@lucca-front/scss copy', () => {
		copyFiles({
			patterns: ['package.json', 'src/**/*.scss'],
			context: SCSS,
			output: OUTPUT_SCSS,
		});
	});

	/**
	 *   _____ _____ ____  _   _  _____
	 *  |_   _/ ____/ __ \| \ | |/ ____|
	 *    | || |   | |  | |  \| | (___
	 *    | || |   | |  | | . ` |\___ \
	 *   _| || |___| |__| | |\  |____) |
	 *  |_____\_____\____/|_| \_|_____/
	 */
	const lfIconsInput = path.join(ICONS, 'src', 'main.scss');
	const lfIconsOutput = path.join(OUTPUT_ICONS, 'dist', 'lucca-icons.min.css');
	await runTask('@lucca-front/icons compilation', () => compileScss(lfIconsInput, lfIconsOutput));
	await runTask('@lucca-front/icons copy', () => {
		copyFiles({
			patterns: ['lucca-icons.*'],
			context: path.join(ICONS, 'font'),
			output: OUTPUT_ICONS,
		});
		copyFiles({
			patterns: ['lucca-icon.d.ts', 'package.json', 'src/**'],
			context: ICONS,
			output: OUTPUT_ICONS,
		});
	});

	/**
	 *    _____  _____ _    _ ______ __  __       _______ _____ _____  _____
	 *   / ____|/ ____| |  | |  ____|  \/  |   /\|__   __|_   _/ ____|/ ____|
	 *  | (___ | |    | |__| | |__  | \  / |  /  \  | |    | || |    | (___
	 *   \___ \| |    |  __  |  __| | |\/| | / /\ \ | |    | || |     \___ \
	 *   ____) | |____| |  | | |____| |  | |/ ____ \| |   _| || |____ ____) |
	 *  |_____/ \_____|_|  |_|______|_|  |_/_/    \_\_|  |_____\_____|_____/
	 */
	await runTask('Schematics TS compilation', () => compileTypescript(SCHEMATICS, OUTPUT_SCHEMATICS));
	await runTask('Schematics copy', () => {
		copyFiles({
			patterns: ['collection.json', 'migrations.json', 'lib/local-deps/package.json', 'lib/local-deps/package-lock.json'],
			context: SCHEMATICS,
			output: OUTPUT_SCHEMATICS,
		});
	});
});

/**
 *   _    _ _______ _____ _       _____
 *  | |  | |__   __|_   _| |     / ____|
 *  | |  | |  | |    | | | |    | (___
 *  | |  | |  | |    | | | |     \___ \
 *  | |__| |  | |   _| |_| |____ ____) |
 *   \____/   |_|  |_____|______|_____/
 */

/**
 *
 * @param {string} input
 * @param {string} output
 */
async function compileScss(input, output) {
	const result = sass.compile(input, {
		style: 'compressed',
		loadPaths: ['node_modules'],
	});
	const prefixed = await postcss([autoprefixer]).process(result.css, { from: input });
	writeFile(output, prefixed.css);
}

/**
 *
 * @param {string} file
 * @param {string} content
 */
function writeFile(file, content) {
	const fileDir = path.dirname(file);

	if (!fs.existsSync(fileDir)) {
		fs.mkdirSync(fileDir, { recursive: true });
	}

	fs.writeFileSync(file, content);
}

/**
 *
 * @param {string} dir
 */
function removeDirectory(dir) {
	if (fs.existsSync(dir)) {
		fs.rmSync(dir, { recursive: true });
	}
}

/**
 *
 * @param {{ patterns: string[], context: string, output: string }} options
 */
function copyFiles({ patterns, context, output }) {
	for (const pattern of patterns) {
		const files = glob.sync(pattern, { cwd: context, nodir: true });

		for (const file of files) {
			const inputFilePath = path.join(context, file);
			const outputFilePath = path.join(output, file);
			fs.cpSync(inputFilePath, outputFilePath);
		}
	}
}

/**
 *
 * @param {string} input
 * @param {string} output
 */
function compileTypescript(input, output) {
	const excluded = glob.sync('**/tests/**/*.ts', { cwd: input });
	const files = glob
		.sync('**/*.ts', { cwd: input })
		.filter((p) => !excluded.includes(p))
		.map((p) => path.join(input, p));

	const host = ts.createCompilerHost({});
	host.writeFile = (fileName, contents) => writeFile(fileName, contents);

	const program = ts.createProgram(
		files,
		{
			target: ts.ScriptTarget.ES2020,
			module: ts.ModuleKind.CommonJS,
			moduleResolution: ts.ModuleResolutionKind.Node16,
			lib: ['ES2020', 'dom'],
			outDir: output,
		},
		host,
	);
	program.emit();
}

/**
 * @param {string} taskName
 * @param {() => void | Promise<void>)} func
 */
async function runTask(taskName, func) {
	console.log(`[${taskName}] Running…`);
	const from = Date.now();
	await func();
	console.log(`[${taskName}] Done in ${new Intl.NumberFormat().format(Date.now() - from)}ms`);
}
