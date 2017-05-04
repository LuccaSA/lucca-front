const npmRun = require('npm-run');

const packages = [
	// { name: 'scss', dependencies: ['icons'] },
	// { name: 'ng', dependencies: ['scss', 'icons'] },
	{ name: 'ng', dependencies: ['scss'] },
];

// extract dependencies to call `npm link` on each
// equivalent to _.chain(packages).pluck('dependencies').flatten().uniq().value();
let dependencies = [...new Set([].concat(...packages.map(d => d.dependencies)))];

dependencies.forEach(d => {
	// console.log(`${d}`);
	npmRun.execSync('npm link', { cwd: `${__dirname}/../packages/${d}`, stdio: [0, 1, 2] });
});

// link the pck with their dependencies
packages.forEach(pck => {
	pck.dependencies.forEach(d => {
		// console.log(`${pck.name} -> ${d}`);
		npmRun.execSync(`npm link @lucca-front/${d}`, { cwd: `${__dirname}/../packages/${pck.name}`, stdio: [0, 1, 2] });
	});
});
