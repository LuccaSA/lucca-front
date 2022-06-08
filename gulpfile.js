'use strict';
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const styleLint = require('gulp-stylelint');
const run = require('gulp-run');

const SASS_OPTIONS_DIST = {
	outputStyle: 'compressed',
	sourceMapEmbed: false,
	includePaths: ['packages/scss/src/overrides/'],
};
const AUTOPREFIXER_OPTIONS = {
	cascade: false,
};

/* -----------------------------
 * ICONS *
 -------------------------------*/

const ICONS_SRC_DIR = './packages/icons/src';
const ICONS_SRC_MAIN = './packages/icons/src/main.scss';
const ICONS_OUT_DIR = './dist/icons';

gulp.task('icons:clean', () => {
	return gulp.src(ICONS_OUT_DIR, { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('icons:build', () => {
	return gulp
		.src(ICONS_SRC_MAIN)
		.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
		.pipe(rename('lucca-icons.min.css'))
		.pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
		.pipe(gulp.dest(`${ICONS_OUT_DIR}/dist`));
});

gulp.task('icons:copy', () => {
	return gulp
		.src([
			'./packages/icons/font/lucca-icons.woff',
			'./packages/icons/font/lucca-icons.eot',
			'./packages/icons/font/lucca-icons.svg',
			'./packages/icons/font/lucca-icons.ttf',
			'./packages/icons/icons-list.js',
		])
		.pipe(gulp.dest(ICONS_OUT_DIR));
});

gulp.task('icons:pck', () => {
	return gulp.src(['./packages/icons/package.json']).pipe(gulp.dest(ICONS_OUT_DIR));
});
gulp.task('icons:src', () => {
	return gulp.src([`${ICONS_SRC_DIR}/**`]).pipe(gulp.dest(`${ICONS_OUT_DIR}/src`));
});

gulp.task('icons', gulp.series('icons:clean', 'icons:build', 'icons:copy', 'icons:pck', 'icons:src'));

/* -----------------------------
 * SCSS *
 -------------------------------*/

const SCSS_SRC_DIR = './packages/scss/src';
const SCSS_SRC_MAIN = './packages/scss/src/main.dist.scss';
const SCSS_OUT_DIR = './dist/scss';

gulp.task('scss:clean', () => {
	return gulp.src(SCSS_OUT_DIR, { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('scss:build', () => {
	return gulp
		.src(SCSS_SRC_MAIN)
		.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
		.pipe(rename('lucca-front.min.css'))
		.pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
		.pipe(gulp.dest(`${SCSS_OUT_DIR}/dist`));
});

gulp.task('scss:pck', () => {
	return gulp.src(['./packages/scss/package.json']).pipe(gulp.dest(SCSS_OUT_DIR));
});
gulp.task('scss:src', () => {
	return gulp.src([`${SCSS_SRC_DIR}/**/*.scss`]).pipe(gulp.dest(`${SCSS_OUT_DIR}/src`));
});

gulp.task('scss:lint', () => {
	return gulp.src([`${SCSS_SRC_DIR}/**/*.scss`]).pipe(
		styleLint({
			reporters: [{ formatter: 'string', console: true }],
		}),
	);
});

gulp.task('scss', gulp.series('scss:clean', 'scss:build', 'scss:pck', 'scss:src'));

/* -----------------------------
 * NG *
 -------------------------------*/

gulp.task('ng:schematics:build', () => run('tsc --project packages/ng/schematics').exec());
gulp.task('ng:schematics:collection', () => {
	return gulp.src([
		`packages/ng/schematics/collection.json`,
		`packages/ng/schematics/migrations.json`,
	]).pipe(gulp.dest(`dist/ng/schematics`));
});

gulp.task('ng:schematics', gulp.series('ng:schematics:build', 'ng:schematics:collection'));
