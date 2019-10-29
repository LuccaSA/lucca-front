'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let clean = require('gulp-clean');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

const OUT_DIR = './dist';
const DEPLOY_DIR = '../../demo/icons';
const DEMO_DIR = './demo';
const SASS_OPTIONS_DIST = {
	outputStyle: 'compressed',
	sourceMapEmbed: false,
};

const AUTOPREFIXER_OPTIONS = {
	browsers: ['last 2 versions'],
	cascade: false
};

gulp.task('dist:clean', () => {
	return gulp.src(OUT_DIR, { read: false, allowEmpty: true })
		.pipe(clean());
});

gulp.task('sass:dist', () => {
	return gulp.src('./src/main.scss')
	.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
	.pipe(rename('lucca-icons.min.css'))
	.pipe(gulp.dest(OUT_DIR));
});
gulp.task('sass:deploy', () => {
	return gulp.src('./src/main.scss')
	.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
	.pipe(rename('lucca-icons.min.css'))
	.pipe(gulp.dest(DEPLOY_DIR));
});

gulp.task('font:dist', () => {
	return gulp.src(['./font/lucca-icons.woff', './font/lucca-icons.eot', './font/lucca-icons.svg', './font/lucca-icons.ttf', './icons-list.js'])
	.pipe(gulp.dest(OUT_DIR));
});
gulp.task('font:deploy', () => {
	return gulp.src(['./font/lucca-icons.woff', './font/lucca-icons.eot', './font/lucca-icons.svg', './font/lucca-icons.ttf', './icons-list.js'])
	.pipe(gulp.dest(DEPLOY_DIR));
});

gulp.task('build', gulp.series('dist:clean', 'font:dist', 'sass:dist'));
gulp.task('deploy', gulp.series('font:deploy', 'sass:deploy'));

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: DEMO_DIR,
			index: "demo.html",
			routes: {
				"/dist": "./dist"
			}
		}
	});

	gulp.watch(["./demo/*.html", "./demo/*.css"], browserSync.reload);
});

gulp.task('start', gulp.series('build', 'serve'));