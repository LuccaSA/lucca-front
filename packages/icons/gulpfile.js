'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let clean = require('gulp-clean');
let rename = require('gulp-rename');

const OUT_DIR = './dist';
const SASS_OPTIONS_DIST = {
	outputStyle: 'compressed',
	sourceMapEmbed: false,
};

const AUTOPREFIXER_OPTIONS = {
	browsers: ['last 2 versions'],
	cascade: false
};

gulp.task('dist:clean', () => {
	return gulp.src(OUT_DIR, { read: false })
		.pipe(clean());
});

gulp.task('sass:dist', () => {
	return gulp.src('./src/main.scss')
	.pipe(sass(SASS_OPTIONS_DIST).on('error', sass.logError))
	.pipe(rename('lucca-icons.min.css'))
	.pipe(gulp.dest(OUT_DIR));
});

gulp.task('prepare-dist-folder', ['dist:clean'], () => {
	return gulp.src(['./font/lucca-icons.woff', './font/lucca-icons.eot', './font/lucca-icons.svg', './font/lucca-icons.ttf'])
	.pipe(gulp.dest(OUT_DIR));
});

gulp.task('dist', ['prepare-dist-folder', 'sass:dist']);
gulp.task('default', ['dist']);
