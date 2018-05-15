let gulp = require('gulp');
let doc = require('./misc/api-doc');
let glob = require('glob');
let gulpFile = require('gulp-file');

// DOC

// Generate doc from the code
// copy-pasted from ng-bootstrap
// https://github.com/ng-bootstrap/ng-bootstrap/blob/master/gulpfile.js#L235
function getFileNames() {
	return glob.sync('docs/demo/src/**/*.ts', {
		ignore: ['docs/demo/src/**/*.spec.ts', 'docs/demo/src/util/**']
	});
}

function getApiDocs() {
	return doc(getFileNames());
}

gulp.task('generatedoc', () => {
	var docs = `const API_DOCS = ${JSON.stringify(getApiDocs(), null, 2)};\n\nexport default API_DOCS;`;

	return gulpFile('api-docs.ts', docs, {src: true}).pipe(gulp.dest("docs/demo"));
})
