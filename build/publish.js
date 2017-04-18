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
const currentVersion = getCurrentVersion();

function patchVersionPlaceholder(files, version) {
	files.forEach(file => {
		console.log(`Updating ${file} to version ${version}`);

		let fileAsString = fs.readFileSync(file, 'utf8').toString();
		const regex = new RegExp(DEFAULT_PLACEHOLDER, 'ig');

		fileAsString = fileAsString.replace(regex, version);

		fs.writeFileSync(file, fileAsString, { encoding: 'utf8' });
	});
}

patchVersionPlaceholder(filesWithVersionPlaceholder, currentVersion);

function publishPackages(packages) {
	packages.forEach(_package => {
		const path = _package.replace(/package.json$/i, '');
		const config = getPackageConfig(_package);

		console.log(`Publishing ${config.name}`);

		npmRun.execSync('npm run publish-test', { cwd: `${__dirname}/${path}`, stdio: [0, 1, 2] });
	});
}

publishPackages(subPackagesJSON);