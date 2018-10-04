let gulp = require('gulp');
let doc = require('./misc/api-doc');
let glob = require('glob');
const fs = require('fs');

// DOC

// Generate doc from the code
// copy-pasted from ng-bootstrap
// https://github.com/ng-bootstrap/ng-bootstrap/blob/master/gulpfile.js#L235
function getFileNames() {
	return glob.sync('libraries/*/src/**/*.ts', {
		ignore: ['**/*.spec.ts']
	});
}

function getApiDocs() {
	return doc(getFileNames());
}

gulp.task('generatedoc', (cb) => {
	const docs = `const API_DOCS = ${JSON.stringify(getApiDocs(), null, 2)};\n\nexport default API_DOCS;`;
	fs.writeFile('docs/demo/api-docs.ts', docs, cb);
});

// Copying styles
gulp.task('copy:core-style', () => {
	const sourceFiles = [ 'libraries/core/src/style/**' ];
	return gulp
	.src(sourceFiles)
	.pipe(gulp.dest('dist/style'));
});
gulp.task('copy:material-style', () => {
	const sourceFiles = [ 'libraries/material/src/style/**' ];
	return gulp
	.src(sourceFiles)
	.pipe(gulp.dest('dist/material/style'));
});
gulp.task('copy:formly-style', () => {
	const sourceFiles = [ 'libraries/formly/src/style/**' ];
	return gulp
	.src(sourceFiles)
	.pipe(gulp.dest('dist/formly/style'));
});
