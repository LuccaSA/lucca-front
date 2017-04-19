const getPackageConfig = require('./parse-package-json');
const colors = require('colors/safe');
const npmRun = require('npm-run');

module.exports = function publishPackages(packages) {
	packages.forEach(_package => {
		const path = _package.replace(/package.json$/i, '');
		const config = getPackageConfig(_package);

		console.log(`Publishing ${colors.green(config.name)}`);

		npmRun.execSync('npm run publish-test', { cwd: `${__dirname}/../${path}`, stdio: [0, 1, 2] });
		console.log();
	});
}