'use strict';

let gulp = require('gulp');
let sass = require('gulp-dart-sass');
let autoprefixer = require('gulp-autoprefixer');
let styleLint = require('gulp-stylelint');
let clean = require('gulp-clean');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

const DEMO_DIR = './demo';
const OUT_DIR = './dist';
const PUBLISH_DIR = '../../demo/scss';
const SASS_OPTIONS_DEBUG = {
	outputStyle: 'extended',
	sourceMapEmbed: true,
	includePaths: [
		'src/overrides/',
	]
};
const SASS_OPTIONS_DIST = {
	outputStyle: 'compressed',
	sourceMapEmbed: false,
	includePaths: [
		'src/overrides/',
	]
};
const AUTOPREFIXER_OPTIONS = {
	// browsers: ['last 2 versions'],
	cascade: false
}

gulp.task('dist:clean', () => {
	return gulp.src(OUT_DIR, { read: false, allowEmpty: true })
	.pipe(clean());
});
gulp.task('publish:clean', () => {
	return gulp.src(PUBLISH_DIR, { read: false, allowEmpty: true })
	.pipe(clean());
});

// gulp.task('serve', ['scss-lint', 'dist:clean', 'sass:debug'], () => {
gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: DEMO_DIR,
			index: "index.html",
			routes: {
				"./lucca-front.css": "./dist/lucca-front.css",
				"./demo.css": "./demo/demo.css",
				"/icons": "../icons"
			}
		}
	});

	gulp.watch(["./src/*.scss", "./src/**/*.scss","./demo/*.css"], gulp.series('debug'));
	gulp.watch(["./demo/*.html","./demo/**/*.html"], browserSync.reload);
});

gulp.task('sass:debug', () => {
	return gulp.src(['./src/main.dist.scss'])
	.pipe(sass(SASS_OPTIONS_DEBUG).on('error', sass.logError))
	.pipe(rename('lucca-front.css'))
	.pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
	.pipe(gulp.dest(OUT_DIR))
	.pipe(browserSync.stream());
});

gulp.task('sass:dist', () => {
	return gulp.src('./src/main.dist.scss')
	.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
	.pipe(rename('lucca-front.css'))
	.pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
	.pipe(gulp.dest(OUT_DIR));
});


gulp.task('sass:lint', () => {
	return gulp.src(["./src/*.scss", "./src/**/*.scss"])
	.pipe(styleLint({
		reporters: [
			{formatter:'string', console: true}
		]
	}));
});

gulp.task('publish:demo', () => {
	return gulp.src(['./demo/**'])
	.pipe(gulp.dest(PUBLISH_DIR))
});
gulp.task('publish:dist', () => {
	return gulp.src(['./dist/**'])
	.pipe(gulp.dest(PUBLISH_DIR))
});

gulp.task('build', gulp.series('dist:clean', 'sass:dist'));
gulp.task('debug', gulp.parallel('sass:lint', 'sass:dist'));
gulp.task('start', gulp.series('debug', 'serve'));

gulp.task('build:publish', gulp.series('publish:clean', 'dist:clean', 'sass:dist', 'publish:demo', 'publish:dist'));
