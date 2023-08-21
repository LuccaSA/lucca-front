const selection = require('./selection.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

const iconNames = selection.icons
	.map((icon) => {
		return icon.properties.ligatures.split(', ');
	})
	.flat();

const type = `export type LuccaIcon =\n	| ${iconNames.map((name) => `'${name}'`).join('\n	| ')};\n`;

writeFileSync(join(__dirname, './index.d.ts'), type);
