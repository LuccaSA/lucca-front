const getPackageConfig = require('./parse-package-json');
const DEFAULT_PLACEHOLDER = '0.0.0-VERSIONPLACEHOLDER';
const colors = require('colors/safe');
const fs = require('fs');


function getCurrentVersion() {
	const mainPackage = getPackageConfig(__dirname + '/../../package.json');
	return mainPackage.version;
}

module.exports = function patchVersionPlaceholder(files) {
	const currentVersion = getCurrentVersion();

	files.forEach(file => {
		console.log(`Updating ${colors.green(file)} to version ${colors.green(currentVersion)}`);

		let fileAsString = fs.readFileSync(file, 'utf8').toString();
		const regex = new RegExp(DEFAULT_PLACEHOLDER, 'ig');

		fileAsString = fileAsString.replace(regex, currentVersion);

		fs.writeFileSync(file, fileAsString, { encoding: 'utf8' });
	});
}