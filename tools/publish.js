const glob = require('glob');

const updateMasterVersion = require('./lib/update-master-version');
const patchVersionPlaceholder = require('./lib/patch-version-placeholder');
const publishPackages = require('./lib/publish-packages');

const subPackagesJSON = glob.sync('../packages/*/package.json');
const subChangelogs = glob.sync('../packages/*/CHANGELOG.md');

const filesWithVersionPlaceholder = [
	...subPackagesJSON,
	...subChangelogs
];

updateMasterVersion();
console.log();
patchVersionPlaceholder(filesWithVersionPlaceholder);
console.log();
publishPackages(subPackagesJSON);