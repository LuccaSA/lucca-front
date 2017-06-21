const npmRun = require('npm-run');

// respect dependency order here
const packages = [
	{ name: 'icons', dependencies: [] },
	{ name: 'scss', dependencies: ['icons'] },
	{ name: 'ng', dependencies: ['icons', 'scss'] },
];

packages.forEach(pck => {
	// link the pck with their dependencies
	// need this first cuz `npm link` launches `prepublish`
	pck.dependencies.forEach(d => {
		npmRun.execSync(`npm link @lucca-front/${d}`, { cwd: `${__dirname}/../packages/${pck.name}`, stdio: [0, 1, 2] });
	});
	// then call npm install
	npmRun.execSync('npm install', { cwd: `${__dirname}/../packages/${pck.name}`, stdio: [0, 1, 2] });

	// then register the pck with link
	npmRun.execSync('npm link', { cwd: `${__dirname}/../packages/${pck.name}`, stdio: [0, 1, 2] });
});
