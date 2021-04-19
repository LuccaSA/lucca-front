'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

const ICONS_SRC_DIR = './packages/icons/src';
const ICONS_SRC_MAIN = './packages/icons/src/main.scss';
const ICONS_OUT_DIR = './dist/icons';

const SASS_OPTIONS_DIST = {
	outputStyle: 'compressed',
	sourceMapEmbed: false,
	includePaths: [
		'packages/scss/src/overrides/',
	]
};
const AUTOPREFIXER_OPTIONS = {
	cascade: false
};

gulp.task('icons:clean', () => {
	return gulp.src(ICONS_OUT_DIR, { read: false, allowEmpty: true })
	.pipe(clean());
});

gulp.task('icons:build', () => {
	return gulp.src(ICONS_SRC_MAIN)
	.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
	.pipe(rename('lucca-icons.min.css'))
	.pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
	.pipe(gulp.dest(`${ICONS_OUT_DIR}/dist`));
});

gulp.task('icons:copy', () => {
	return gulp.src([
		'./packages/icons/font/lucca-icons.woff',
		'./packages/icons/font/lucca-icons.eot',
		'./packages/icons/font/lucca-icons.svg',
		'./packages/icons/font/lucca-icons.ttf',
		'./packages/icons/icons-list.js',
	])
	.pipe(gulp.dest(ICONS_OUT_DIR));
});

gulp.task('icons:pck', () => {
	return gulp.src([
		'./packages/icons/package.json',
	])
	.pipe(gulp.dest(ICONS_OUT_DIR));
});
gulp.task('icons:src', () => {
	return gulp.src([`${ICONS_SRC_DIR}/**`])
	.pipe(gulp.dest(`${ICONS_OUT_DIR}/src`));
});

gulp.task(
	'icons',
	gulp.series(
		'icons:clean',
		'icons:build',
		'icons:copy',
		'icons:pck',
		'icons:src',
	),
);