const colors = require('colors').safe;
const argv = require('yargs').argv;
const npmRun = require('npm-run');
const glob = require('glob');
const fs = require('fs');

const DEFAULT_PLACEHOLDER = '0.0.0-VERSIONPLACEHOLDER';

const subPackagesJSON = glob.sync('../packages/*/package.json');
const subChangelogs = glob.sync('../packages/*/CHANGELOG.md');

const filesWithVersionPlaceholder = [
	...subPackagesJSON,
	...subChangelogs
];

function getPackageConfig(configPath) {
	const packageAsString = fs.readFileSync(configPath).toString();
	const packageConfig = JSON.parse(packageAsString);

	return packageConfig;
}

function getCurrentVersion() {
	const mainPackage = getPackageConfig(__dirname + '/../package.json');
	return mainPackage.version;
}

function patchVersionPlaceholder(files) {
	const currentVersion = getCurrentVersion();

	files.forEach(file => {
		console.log(`Updating ${colors.green(file)} to version ${colors.green(currentVersion)}`);

		let fileAsString = fs.readFileSync(file, 'utf8').toString();
		const regex = new RegExp(DEFAULT_PLACEHOLDER, 'ig');

		fileAsString = fileAsString.replace(regex, currentVersion);

		fs.writeFileSync(file, fileAsString, { encoding: 'utf8' });
	});
}

function publishPackages(packages) {
	packages.forEach(_package => {
		const path = _package.replace(/package.json$/i, '');
		const config = getPackageConfig(_package);

		console.log(`Publishing ${colors.green(config.name)}`);

		npmRun.execSync('npm run publish-test', { cwd: `${__dirname}/${path}`, stdio: [0, 1, 2] });
	});
}

const authorizedVersionParameter = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease', 'from-git'];

function updateMasterVersion() {
	const versionParam = argv._[0];

	if (authorizedVersionParameter.indexOf(versionParam) === -1) {
		throw new Error(`Invalid value for parameter : "${versionParam}". Please retry with one of the following options : ${authorizedVersionParameter.join(', ')}`);
	}

	console.log(colors.green('Updateing lucca-front'));

	npmRun.execSync(`npm version ${versionParam}`, { cwd: `${__dirname}/..`, stdio: [0, 1, 2] });
}

updateMasterVersion();
patchVersionPlaceholder(filesWithVersionPlaceholder);
publishPackages(subPackagesJSON);