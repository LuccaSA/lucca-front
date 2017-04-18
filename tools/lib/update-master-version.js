const colors = require('colors/safe');
const argv = require('yargs').argv;
const npmRun = require('npm-run');

const authorizedVersionParameter = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease', 'from-git'];

module.exports = function updateMasterVersion() {
	const versionParam = argv._[0];

	if (authorizedVersionParameter.indexOf(versionParam) === -1) {
		throw new Error(`Invalid value for parameter : "${versionParam}". Please retry with one of the following options : ${authorizedVersionParameter.join(', ')}`);
	}

	console.log(`Updating ${colors.green('lucca-front')}`);

	npmRun.execSync(`npm --no-git-tag-version version ${versionParam}`, { cwd: `${__dirname}/../..`, stdio: [0, 1, 2] });
}