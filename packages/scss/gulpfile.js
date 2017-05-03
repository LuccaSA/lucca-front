'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let styleLint = require('gulp-stylelint');
let clean = require('gulp-clean');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

const DEMO_DIR = './demo';
const OUT_DIR = './dist';
const SASS_OPTIONS_DEBUG = {
	outputStyle: 'compressed',
	sourceMapEmbed: true
};
const SASS_OPTIONS_DIST = {
	outputStyle: 'compressed',
	sourceMapEmbed: false
};

gulp.task('dist:clean', () => {
	return gulp.src(OUT_DIR, { read: false })
		.pipe(clean());
});

gulp.task('serve', ['scss-lint', 'dist:clean', 'sass:debug'], () => {
	browserSync.init({
		server: {
			baseDir: DEMO_DIR,
			index: "demo.html",
			routes: {
				"/dist": "./dist",
				"/icons": "../icons"
			}
		}
	});

	gulp.watch(["./src/*.scss", "./src/**/*.scss","./demo/*.css"], ['scss-lint','sass:debug']);
	gulp.watch("./demo/*.html", browserSync.reload);
});

gulp.task('sass:debug', () => {
	return gulp.src('./src/main.scss')
	.pipe(sass(SASS_OPTIONS_DEBUG).on('error', sass.logError))
	.pipe(rename('lucca-front.css'))
	.pipe(gulp.dest(OUT_DIR))
	.pipe(browserSync.stream());
});

gulp.task('sass:dist', () => {
	return gulp.src('./src/main.scss')
	.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
	.pipe(rename('lucca-front.css'))
	.pipe(gulp.dest(OUT_DIR));
});

gulp.task('scss-lint', () => {
	return gulp.src(["./src/*.scss", "./src/**/*.scss"])
	.pipe(styleLint({
		reporters: [
			{formatter:'verbose', console: true}
		]
	}));
});

gulp.task('dist', ['scss-lint', 'clean', 'sass:dist']);
gulp.task('default', ['serve']);
