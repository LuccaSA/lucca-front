let gulp = require('gulp');
let merge = require('merge2');
let sass = require('node-sass');
let clean = require('gulp-clean');
let ts = require('gulp-typescript');
let runSequence = require('run-sequence');
let sourcemaps = require('gulp-sourcemaps');
let inlineNg2Template = require('gulp-inline-ng2-template');
let gulpFile = require('gulp-file');
let doc = require('./misc/api-doc');
let glob = require('glob');

const INLINE_OPTIONS = {
	useRelativePaths: true,
	styleProcessor: compileScss,
	removeLineBreaks: true,
	target: 'es5'
}

const TSCONFIG_PATH = './src/tsconfig.json';
const OUT_DIR = './dist';

gulp.task('build', callback => runSequence(
	'dist:clean',
	'build:inline-and-compile',
	callback
));

gulp.task('dist:clean', () => {
	return gulp.src(OUT_DIR, { read: false })
		.pipe(clean());
});

gulp.task('build:inline-and-compile', () => {
	let tsProject = ts.createProject(TSCONFIG_PATH);

	const tsResult = tsProject.src()
		.pipe(inlineNg2Template(INLINE_OPTIONS))
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return merge([
		tsResult.dts
			.pipe(gulp.dest(OUT_DIR)),
		tsResult.js
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(OUT_DIR)),
	]);
});

function compileScss(stylePath, ext, styleFile, callback) {
	if (ext[0] === '.scss') {
		let sassObj = sass.renderSync({ 
			file: stylePath,
			includePaths: [
				'src/style/overrides',
				'node_modules/@lucca-front/scss/src/overrides',
			],
		});

		if (sassObj && sassObj['css']){
			styleFile = sassObj.css.toString('utf8');
		}
	}
	return callback(null, styleFile);
}


// DOC

// Generate doc from the code
// copy-pasted from ng-bootstrap
// https://github.com/ng-bootstrap/ng-bootstrap/blob/master/gulpfile.js#L235
function getFileNames() {
	return glob.sync('src/**/*.ts', {
		ignore: ['src/**/*.spec.ts', 'src/util/**']
	});
}

function getApiDocs() {
	return doc(getFileNames());
}

gulp.task('generatedoc', () => {
	var docs = `const API_DOCS = ${JSON.stringify(getApiDocs(), null, 2)};\n\nexport default API_DOCS;`;

	return gulpFile('api-docs.ts', docs, {src: true}).pipe(gulp.dest("demo"));
})