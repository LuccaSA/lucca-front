let gulp = require('gulp');
let merge = require('merge2');
let sass = require('node-sass');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let inlineNg2Template = require('gulp-inline-ng2-template');

const INLINE_OPTIONS = {
	useRelativePaths: true,
	styleProcessor: compileScss,
	removeLineBreaks: true,
	target: 'es5'
}

const TSCONFIG_PATH = './src/tsconfig.json';
const OUT_DIR = './dist';

gulp.task('inline:style-and-template', () => {
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
		let sassObj = sass.renderSync({ file: stylePath });

		if (sassObj && sassObj['css']){
			styleFile = sassObj.css.toString('utf8');
		}
	}
	return callback(null, styleFile);
}