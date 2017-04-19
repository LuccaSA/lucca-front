const fs = require('fs');

module.exports = function getPackageConfig(configPath) {
	const packageAsString = fs.readFileSync(configPath).toString();
	const packageConfig = JSON.parse(packageAsString);

	return packageConfig;
}